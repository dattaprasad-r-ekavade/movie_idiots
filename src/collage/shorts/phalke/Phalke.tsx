// Golden sample: "India's first heroine was a man" — a 9:16 paper-collage Short.
// Every event is anchored to a narration word through the clock, never to a hard-coded second.
import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT} from '../../theme';
import {
  Camera, Counter, Cutout, Draw, Enter, Float, Jitter, Layer, Marker, Paper, Place, SPRING, Sfx, Shake, Stamp, TornLabel, WordDrop, clamp,
} from '../../primitives';
import {
  Audience, Beam, Bow, Coin, CookingPot, Crown, DevTray, Feather, FilmStrip, Heroine, LotusMedal, MovieCamera, Necklace, PeaPlant, Pot, Reel, Screen, Ship, Sunburst, Waiter, useFlicker, useSteps,
} from '../../art';
import {ShortShell, local, type BeatProps, type ShortProps} from '../../shell';
import {Presenter} from '../../characters';

function useWig(at: number) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - at, fps, config: SPRING.bouncy});
}

// ------------------------------------------------------------------ beats

function Hook({c, from, to, line}: BeatProps & {line: string}) {
  const L = local(from);
  const man = L(c.word(line, 'आदमी'));
  const wig = useWig(man - 2);
  const frame = useCurrentFrame();
  const spin = frame * 0.12;
  return (
    <AbsoluteFill>
      <Shake at={[man]} amp={22}>
        <Place x={540} y={900}>
          <Sunburst spin={spin} color="#f7c75a" bg={C.cream} />
        </Place>
        <Place x={540} y={300}>
          <WordDrop text="भारत की पहली हीरोइन" accent="हीरोइन" size={112} at={2} maxWidth={960} />
        </Place>
        <Place x={540} y={930}>
          <Enter kind="rise" delay={4} config={SPRING.heavy}>
            <Float amp={5}>
              <Cutout border={9}>
                <Heroine wig={wig} width={410} />
              </Cutout>
            </Float>
          </Enter>
        </Place>
        <Place x={560} y={1220} rotate={-6}>
          <Stamp text="एक आदमी!" at={man} size={118} />
        </Place>
      </Shake>
      {line === 'loop' && (
        <>
          <Presenter
            at="bottom-right"
            width={270}
            enter={man - 14}
            talk={false}
            cues={[
              {at: man - 14, expression: 'neutral'},
              {at: man, expression: 'shock', pose: 'think'},
              {at: man + 20, pose: 'facepalm', expression: 'angry'},
            ]}
          />
          <Sfx at={man - 14} src="pop.wav" volume={0.5} />
        </>
      )}
      <Sfx at={4} src="whoosh.wav" volume={0.35} />
      <Sfx at={man - 2} src="pop.wav" volume={0.7} />
      <Sfx at={man} src="stamp.wav" volume={0.9} />
    </AbsoluteFill>
  );
}

function Jewels({c, from}: BeatProps) {
  const L = local(from);
  const director = L(c.word('hook2', 'डायरेक्टर'));
  const jewels = L(c.word('hook2', 'गहने'));
  const stake = L(c.word('hook2', 'दाँव'));
  return (
    <AbsoluteFill>
      <Paper color={C.teal} fibre={0.6} seed={5} />
      <Shake at={[stake]} amp={18}>
        <Camera duration={stake + 20} zoom={[0.92, 1.12]}>
        <Place x={540} y={780}>
          <Enter kind="swing" delay={0} config={SPRING.bouncy}>
            <Float amp={8} rotate={3}>
              <Cutout border={8}>
                <Necklace width={640} />
              </Cutout>
            </Float>
          </Enter>
        </Place>
        </Camera>
        <Place x={540} y={330}>
          <Enter kind="left" delay={director}>
            <TornLabel width={960} size={76} rotate={-3} seed="wife">
              डायरेक्टर की बीवी के&nbsp;<Marker at={jewels}>गहने</Marker>
            </TornLabel>
          </Enter>
        </Place>
        <Place x={540} y={1120} rotate={-8}>
          <Stamp text="दाँव पर" at={stake} size={130} color={C.marigold} />
        </Place>
      </Shake>
      <Sfx at={0} src="paper.wav" volume={0.5} />
      <Sfx at={director} src="whoosh.wav" volume={0.35} />
      <Sfx at={stake} src="stamp.wav" volume={0.9} />
    </AbsoluteFill>
  );
}

