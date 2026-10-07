// "80s-90s की फिल्मों वाला college": everything happens except studies. 9:16 collage Short,
// hosted by the Movie Idiot mascot. No film stills: every reference is original art + titles.
import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {C, FONT} from '../../theme';
import {Counter, Cutout, Draw, Enter, Float, Jitter, Marker, Paper, Place, SPRING, Sfx, Shake, Stamp, TornLabel, WordDrop, clamp} from '../../primitives';
import {
  Basketball, Bicycle, Book, BoxingGlove, Chai, CollegeBuilding, Guitar, Heart, Heroine, Hoop, MicStand, MusicNote, Student, Sunburst,
} from '../../art';
import {Presenter} from '../../characters';
import {ShortShell, local, type BeatProps, type ShortProps} from '../../shell';

/** Year stamp + film title strip, the recurring "which film" marker. */
function FilmTag({year, title, at = 0, width = 760}: {year: string; title: string; at?: number; width?: number}) {
  return (
    <Place x={540} y={215}>
      <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
        <Stamp text={year} at={at} size={74} font={FONT.type} color={C.red} rotate={-8} />
        <Enter kind="left" delay={at + 3}>
          <TornLabel width={width} size={70} seed={`tag-${year}`} rotate={-2}>{title}</TornLabel>
        </Enter>
      </div>
    </Place>
  );
}

/** Music notes drifting up from a point, looping. */
function Notes({x, y, from = 0, count = 4}: {x: number; y: number; from?: number; count?: number}) {
  const frame = useCurrentFrame();
  if (frame < from) return null;
  return (
    <>
      {Array.from({length: count}, (_, i) => {
        const p = ((frame - from) / 50 + i / count) % 1;
        return (
          <Place key={i} x={x + Math.sin(p * 6 + i) * 60 + (i - count / 2) * 40} y={y - p * 420} rotate={Math.sin(p * 5 + i) * 15}>
            <div style={{opacity: Math.min(1, (1 - p) * 2.5, p * 6)}}>
              <MusicNote width={70 + (i % 2) * 20} color={i % 2 ? C.marigold : C.white} />
            </div>
          </Place>
        );
      })}
    </>
  );
}

function Card({children, width = 400, bg = C.white, rotate = 0}: {children: React.ReactNode; width?: number; bg?: string; rotate?: number}) {
  return (
    <div style={{transform: `rotate(${rotate}deg)`}}>
      <Cutout border={0} lift={18}>
        <div style={{width, padding: '22px 26px', background: bg, color: C.ink, textAlign: 'center'}}>{children}</div>
      </Cutout>
    </div>
  );
}

// ------------------------------------------------------------------ beats

function Hook({c, from}: BeatProps) {
  const L = local(from);
  const study = L(c.word('hook2', 'पढ़ाई'));
  const icons = [
    {at: L(c.word('hook1', 'फिल्मों')), x: 175, y: 430, el: <Guitar width={170} rotate={-20} />},
    {at: L(c.word('hook1', 'college')), x: 905, y: 430, el: <Heart width={150} />},
    {at: L(c.word('hook1', 'सब')), x: 165, y: 1040, el: <Basketball width={150} spin={0} />},
    {at: L(c.word('hook1', 'होता')), x: 915, y: 1040, el: <Chai width={130} />},
  ];
  return (
    <AbsoluteFill>
      <Paper color="#cfe0d4" seed={31} />
      <Shake at={[study]} amp={20}>
        <Place x={540} y={215}>
          <WordDrop text="Bollywood वाला College" accent="College" size={98} at={2} maxWidth={980} />
        </Place>
        <Place x={540} y={760}>
          <Enter kind="rise" delay={2} config={SPRING.heavy}>
            <Cutout border={9}><CollegeBuilding width={760} /></Cutout>
          </Enter>
        </Place>
        {icons.map((ic, i) => (
          <Place key={i} x={ic.x} y={ic.y} rotate={i % 2 ? 8 : -8}>
            <Enter kind="pop" delay={ic.at} exit={i === 3 ? study - 4 : undefined}>
              <Float amp={8} phase={i}><Cutout border={6}>{ic.el}</Cutout></Float>
            </Enter>
          </Place>
        ))}
        <Place x={540} y={760}>
          <Enter kind="drop" delay={study - 6}>
            <Cutout border={7}><Book width={230} label="पढ़ाई" /></Cutout>
          </Enter>
        </Place>
        <Place x={560} y={930} rotate={-8}>
          <Stamp text="नहीं!" at={study} size={150} />
        </Place>
      </Shake>
      <Presenter at="bottom-right" width={250} enter={study - 4} talk={false} cues={[{at: study - 4, pose: 'shrug', expression: 'happy'}]} />
      {icons.map((ic, i) => (
        <Sfx key={i} at={ic.at} src="pop.wav" volume={0.45} />
      ))}
      <Sfx at={study - 6} src="whoosh.wav" volume={0.4} />
      <Sfx at={study} src="stamp.wav" volume={0.9} />
    </AbsoluteFill>
  );
}

