// YouTube uploads for finished Shorts (YouTube Data API v3, OAuth "Desktop app" client).
//
// Setup: secrets/youtube-client.json is the downloaded OAuth client (git-ignored). The first
// `npm run short -- youtube-login` opens a browser, the owner signs in and picks the Movie Idiots
// channel, and the refresh token is saved to secrets/youtube-token.json. Keep the Cloud project's
// consent screen "In production": in "Testing", Google expires refresh tokens after 7 days.
//
// Scheduling: a video uploaded as `private` with `status.publishAt` goes public at that time.
// Quota (Oct 2026): uploads use their own bucket of 100 calls a day; other calls share 10,000 units.
import http from 'node:http';
import path from 'node:path';
import {createReadStream, existsSync, statSync} from 'node:fs';
import {readFile, writeFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {OAuth2Client, type Credentials} from 'google-auth-library';
import {youtube, type youtube_v3} from '@googleapis/youtube';
import {ROOT} from './paths';

const SECRETS = path.join(ROOT, 'secrets');
const CLIENT_FILE = path.join(SECRETS, 'youtube-client.json');
const TOKEN_FILE = path.join(SECRETS, 'youtube-token.json');
// upload: videos.insert. readonly: confirm which channel the token belongs to before uploading.
const SCOPES = ['https://www.googleapis.com/auth/youtube.upload', 'https://www.googleapis.com/auth/youtube.readonly'];

type ClientFile = {installed?: {client_id: string; client_secret: string}; web?: {client_id: string; client_secret: string}};

async function oauthClient(redirectUri?: string) {
  if (!existsSync(CLIENT_FILE)) throw new Error(`Missing ${CLIENT_FILE}. Download the OAuth client (type "Desktop app") from Google Cloud and save it there.`);
  const file = JSON.parse(await readFile(CLIENT_FILE, 'utf8')) as ClientFile;
  const c = file.installed ?? file.web;
  if (!c) throw new Error(`${CLIENT_FILE} is not an OAuth client file`);
  return new OAuth2Client({clientId: c.client_id, clientSecret: c.client_secret, redirectUri});
}

const saveToken = (token: Credentials) => writeFile(TOKEN_FILE, JSON.stringify(token, null, 2), {mode: 0o600});

/** Browser sign-in through a loopback redirect; saves the refresh token. */
export async function login() {
  const server = http.createServer();
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = (server.address() as {port: number}).port;
  const client = await oauthClient(`http://localhost:${port}`);
  const url = client.generateAuthUrl({access_type: 'offline', prompt: 'consent', scope: SCOPES});
  console.log(`Sign in and choose the Movie Idiots channel:\n${url}\n`);
  if (process.platform === 'win32') spawn('cmd', ['/c', 'start', '', url.replace(/&/g, '^&')], {detached: true, stdio: 'ignore'}).unref();
  const code = await new Promise<string>((resolve, reject) => {
    server.on('request', (req, res) => {
      const params = new URL(req.url ?? '/', `http://localhost:${port}`).searchParams;
      const error = params.get('error');
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      res.end(error ? `<p>Sign-in failed: ${error}. You can close this tab.</p>` : '<p>Signed in. You can close this tab and go back to the terminal.</p>');
      if (error) reject(new Error(`Google sign-in failed: ${error}`));
      else if (params.get('code')) resolve(params.get('code')!);
    });
  });
  server.close();
  const {tokens} = await client.getToken(code);
  if (!tokens.refresh_token) throw new Error('Google returned no refresh token; run youtube-login again.');
  await saveToken(tokens);
  const api = youtube({version: 'v3', auth: client});
  client.setCredentials(tokens);
  return channelOf(api);
}

async function api() {
  if (!existsSync(TOKEN_FILE)) throw new Error('Not signed in. Run: npm run short -- youtube-login');
  const client = await oauthClient();
  const stored = JSON.parse(await readFile(TOKEN_FILE, 'utf8')) as Credentials;
  client.setCredentials(stored);
  // Access tokens refresh automatically; keep the refresh token when Google omits it from a refresh.
  client.on('tokens', (t) => void saveToken({...stored, ...t, refresh_token: t.refresh_token ?? stored.refresh_token}));
  return youtube({version: 'v3', auth: client});
}

async function channelOf(yt: youtube_v3.Youtube) {
  const res = await yt.channels.list({part: ['snippet'], mine: true});
  const ch = res.data.items?.[0];
  if (!ch) throw new Error('This Google account has no YouTube channel');
  return {id: ch.id!, title: ch.snippet?.title ?? '?'};
}

export async function channel() {
  return channelOf(await api());
}

/** The channel's latest uploads with privacy, schedule and public counts (newest first). */
export async function recentUploads(count = 50) {
  const yt = await api();
  const ch = await yt.channels.list({part: ['contentDetails'], mine: true});
  const playlistId = ch.data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!playlistId) throw new Error('This channel has no uploads playlist');
  const list = await yt.playlistItems.list({part: ['contentDetails'], playlistId, maxResults: Math.min(count, 50)});
  const ids = (list.data.items ?? []).map((i) => i.contentDetails!.videoId!);
  if (!ids.length) return [];
  const res = await yt.videos.list({part: ['snippet', 'status', 'statistics'], id: ids});
  return (res.data.items ?? []).map((v) => ({
    id: v.id!,
    title: v.snippet?.title ?? '',
    publishedAt: v.snippet?.publishedAt ?? '',
    privacy: v.status?.privacyStatus ?? '',
    publishAt: v.status?.publishAt ?? undefined,
    uploadStatus: v.status?.uploadStatus ?? '',
    rejection: v.status?.rejectionReason ?? undefined,
    views: Number(v.statistics?.viewCount ?? 0),
    likes: Number(v.statistics?.likeCount ?? 0),
    comments: Number(v.statistics?.commentCount ?? 0),
  }));
}

export type Upload = {
  file: string;
  title: string;
  description: string;
  tags: string[];
  /** Go public at this time (scheduled). Without it the video uploads as private. */
  publishAt?: Date;
  categoryId?: string;
  language?: string;
};

export async function upload(u: Upload) {
  const yt = await api();
  const size = statSync(u.file).size;
  const res = await yt.videos.insert(
    {
      part: ['snippet', 'status'],
      notifySubscribers: true,
      requestBody: {
        snippet: {title: u.title, description: u.description, tags: u.tags, categoryId: u.categoryId ?? '1', defaultLanguage: u.language ?? 'hi', defaultAudioLanguage: u.language ?? 'hi'},
        status: {
          privacyStatus: 'private',
          ...(u.publishAt ? {publishAt: u.publishAt.toISOString()} : {}),
          selfDeclaredMadeForKids: false,
          containsSyntheticMedia: false,
        },
      },
      media: {body: createReadStream(u.file)},
    },
    {
      onUploadProgress: (e: {bytesRead: number}) => process.stdout.write(`\r  uploading ${Math.round((e.bytesRead / size) * 100)}%`),
    },
  );
  process.stdout.write('\n');
  return {id: res.data.id!, status: res.data.status};
}