function Theatre({c, from, to}: BeatProps) {
  const L = local(from);
  const name = L(c.word('theatre', 'धुंडिराज'));
  const question = L(c.word('idea', 'सोचते'));
  const gods = L(c.word('idea', 'भगवान'));
  const flicker = useFlicker(3);
  const frame = useCurrentFrame();
  const scratch = Math.floor(frame / 2);
  const swap = frame >= question;
  const punch = interpolate(frame, [question, question + 8], [0, 0.07], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: C.night}}>
      <Camera duration={to - from} zoom={[1 + punch, 1.12 + punch]} tilt={[0, 40]}>
        <Layer depth={0}>
          <Place x={540} y={700}>
            <Screen width={900} flicker={flicker}>
              {!swap ? (
                <div style={{textAlign: 'center', color: C.ink, fontFamily: FONT.type, border: `6px double ${C.ink}`, padding: '30px 50px', transform: `translate(${(scratch % 3) - 1}px, 0)`}}>
                  <div style={{fontSize: 38, letterSpacing: 6}}>PATHÉ PRESENTS</div>
                  <div style={{fontSize: 84, lineHeight: 1.05, marginTop: 10}}>THE LIFE<br />OF CHRIST</div>
                </div>
              ) : (
                <div style={{position: 'relative', width: '100%', height: '100%'}}>
                  <Place x={450} y={270}>
                    <Enter kind="pop" delay={question}>
                      <div style={{fontFamily: FONT.display, fontSize: 380, color: C.red, lineHeight: 1, opacity: frame < gods ? 1 : 0.18}}>?</div>
                    </Enter>
                  </Place>
                  <Place x={200} y={300} rotate={-8}>
                    <Enter kind="pop" delay={gods}>
                      <Cutout border={6}><Bow width={190} /></Cutout>
                    </Enter>
                  </Place>
                  <Place x={450} y={250}>
                    <Enter kind="pop" delay={gods + 5}>
                      <Cutout border={6}><Crown width={250} /></Cutout>
                    </Enter>
                  </Place>
                  <Place x={700} y={290} rotate={10}>
                    <Enter kind="pop" delay={gods + 10}>
                      <Cutout border={6}><Feather width={130} /></Cutout>
                    </Enter>
                  </Place>
                </div>
              )}
              {[0, 1, 2].map((i) => (
                <div key={i} style={{position: 'absolute', top: 0, bottom: 0, width: 2, left: `${((scratch * 37 + i * 211) % 97) + 1}%`, background: 'rgba(40,30,20,.35)'}} />
              ))}
            </Screen>
          </Place>
        </Layer>
        <Layer depth={0.4}>
          {[-1, 1].map((side) => (
            <div key={side} style={{position: 'absolute', top: 0, bottom: 0, width: 150, [side < 0 ? 'left' : 'right']: 0, background: 'repeating-linear-gradient(90deg, #6e1c1a 0 34px, #8e2724 34px 60px)', boxShadow: '0 0 60px #000'}} />
          ))}
        </Layer>
        <Beam flicker={flicker} height={1500} />
        <Layer depth={1.8}>
          <Place x={540} y={1300}>
            <Audience width={1500} rows={3} />
          </Place>
        </Layer>
      </Camera>
      <Place x={540} y={215}>
        <Enter kind="drop" delay={name} exit={question - 4}>
          <TornLabel width={900} size={66} rotate={-2} seed="name">
            धुंडिराज गोविंद फाल्के
          </TornLabel>
        </Enter>
      </Place>
      <Place x={720} y={318} rotate={-4}>
        <Enter kind="fade" delay={name + 12} exit={question - 4}>
          <div style={{fontFamily: FONT.hand, fontSize: 50, color: C.marigold}}>(आगे चलकर: दादासाहेब)</div>
        </Enter>
      </Place>
      <Sfx at={0} src="flicker.wav" volume={0.35} />
      <Sfx at={name} src="paper.wav" volume={0.5} />
      <Sfx at={question} src="pop.wav" volume={0.7} />
      <Sfx at={gods} src="pop.wav" volume={0.5} />
      <Sfx at={gods + 5} src="pop.wav" volume={0.5} />
      <Sfx at={gods + 10} src="pop.wav" volume={0.5} />
    </AbsoluteFill>
  );
}