const TICK = 'M10,40 L34,64 L80,10';

function Blackboard({c, from, timing}: BeatProps) {
  const L = local(from);
  const room = L(c.word('setup', 'Classroom'));
  const rarely = L(c.word('setup', 'शायद'));
  const items = [
    {at: L(c.word('setup', 'canteen')), text: 'Canteen'},
    {at: L(c.word('setup', 'गाने')), text: 'गाने'},
    {at: L(c.word('setup', 'लड़ाई')), text: 'लड़ाई'},
    {at: L(c.word('setup', 'प्यार')), text: 'प्यार'},
  ];
  const full = L(c.word('setup', 'पूरा'));
  const chalk = {fontFamily: FONT.hand, color: '#f1efe4'};
  return (
    <AbsoluteFill>
      <Paper color={C.kraft} seed={33} />
      <Place x={540} y={700}>
        <Enter kind="drop" delay={0} config={SPRING.heavy}>
          <Cutout border={0} lift={24}>
            <div style={{position: 'relative', width: 880, height: 820, background: '#24453a', border: '26px solid #8b5a2b', boxSizing: 'border-box', padding: '40px 60px'}}>
              <div style={{...chalk, fontSize: 64, opacity: 0.85}}>
                <Enter kind="fade" delay={room}>SYLLABUS 1990</Enter>
              </div>
              <div style={{position: 'relative', ...chalk, fontSize: 72, marginTop: 10}}>
                <Enter kind="fade" delay={room}>Classroom</Enter>
                <div style={{position: 'absolute', left: -10, top: 10}}>
                  <Draw viewBox="0 0 360 90" w={360} h={90} d="M10,60 C120,20 220,80 350,30" at={rarely} duration={8} color={C.red} width={10} />
                </div>
              </div>
              {items.map((it, i) => (
                <div key={i} style={{display: 'flex', alignItems: 'center', gap: 24, marginTop: 14, ...chalk, fontSize: 76}}>
                  <div style={{width: 90, height: 74}}>
                    <Draw viewBox="0 0 90 74" w={90} h={74} d={TICK} at={it.at} duration={6} color={C.marigold} width={10} />
                  </div>
                  <Enter kind="fade" delay={it.at}>{it.text}</Enter>
                </div>
              ))}
            </div>
          </Cutout>
        </Enter>
      </Place>
      <Place x={620} y={1200} rotate={-6}>
        <Stamp text="पूरा SYLLABUS" at={full} size={76} color={C.red} />
      </Place>
      <Presenter at="bottom-left" width={250} enter={4} timing={timing} timeOffset={from} cues={[{at: 4, pose: 'present', expression: 'skeptic'}, {at: full, pose: 'thumbsUp', expression: 'happy'}]} />
      <Sfx at={0} src="paper.wav" volume={0.5} />
      {items.map((it, i) => (
        <Sfx key={i} at={it.at} src="pop.wav" volume={0.35} />
      ))}
      <Sfx at={full} src="stamp.wav" volume={0.85} />
    </AbsoluteFill>
  );
}