function PeaPlantBeat({c, from, to}: BeatProps) {
  const L = local(from);
  const money = L(c.word('pea1', 'पैसा'));
  const pea = L(c.word('pea1', 'मटर'));
  const daily = L(c.word('pea1', 'रोज़'));
  const growEnd = L(c.end('pea1'));
  const reel = L(c.line('pea2'));
  const investors = L(c.word('pea2', 'पैसे'));
  const steps = 8;
  const growth = useSteps(daily, growEnd, steps);
  const frame = useCurrentFrame();
  const stripX = interpolate(frame, [reel, to - from], [80, -560], clamp);
  const plantOut = interpolate(frame, [reel - 4, reel + 6], [1, 0], clamp);
  const stepFrames = Array.from({length: steps}, (_, i) => daily + Math.round(((growEnd - daily) * (i + 1)) / steps));
  return (
    <AbsoluteFill>
      <Paper color={C.kraft} seed={9} />
      {/* question: who pays? */}
      <Place x={540} y={520} rotate={-4}>
        <Enter kind="pop" delay={money} exit={pea - 6}>
          <div style={{fontFamily: FONT.hand, fontSize: 120, color: C.ink}}>पैसा कौन देगा?</div>
        </Enter>
      </Place>
      {[0, 1, 2].map((i) => (
        <Place key={i} x={330 + i * 210} y={820 + (i % 2) * 60} rotate={i * 12 - 10}>
          <Enter kind="drop" delay={money + 4 + i * 4} exit={pea - 6}>
            <Cutout border={6}><Coin width={170} /></Cutout>
          </Enter>
        </Place>
      ))}
      {/* the pea plant demo */}
      <div style={{opacity: plantOut, transform: `scale(${0.6 + plantOut * 0.4})`, transformOrigin: '50% 60%', position: 'absolute', inset: 0}}>
        <Place x={540} y={760}>
          <Enter kind="fade" delay={pea}>
            <Jitter amount={3}>
              <PeaPlant growth={growth} width={460} />
            </Jitter>
          </Enter>
        </Place>
        <Place x={540} y={1170}>
          <Enter kind="rise" delay={pea}>
            <Cutout border={8}><Pot width={380} /></Cutout>
          </Enter>
        </Place>
        <Place x={800} y={330} rotate={4}>
          <Enter kind="pop" delay={daily}>
            <TornLabel width={440} size={56} font={FONT.type} seed="frame" bg={C.white}>
              FRAME {String(Math.max(1, Math.round(growth * steps))).padStart(3, '0')}
            </TornLabel>
          </Enter>
        </Place>
      </div>
      {/* the 1912 "demo reel" */}
      {frame >= reel && (
        <>
          <div style={{position: 'absolute', top: 640, left: stripX, transform: 'rotate(-4deg)'}}>
            <Cutout border={0} lift={20}>
              <FilmStrip frames={6} frameWidth={300}>
                {(i) => <PeaPlant growth={0.15 + i * 0.17} width={190} />}
              </FilmStrip>
            </Cutout>
          </div>
          <Place x={470} y={400} rotate={-5}>
            <Enter kind="pop" delay={reel + 6}>
              <div style={{fontFamily: FONT.hand, fontSize: 86, color: C.ink}}>
                <Marker at={reel + 12} color={C.white}>1912 का demo reel</Marker>
              </div>
            </Enter>
          </Place>
          <Place x={600} y={560}>
            <Draw viewBox="0 0 300 160" w={300} h={160} d="M40,20 C120,10 220,40 250,130" head={{x: 250, y: 130, angle: 70}} at={reel + 14} duration={12} color={C.red} width={9} />
          </Place>
          {[0, 1].map((i) => (
            <Place key={i} x={330 + i * 420} y={1160} rotate={i ? 8 : -8}>
              <Enter kind="drop" delay={investors + i * 5}>
                <Cutout border={6}><Coin width={190} /></Cutout>
              </Enter>
            </Place>
          ))}
        </>
      )}
      <Sfx at={money + 4} src="coin.wav" volume={0.35} />
      <Sfx at={pea} src="paper.wav" volume={0.5} />
      {stepFrames.map((f, i) => (
        <Sfx key={i} at={f} src="shutter.wav" volume={0.45} />
      ))}
      <Sfx at={reel} src="whoosh.wav" volume={0.35} />
      <Sfx at={investors} src="coin.wav" volume={0.5} />
    </AbsoluteFill>
  );
}

// Quadratic Bézier helper for the Bombay → London route.
const route = {p0: {x: 780, y: 1120}, p1: {x: 980, y: 520}, p2: {x: 290, y: 380}};
const onRoute = (t: number) => ({
  x: (1 - t) ** 2 * route.p0.x + 2 * (1 - t) * t * route.p1.x + t * t * route.p2.x,
  y: (1 - t) ** 2 * route.p0.y + 2 * (1 - t) * t * route.p1.y + t * t * route.p2.y,
});

function London({c, from, to}: BeatProps) {
  const L = local(from);
  const year = L(c.word('london', '1912'));
  const camera = L(c.word('london', 'कैमरा'));
  const cost = L(c.word('london', 'खर्च'));
  const wife = L(c.word('london', 'सरस्वतीबाई'));
  const frame = useCurrentFrame();
  const sail = interpolate(frame, [2, camera - 4], [0, 1], {...clamp, easing: Easing.inOut(Easing.quad)});
  const ship = onRoute(sail);
  const mapDim = interpolate(frame, [camera - 2, camera + 6, cost - 2, cost + 6], [1, 0.35, 0.35, 0.08], clamp);
  const cameraSlide = interpolate(frame, [cost - 2, cost + 8], [0, -230], {...clamp, easing: Easing.inOut(Easing.cubic)});
  return (
    <AbsoluteFill>
      <Paper color="#ead9b4" seed={12} />
      <AbsoluteFill style={{opacity: mapDim}}>
        <AbsoluteFill style={{backgroundImage: 'linear-gradient(rgba(60,40,20,.12) 2px, transparent 2px), linear-gradient(90deg, rgba(60,40,20,.12) 2px, transparent 2px)', backgroundSize: '90px 90px'}} />
        <div style={{position: 'absolute', left: 0, top: 0}}>
          <Draw viewBox="0 0 1080 1920" w={1080} h={1920} d={`M${route.p0.x},${route.p0.y} Q${route.p1.x},${route.p1.y} ${route.p2.x},${route.p2.y}`} at={2} duration={camera - 6} color={C.red} width={9} dash="2 22" length={2200} />
        </div>
        <Place x={780} y={1200}>
          <Enter kind="pop" delay={0}>
            <TornLabel width={360} size={58} font={FONT.type} seed="bom">BOMBAY</TornLabel>
          </Enter>
        </Place>
        <Place x={290} y={290}>
          <Enter kind="pop" delay={Math.round(camera * 0.6)}>
            <TornLabel width={360} size={58} font={FONT.type} seed="lon">LONDON</TornLabel>
          </Enter>
        </Place>
        <Place x={ship.x} y={ship.y} rotate={-8}>
          <Cutout border={5}><Ship width={210} /></Cutout>
        </Place>
        <Place x={720} y={560} rotate={8}>
          <Stamp text="1912" at={year} size={120} font={FONT.type} color={C.indigo} />
        </Place>
      </AbsoluteFill>
      <Place x={540 + cameraSlide} y={800}>
        <Enter kind="drop" delay={camera} config={SPRING.heavy}>
          <Cutout border={9}>
            <MovieCamera width={480} crank={frame * 9} />
          </Cutout>
        </Enter>
      </Place>
      <Place x={790} y={860} rotate={6}>
        <Enter kind="swing" delay={wife - 4}>
          <Cutout border={7}><Necklace width={420} /></Cutout>
        </Enter>
      </Place>
      <Place x={540} y={330}>
        <Enter kind="pop" delay={cost}>
          <div style={{fontFamily: FONT.display, fontSize: 104, color: C.ink}}>
            सफ़र का <Marker at={cost + 4}>खर्च?</Marker>
          </div>
        </Enter>
      </Place>
      <Place x={600} y={1170}>
        <Enter kind="left" delay={wife}>
          <TornLabel width={700} size={70} rotate={-3} bg={C.red} color={C.white} seed="sb">सरस्वतीबाई के गहने</TornLabel>
        </Enter>
      </Place>
      <Sfx at={0} src="whoosh.wav" volume={0.3} />
      <Sfx at={year} src="stamp.wav" volume={0.7} />
      <Sfx at={camera} src="shutter.wav" volume={0.6} />
      <Sfx at={cost} src="pop.wav" volume={0.5} />
      <Sfx at={wife} src="coin.wav" volume={0.45} />
    </AbsoluteFill>
  );
}