function QSQT({c, from}: BeatProps) {
  const L = local(from);
  const song = L(c.word('qsqt', 'गाना'));
  const papa = L(c.word('qsqt', 'पापा'));
  const remember = L(c.word('qsqt2', 'याद'));
  const studied = L(c.word('qsqt2', 'पढ़ा'));
  const unknown = L(c.word('qsqt2', 'पता'));
  const frame = useCurrentFrame();
  const spot = 0.75 + Math.sin(frame / 9) * 0.08;
  const stageOut = interpolate(frame, [remember - 8, remember], [1, 0.25], clamp);
  return (
    <AbsoluteFill style={{background: C.indigo}}>
      <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 55%, rgba(255,236,190,${0.42 * spot}), transparent 58%)`}} />
      <FilmTag year="1988" title="क़यामत से क़यामत तक" width={780} />
      <AbsoluteFill style={{opacity: stageOut}}>
        <Place x={540} y={830}>
          <Enter kind="rise" delay={4}><Cutout border={6}><MicStand width={190} /></Cutout></Enter>
        </Place>
        <Place x={300} y={870}>
          <Enter kind="left" delay={8}><Cutout border={6}><Guitar width={230} rotate={-28} /></Cutout></Enter>
        </Place>
        <Place x={800} y={900} rotate={6}>
          <Enter kind="right" delay={12}>
            <TornLabel width={360} size={58} font={FONT.type} seed="farewell" bg={C.marigold}>FAREWELL</TornLabel>
          </Enter>
        </Place>
        <Notes x={560} y={650} from={song} />
        <Place x={560} y={470} rotate={-3}>
          <Enter kind="pop" delay={papa}>
            <TornLabel width={560} size={78} seed="papa" bg={C.white}>♪ पापा कहते हैं</TornLabel>
          </Enter>
        </Place>
      </AbsoluteFill>
      <Place x={300} y={1070} rotate={-4}>
        <Enter kind="drop" delay={remember - 6}>
          <Card width={420}>
            <div style={{fontFamily: FONT.hand, fontSize: 46}}>Papa ने क्या कहा?</div>
            <div style={{fontFamily: FONT.body, fontWeight: 800, fontSize: 70, color: C.teal}}>याद है ✓</div>
          </Card>
        </Enter>
      </Place>
      <Place x={790} y={1100} rotate={4}>
        <Enter kind="drop" delay={studied - 4}>
          <Card width={420}>
            <div style={{fontFamily: FONT.hand, fontSize: 46}}>Raj ने क्या पढ़ा?</div>
            <div style={{fontFamily: FONT.body, fontWeight: 800, fontSize: 70, color: C.red}}>???</div>
          </Card>
        </Enter>
      </Place>
      <Place x={800} y={1210} rotate={-10}>
        <Stamp text="पता नहीं" at={unknown} size={84} />
      </Place>
      <Sfx at={4} src="whoosh.wav" volume={0.35} />
      <Sfx at={papa} src="pop.wav" volume={0.5} />
      <Sfx at={remember - 6} src="paper.wav" volume={0.5} />
      <Sfx at={studied - 4} src="paper.wav" volume={0.5} />
      <Sfx at={unknown} src="stamp.wav" volume={0.8} />
    </AbsoluteFill>
  );
}

function Dil({c, from}: BeatProps) {
  const L = local(from);
  const less = L(c.word('dil', 'कम'));
  const prank = L(c.word('dil', 'prank'));
  const more = L(c.word('dil', 'ज़्यादा'));
  const row = (label: string, raja: React.ReactNode, madhu: React.ReactNode, color = C.ink) => (
    <div style={{display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr', alignItems: 'center', fontFamily: FONT.body, fontWeight: 800, fontSize: 64, color, padding: '8px 0', borderTop: `4px dashed ${C.ink}`}}>
      <div style={{fontFamily: FONT.hand, fontSize: 54, textAlign: 'left'}}>{label}</div>
      <div>{raja}</div>
      <div>{madhu}</div>
    </div>
  );
  return (
    <AbsoluteFill>
      <Paper color="#f2c86a" seed={35} />
      <FilmTag year="1990" title="दिल" width={300} />
      <Shake at={[more]} amp={14}>
        <Place x={540} y={760}>
          <Enter kind="drop" delay={4} config={SPRING.heavy}>
            <Card width={820} bg="#fbf3df">
              <div style={{fontFamily: FONT.type, fontSize: 52, letterSpacing: 6, marginBottom: 10}}>SCOREBOARD</div>
              <div style={{display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr', fontFamily: FONT.display, fontSize: 62, paddingBottom: 6}}>
                <div />
                <div>Raja</div>
                <div>Madhu</div>
              </div>
              {row('पढ़ाई', <Enter kind="pop" delay={less}>0</Enter>, <Enter kind="pop" delay={less + 3}>0</Enter>, C.red)}
              {row('Prank', <Counter from={0} to={5} at={prank} duration={more - prank + 10} render={(n) => <>{n}</>} />, <Counter from={0} to={5} at={prank + 6} duration={more - prank + 10} render={(n) => <>{n}</>} />)}
            </Card>
          </Enter>
        </Place>
        <Place x={300} y={1120} rotate={-18}>
          <Enter kind="left" delay={prank}><Cutout border={6}><BoxingGlove width={210} /></Cutout></Enter>
        </Place>
        <Place x={790} y={1130} rotate={14}>
          <Enter kind="right" delay={prank + 6}>
            <div style={{transform: 'scaleX(-1)'}}><Cutout border={6}><BoxingGlove width={210} /></Cutout></div>
          </Enter>
        </Place>
        <Place x={560} y={1275} rotate={-6}>
          <Stamp text="PRANK WAR" at={more} size={84} font={FONT.type} />
        </Place>
      </Shake>
      <Sfx at={4} src="paper.wav" volume={0.5} />
      <Sfx at={prank} src="pop.wav" volume={0.5} />
      <Sfx at={prank + 6} src="pop.wav" volume={0.5} />
      <Sfx at={more} src="stamp.wav" volume={0.85} />
    </AbsoluteFill>
  );
}

function Race({c, from, to}: BeatProps) {
  const L = local(from);
  const vs = L(c.word('jjws', 'बनाम'));
  const rajput = L(c.word('jjws', 'Rajput'));
  const cycle = L(c.word('jjws', 'Cycle'));
  const frame = useCurrentFrame();
  const race = (lag: number) => interpolate(frame, [4, to - from], [-240, 780 + lag], {...clamp, easing: Easing.inOut(Easing.quad)});
  return (
    <AbsoluteFill>
      <Paper color={C.kraft} seed={37} />
      <FilmTag year="1992" title="जो जीता वही सिकंदर" width={760} />
      <Place x={300} y={430} rotate={-4}>
        <Enter kind="left" delay={4}><TornLabel width={460} size={58} font={FONT.type} seed="model" bg={C.white}>MODEL SCHOOL</TornLabel></Enter>
      </Place>
      <Place x={540} y={520}>
        <Enter kind="pop" delay={vs}><div style={{fontFamily: FONT.display, fontSize: 120, color: C.red}}>VS</div></Enter>
      </Place>
      <Place x={780} y={610} rotate={3}>
        <Enter kind="right" delay={rajput}><TornLabel width={500} size={58} font={FONT.type} seed="rajput" bg={C.ink} color={C.marigold}>RAJPUT COLLEGE</TornLabel></Enter>
      </Place>
      {/* road */}
      <div style={{position: 'absolute', left: -20, right: -20, top: 800, height: 330, background: '#5b5a57', transform: 'rotate(-3deg)', boxShadow: '0 20px 40px rgba(0,0,0,.35)'}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 160, height: 10, backgroundImage: `repeating-linear-gradient(90deg, ${C.cream} 0 60px, transparent 60px 110px)`}} />
        <div style={{position: 'absolute', right: 140, top: 0, bottom: 0, width: 50, backgroundImage: `repeating-conic-gradient(${C.ink} 0 25%, ${C.white} 0 50%)`, backgroundSize: '50px 50px'}} />
      </div>
      <div style={{position: 'absolute', top: 812, left: race(40)}}>
        <Jitter amount={4} seed={1}><Cutout border={5}><Bicycle width={240} color={C.indigo} spin={frame * 14} /></Cutout></Jitter>
      </div>
      <div style={{position: 'absolute', top: 968, left: race(-30)}}>
        <Jitter amount={4} seed={2}><Cutout border={5}><Bicycle width={240} color={C.red} spin={frame * 14} /></Cutout></Jitter>
      </div>
      <Place x={560} y={1250} rotate={-6}>
        <Stamp text="असली EXAM" at={cycle} size={96} />
      </Place>
      <Sfx at={vs} src="pop.wav" volume={0.5} />
      <Sfx at={4} src="whoosh.wav" volume={0.5} />
      <Sfx at={cycle} src="stamp.wav" volume={0.85} />
    </AbsoluteFill>
  );
}

function Marksheet({c, from}: BeatProps) {
  const L = local(from);
  const again = L(c.word('khkn', 'बार'));
  const again2 = L(c.word('khkn', 'बार', 1));
  const fail = L(c.word('khkn', 'fail'));
  const band = L(c.word('khkn', 'band'));
  const hit = L(c.word('khkn', 'hit'));
  const frame = useCurrentFrame();
  const slide = interpolate(frame, [band - 6, band + 4], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const subjects = [['Accounts', '12'], ['Economics', '09'], ['English', '21'], ['Commerce', '14']];
  return (
    <AbsoluteFill>
      <Paper color={C.cream} seed={39} />
      <FilmTag year="1994" title="कभी हाँ कभी ना" width={640} />
      <Shake at={[again, again2, fail]} amp={12} duration={8}>
        <div style={{position: 'absolute', inset: 0, transform: `translateX(${slide * -200}px) scale(${1 - slide * 0.2})`, transformOrigin: '30% 55%'}}>
          <Place x={520} y={800} rotate={-3}>
            <Enter kind="drop" delay={2} config={SPRING.heavy}>
              <Card width={800} bg="#fbf6e8">
                <div style={{fontFamily: FONT.type, fontSize: 46, letterSpacing: 4}}>MARKSHEET · SUNIL</div>
                {subjects.map(([s, m]) => (
                  <div key={s} style={{display: 'flex', justifyContent: 'space-between', fontFamily: FONT.type, fontSize: 48, borderTop: `3px solid ${C.inkSoft}`, padding: '12px 10px', marginTop: 8}}>
                    <span>{s}</span>
                    <span style={{color: C.red}}>{m}/100</span>
                  </div>
                ))}
              </Card>
            </Enter>
          </Place>
          {[again, again2, fail].map((at, i) => (
            <Place key={i} x={[380, 650, 520][i]} y={[650, 830, 980][i]} rotate={[-14, 10, -6][i]}>
              <Stamp text="FAIL" at={at} size={[100, 120, 150][i]} font={FONT.type} />
            </Place>
          ))}
        </div>
      </Shake>
      <Place x={830} y={760}>
        <Enter kind="right" delay={band - 2}>
          <Float amp={6}><Cutout border={7}><Guitar width={260} rotate={18} /></Cutout></Float>
        </Enter>
      </Place>
      <Notes x={830} y={700} from={band + 4} count={3} />
      <Place x={820} y={1120} rotate={8}>
        <Stamp text="HIT ★" at={hit} size={110} color={C.marigold} font={FONT.type} />
      </Place>
      {[again, again2, fail].map((at, i) => (
        <Sfx key={i} at={at} src="stamp.wav" volume={0.8} />
      ))}
      <Sfx at={band - 2} src="whoosh.wav" volume={0.4} />
      <Sfx at={hit} src="coin.wav" volume={0.55} />
    </AbsoluteFill>
  );
}

function KKHH({c, from}: BeatProps) {
  const L = local(from);
  const ball = L(c.word('kkhh', 'basketball'));
  const friends = L(c.word('kkhh', 'दोस्ती'));
  const miss = L(c.word('kkhh', 'Braganza'));
  const principal = L(c.word('kkhh2', 'Principal'));
  const chase = L(c.word('kkhh2', 'पीछे'));
  const frame = useCurrentFrame();
  // Ball arcs from bottom-left into the hoop, then bounces in place.
  const t = interpolate(frame, [ball, ball + 22], [0, 1], clamp);
  const bx = interpolate(t, [0, 1], [240, 790]);
  const after = frame - ball - 22;
  const by = t < 1 ? 1000 - 440 * t - Math.sin(t * Math.PI) * 380 : Math.min(780, 560 + after * after * 0.9) - (560 + after * after * 0.9 >= 780 ? Math.abs(Math.sin(after / 5)) * 70 * Math.exp(-after / 40) : 0);
  return (
    <AbsoluteFill>
      <Paper color="#d6e4ee" seed={41} />
      <FilmTag year="1998" title="कुछ कुछ होता है" width={640} />
      <Place x={790} y={560}>
        <Enter kind="rise" delay={2}><Cutout border={6}><Hoop width={300} /></Cutout></Enter>
      </Place>
      {frame >= ball && (
        <Place x={bx} y={by}>
          <Cutout border={5}><Basketball width={130} spin={frame * 12} /></Cutout>
        </Place>
      )}
      <Place x={300} y={520} rotate={-6}>
        <Enter kind="pop" delay={friends}>
          <TornLabel width={420} size={56} font={FONT.type} seed="fs" bg={C.red} color={C.white}>FRIENDSHIP</TornLabel>
        </Enter>
      </Place>
      <Place x={290} y={900} rotate={-4}>
        <Enter kind="drop" delay={miss}>
          <Card width={400}>
            <div style={{fontFamily: FONT.hand, fontSize: 44}}>Ms.</div>
            <div style={{fontFamily: FONT.display, fontSize: 64}}>Braganza</div>
          </Card>
        </Enter>
      </Place>
      <Place x={790} y={930} rotate={4}>
        <Enter kind="drop" delay={principal}>
          <Card width={400}>
            <div style={{fontFamily: FONT.hand, fontSize: 44}}>Principal</div>
            <div style={{fontFamily: FONT.display, fontSize: 64}}>Malhotra</div>
          </Card>
        </Enter>
      </Place>
      <Place x={540} y={800}>
        <Draw viewBox="0 0 300 160" w={300} h={160} d="M270,140 C200,20 100,20 30,110" head={{x: 30, y: 110, angle: 135}} at={chase} duration={10} color={C.red} width={9} />
      </Place>
      <Place x={545} y={930}>
        <Enter kind="pop" delay={chase + 6}>
          <Float amp={10} speed={0.2}><Heart width={120} /></Float>
        </Enter>
      </Place>
      <Presenter at="bottom-right" width={220} enter={chase + 4} talk={false} cues={[{at: chase + 4, pose: 'facepalm', expression: 'angry'}]} />
      <Sfx at={ball} src="whoosh.wav" volume={0.35} />
      <Sfx at={ball + 22} src="pop.wav" volume={0.5} />
      <Sfx at={friends} src="pop.wav" volume={0.4} />
      <Sfx at={miss} src="paper.wav" volume={0.5} />
      <Sfx at={principal} src="paper.wav" volume={0.5} />
      <Sfx at={chase + 6} src="coin.wav" volume={0.45} />
    </AbsoluteFill>
  );
}

function Twist({c, from}: BeatProps) {
  const L = local(from);
  const truth = L(c.word('twist1', 'सच'));
  const intro = 4;
  const roam = L(c.word('twist2', 'घूमते'));
  const got = L(c.word('twist2', 'मिली'));
  const study = L(c.word('twist2', 'पढ़ाई'));
  const frame = useCurrentFrame();
  const heartX = interpolate(frame, [got, study], [540, 880], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const loafers = frame >= roam ? Math.sin((frame - roam) / 5) * 18 : 0;
  return (
    <AbsoluteFill>
      <Paper color={C.cream} seed={43} />
      <FilmTag year="1981" title="चश्मे बद्दूर" width={480} />
      <Place x={760} y={360} rotate={-8}>
        <Stamp text="सच!" at={truth} size={100} />
      </Place>
      {[{x: 170, shirt: C.red}, {x: 350, shirt: C.marigold}].map((p, i) => (
        <Place key={i} x={p.x + (i ? -loafers : loafers)} y={890}>
          <Enter kind="left" delay={intro + i * 4}>
            <Cutout border={6}><Student width={250} shirt={p.shirt} hair={i ? 'puff' : 'short'} /></Cutout>
          </Enter>
        </Place>
      ))}
      {[0, 1].map((i) => (
        <Place key={`h${i}`} x={[170, 350][i]} y={580}>
          <Enter kind="pop" delay={roam + i * 4} exit={got}>
            <Float amp={10} speed={0.25} phase={i}><Heart width={70} /></Float>
          </Enter>
        </Place>
      ))}
      <Place x={590} y={890}>
        <Enter kind="rise" delay={intro + 8}>
          <Cutout border={6}><Heroine crown={false} sari="#e36d8f" width={250} /></Cutout>
        </Enter>
      </Place>
      <Place x={880} y={890}>
        <Enter kind="right" delay={intro + 12}>
          <Cutout border={6}><Student width={250} shirt={C.indigo} glasses book /></Cutout>
        </Enter>
      </Place>
      {frame >= got && (
        <Place x={heartX} y={580}>
          <Cutout border={5}><Heart width={110} /></Cutout>
        </Place>
      )}
      <Place x={860} y={1180} rotate={4}>
        <Enter kind="pop" delay={study}>
          <TornLabel width={340} size={54} seed="padhaku" bg={C.marigold}>
            <Marker at={study + 4} color={C.white}>पढ़ाकू</Marker>
          </TornLabel>
        </Enter>
      </Place>
      <Place x={420} y={1200} rotate={-5}>
        <Stamp text="TWIST!" at={study + 4} size={110} font={FONT.type} />
      </Place>
      <Sfx at={truth} src="stamp.wav" volume={0.8} />
      <Sfx at={roam} src="whoosh.wav" volume={0.35} />
      <Sfx at={got} src="pop.wav" volume={0.5} />
      <Sfx at={study + 4} src="stamp.wav" volume={0.9} />
    </AbsoluteFill>
  );
}

function Outro({c, from, timing}: BeatProps) {
  const L = local(from);
  const study = L(c.word('outro', 'पढ़'));
  const fav = L(c.word('outro', 'favourite'));
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Place x={540} y={900}>
        <Sunburst spin={frame * 0.2} color="#f7c75a" bg={C.cream} />
      </Place>
      <Place x={540} y={230}>
        <Enter kind="pop" delay={study} exit={fav - 4}>
          <WordDrop text="तो पढ़ लो भाई" accent="पढ़" size={112} at={study} />
        </Enter>
      </Place>
      <Place x={540} y={230}>
        <Enter kind="drop" delay={fav}>
          <TornLabel width={900} size={66} seed="fav" bg={C.ink} color={C.marigold} rotate={-2}>आपकी favourite college फिल्म?</TornLabel>
        </Enter>
      </Place>
      <Place x={790} y={420} rotate={-6}>
        <Enter kind="fade" delay={fav + 10}>
          <div style={{fontFamily: FONT.hand, fontSize: 64, color: C.red}}>Comment करो ↓</div>
        </Enter>
      </Place>
      <Presenter at={{x: 540, y: 900}} width={480} enter={0} timing={timing} timeOffset={from} cues={[{at: 0, pose: 'wave', expression: 'happy'}, {at: study, pose: 'point', expression: 'skeptic'}, {at: fav, pose: 'thumbsUp', expression: 'wink'}]} />
      <Sfx at={0} src="pop.wav" volume={0.5} />
      <Sfx at={fav} src="paper.wav" volume={0.5} />
    </AbsoluteFill>
  );
}

// ------------------------------------------------------------------ assembly

export function CollegeShort(props: ShortProps) {
  return (
    <ShortShell
      {...props}
      beats={[
        {first: 'hook1', render: (p) => <Hook {...p} />},
        {first: 'setup', render: (p) => <Blackboard {...p} />},
        {first: 'qsqt', render: (p) => <QSQT {...p} />, wipe: true},
        {first: 'dil', render: (p) => <Dil {...p} />},
        {first: 'jjws', render: (p) => <Race {...p} />},
        {first: 'khkn', render: (p) => <Marksheet {...p} />},
        {first: 'kkhh', render: (p) => <KKHH {...p} />},
        {first: 'twist1', render: (p) => <Twist {...p} />, wipe: true},
        {first: 'outro', render: (p) => <Outro {...p} />},
      ]}
    />
  );
}