function Casting({c, from}: BeatProps) {
  const L = local(from);
  const ready = L(c.word('nowomen', 'तैयार'));
  const no = L(c.word('nowomen', 'नहीं'));
  const stamps = [ready, Math.round((ready + no) / 2), no];
  return (
    <AbsoluteFill>
      <Paper color={C.cream} seed={14} />
      <Shake at={stamps} amp={14} duration={8}>
        <Place x={540} y={800} rotate={-2}>
          <Enter kind="drop" delay={2} config={SPRING.heavy}>
            <Cutout border={0} lift={22}>
              <div style={{width: 780, padding: '60px 40px 70px', background: '#f7efdc', border: `14px double ${C.ink}`, textAlign: 'center', color: C.ink}}>
                <div style={{fontFamily: FONT.type, fontSize: 44, letterSpacing: 4}}>BOMBAY · 1912</div>
                <div style={{fontFamily: FONT.display, fontSize: 110, lineHeight: 1.2, marginTop: 20}}>ज़रूरत है</div>
                <div style={{fontFamily: FONT.display, fontSize: 190, lineHeight: 1.1, color: C.red}}>हीरोइन</div>
                <div style={{fontFamily: FONT.body, fontWeight: 500, fontSize: 46, marginTop: 24}}>फिल्म में काम के लिए</div>
              </div>
            </Cutout>
          </Enter>
        </Place>
        {stamps.map((at, i) => (
          <Place key={i} x={[330, 720, 520][i]} y={[620, 860, 1080][i]} rotate={[-14, 9, -4][i]}>
            <Stamp text="नहीं" at={at} size={[120, 140, 170][i]} />
          </Place>
        ))}
      </Shake>
      <Presenter
        at="bottom-left"
        width={290}
        enter={ready - 18}
        talk={false}
        cues={[
          {at: ready - 18, expression: 'skeptic'},
          {at: stamps[1], pose: 'shrug', expression: 'sad'},
          {at: no + 6, expression: 'angry'},
        ]}
      />
      <Sfx at={ready - 18} src="pop.wav" volume={0.5} />
      <Sfx at={2} src="paper.wav" volume={0.6} />
      {stamps.map((at, i) => (
        <Sfx key={i} at={at} src="stamp.wav" volume={0.8} />
      ))}
    </AbsoluteFill>
  );
}

function Salunke({c, from}: BeatProps) {
  const L = local(from);
  const queen = L(c.word('salunke', 'रानी'));
  const anna = L(c.word('salunke', 'अण्णा'));
  const job = L(c.word('salunke', 'restaurant'));
  const pay = L(c.word('salunke', 'तनख्वाह'));
  const fifteen = L(c.word('salunke', 'पंद्रह'));
  const straight = L(c.word('salunke', 'सीधा'));
  const wig = useWig(anna);
  const frame = useCurrentFrame();
  const heroineOut = interpolate(frame, [job - 3, job + 8], [0, 1], {...clamp, easing: Easing.in(Easing.cubic)});
  const waiterShift = interpolate(frame, [pay - 2, pay + 10], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  return (
    <AbsoluteFill>
      <Paper color="#c9dccf" seed={17} />
      <div style={{position: 'absolute', inset: 0, transform: `translateX(${heroineOut * 1100}px) rotate(${heroineOut * 12}deg)`}}>
        <Place x={540} y={880}>
          <Enter kind="rise" delay={queen}>
            <Float amp={4}>
              <Cutout border={9}><Heroine wig={wig} width={440} /></Cutout>
            </Float>
          </Enter>
        </Place>
        <Place x={540} y={280}>
          <Enter kind="drop" delay={queen} exit={anna - 3}>
            <TornLabel width={620} size={84} seed="queen">रानी तारामती</TornLabel>
          </Enter>
        </Place>
        <Place x={540} y={280}>
          <Enter kind="drop" delay={anna}>
            <TornLabel width={620} size={84} bg={C.ink} color={C.marigold} seed="anna">अण्णा सालुंके</TornLabel>
          </Enter>
        </Place>
      </div>
      <div style={{position: 'absolute', inset: 0, transform: `translate(${waiterShift * -230}px, ${waiterShift * -40}px) scale(${1 - waiterShift * 0.25})`, transformOrigin: '50% 60%'}}>
        <Place x={540} y={880}>
          <Enter kind="flip" delay={job}>
            <Cutout border={9}><Waiter width={440} /></Cutout>
          </Enter>
        </Place>
        <Place x={540} y={280}>
          <Enter kind="pop" delay={job + 4} exit={pay - 3}>
            <TornLabel width={560} size={70} font={FONT.hand} seed="job">restaurant वाला</TornLabel>
          </Enter>
        </Place>
      </div>
      <Place x={790} y={700} rotate={5}>
        <Enter kind="right" delay={pay}>
          <Cutout border={0} lift={18}>
            <div style={{width: 420, padding: '28px 20px', background: C.white, textAlign: 'center', fontFamily: FONT.display, color: C.ink}}>
              <div style={{fontFamily: FONT.hand, fontSize: 52}}>तनख्वाह / महीना</div>
              <Counter from={10} to={15} at={straight} duration={16} render={(n) => <div style={{fontSize: 190, lineHeight: 1.1, color: n === 15 ? C.red : C.ink}}>₹{n}</div>} />
            </div>
          </Cutout>
        </Enter>
      </Place>
      <Sfx at={queen} src="whoosh.wav" volume={0.3} />
      <Sfx at={anna - 1} src="pop.wav" volume={0.7} />
      <Sfx at={job} src="paper.wav" volume={0.6} />
      <Sfx at={pay} src="whoosh.wav" volume={0.3} />
      <Sfx at={fifteen} src="coin.wav" volume={0.55} />
    </AbsoluteFill>
  );
}

function Polaroid({children, label, width = 400}: {children: React.ReactNode; label: string; width?: number}) {
  return (
    <Cutout border={0} lift={18}>
      <div style={{width, padding: '22px 22px 0', background: C.white}}>
        <div style={{height: width * 0.78, background: '#e7dcc4', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>{children}</div>
        <div style={{fontFamily: FONT.hand, fontSize: 50, color: C.ink, textAlign: 'center', padding: '10px 0 16px'}}>{label}</div>
      </div>
    </Cutout>
  );
}

function Saraswati({c, from}: BeatProps) {
  const L = local(from);
  const develop = L(c.word('saraswati', 'develop'));
  const reels = L(c.word('saraswati', 'reels'));
  const food = L(c.word('saraswati', 'खाना'));
  const credit = L(c.end('saraswati', -0.1));
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Paper color="#c79a64" fibre={0.7} seed={21} />
      <Place x={540} y={250}>
        <Enter kind="drop" delay={0}>
          <TornLabel width={740} size={84} seed="sara" rotate={-2}>
            <Marker at={8} color={C.marigold}>सरस्वतीबाई फाल्के</Marker>
          </TornLabel>
        </Enter>
      </Place>
      <div style={{position: 'absolute', inset: 0, transform: `translateX(${interpolate(frame, [develop - 4, develop + 8], [0, 1100], {...clamp, easing: Easing.in(Easing.cubic)})}px)`}}>
        <Place x={540} y={860}>
          <Enter kind="rise" delay={2}>
            <Float amp={4}>
              <Cutout border={9}><Heroine crown={false} sari={C.teal} width={420} /></Cutout>
            </Float>
          </Enter>
        </Place>
      </div>
      <Place x={300} y={640} rotate={-7}>
        <Enter kind="drop" delay={develop}>
          <Polaroid label="film develop"><DevTray width={320} /></Polaroid>
        </Enter>
      </Place>
      <Place x={790} y={760} rotate={6}>
        <Enter kind="drop" delay={reels}>
          <Polaroid label="reels"><Reel width={250} spin={frame * 4} /></Polaroid>
        </Enter>
      </Place>
      <Place x={420} y={1080} rotate={-2}>
        <Enter kind="drop" delay={food}>
          <Polaroid label="crew का खाना"><CookingPot width={260} /></Polaroid>
        </Enter>
      </Place>
      <Place x={800} y={1170} rotate={-12}>
        <Stamp text="UNCREDITED" at={credit} size={74} font={FONT.type} color={C.red} />
      </Place>
      <Sfx at={develop} src="paper.wav" volume={0.55} />
      <Sfx at={reels} src="paper.wav" volume={0.55} />
      <Sfx at={food} src="paper.wav" volume={0.55} />
      <Sfx at={credit} src="stamp.wav" volume={0.85} />
    </AbsoluteFill>
  );
}

function Ticket() {
  return (
    <Cutout border={0} lift={24}>
      <div style={{display: 'flex', width: 860, height: 420, background: '#f2c84b', color: C.ink, position: 'relative'}}>
        <div style={{width: 210, borderRight: `6px dashed ${C.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.type, fontSize: 40, writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: 4}}>
          ADMIT ONE
        </div>
        <div style={{flex: 1, padding: '36px 40px', fontFamily: FONT.type}}>
          <div style={{fontSize: 46, letterSpacing: 3}}>CORONATION CINEMA</div>
          <div style={{fontSize: 30, marginTop: 6, letterSpacing: 2}}>GIRGAON · BOMBAY</div>
          <div style={{fontFamily: FONT.body, fontWeight: 800, fontSize: 92, lineHeight: 1.25, marginTop: 18}}>राजा हरिश्चंद्र</div>
          <div style={{fontSize: 44, marginTop: 6}}>3 MAY 1913</div>
        </div>
      </div>
    </Cutout>
  );
}

function Release({c, from}: BeatProps) {
  const L = local(from);
  const hall = L(c.word('release', 'Coronation'));
  const film = L(c.word('release', 'राजा'));
  const flicker = useFlicker(9);
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: C.indigo}}>
      <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 45%, rgba(255,240,200,${0.35 * flicker}), transparent 60%)`}} />
      <Place x={540} y={380}>
        <Enter kind="pop" delay={0}>
          <div style={{fontFamily: FONT.display, fontSize: 150, color: C.white, lineHeight: 1}}>3 मई 1913</div>
        </Enter>
      </Place>
      <Place x={540} y={860} rotate={-4}>
        <Enter kind="rise" delay={8} config={SPRING.heavy}>
          <Float amp={6} rotate={1.5}>
            <Ticket />
          </Float>
        </Enter>
      </Place>
      <Place x={540} y={1190} rotate={-3}>
        <Stamp text="RELEASED" at={film} size={96} font={FONT.type} color={C.red} />
      </Place>
      <AbsoluteFill style={{background: `rgba(255,250,230,${interpolate(frame, [film, film + 4, film + 12], [0, 0.5, 0], clamp)})`}} />
      <Sfx at={0} src="whoosh.wav" volume={0.35} />
      <Sfx at={8} src="paper.wav" volume={0.6} />
      <Sfx at={hall} src="pop.wav" volume={0.4} />
      <Sfx at={film} src="stamp.wav" volume={0.85} />
      <Sfx at={film + 6} src="flicker.wav" volume={0.3} />
    </AbsoluteFill>
  );
}

function Award({c, from, to}: BeatProps) {
  const L = local(from);
  const name = L(c.word('award', 'दादासाहेब'));
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Place x={540} y={900}>
        <Sunburst spin={frame * 0.25} color="#f2c14e" bg="#f7e3b0" />
      </Place>
      <Camera duration={to - from} zoom={[1, 1.06]}>
        <Place x={540} y={760}>
          <Enter kind="rise" delay={2} config={SPRING.heavy}>
            <Float amp={8}>
              <Cutout border={10}><LotusMedal width={460} /></Cutout>
            </Float>
          </Enter>
        </Place>
      </Camera>
      <Place x={540} y={290}>
        <Enter kind="fade" delay={6}>
          <div style={{fontFamily: FONT.hand, fontSize: 70, color: C.ink}}>भारत का सबसे बड़ा फिल्म सम्मान</div>
        </Enter>
      </Place>
      <Place x={540} y={1190}>
        <Enter kind="pop" delay={name}>
          <TornLabel width={900} size={80} bg={C.ink} color={C.marigold} seed="award" rotate={-2}>दादासाहेब फाल्के अवॉर्ड</TornLabel>
        </Enter>
      </Place>
      <Sfx at={2} src="riser.wav" volume={0.35} />
      <Sfx at={name} src="coin.wav" volume={0.6} />
    </AbsoluteFill>
  );
}

// ------------------------------------------------------------------ assembly

export function PhalkeShort(props: ShortProps) {
  return (
    <ShortShell
      {...props}
      beats={[
        {first: 'hook1', render: (p) => <Hook {...p} line="hook1" />},
        {first: 'hook2', render: (p) => <Jewels {...p} />},
        {first: 'theatre', render: (p) => <Theatre {...p} />, wipe: true},
        {first: 'pea1', render: (p) => <PeaPlantBeat {...p} />},
        {first: 'london', render: (p) => <London {...p} />},
        {first: 'nowomen', render: (p) => <Casting {...p} />, wipe: true},
        {first: 'salunke', render: (p) => <Salunke {...p} />},
        {first: 'saraswati', render: (p) => <Saraswati {...p} />},
        {first: 'release', render: (p) => <Release {...p} />, wipe: true},
        {first: 'award', render: (p) => <Award {...p} />},
        {first: 'loop', render: (p) => <Hook {...p} line="loop" />},
      ]}
    />
  );
}
