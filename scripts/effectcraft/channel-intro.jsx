// Movie Idiots channel intro (1920×1080, 30 fps) — EffectCraft half. Two shots, cut together in FilmCraft:
//   shotA (2.8 s): dark theatre, flickering projector beam, haze, dust particles; the mascot drops in, waves, points.
//   shotB (5.0 s, 0.4 s pre-roll for the transition): "MOVIE IDIOTS" slams in with glow, a spark burst and a
//   shockwave, a light sweep glints across "IDIOTS", the tagline wipes on, the mascot gives a thumbs-up.
// Run from the repo root:
//   effectcraft-cli --empty script scripts/effectcraft/channel-intro.jsx --save-as projects/intro/intro.ecproj
//   effectcraft-cli --project projects/intro/intro.ecproj render --comp shotA --out projects/intro/shotA.mov --format prores
var ROOT = "D:/Projects/video-editor/";
var W = 1920, H = 1080, FPS = 30;
var BG = [0.067, 0.075, 0.098];           // #111319
var GOLD = [0.949, 0.729, 0.294];         // #f2ba4b
var INK = [0.961, 0.945, 0.906];          // #f5f1e7
var TAGLINE = "Good films. Bad takes. Honest conversations.";
var HANDLE = "@movieidiots5542";

function png(name) { return app.project.importFile(new ImportOptions(new File(ROOT + "public/brand/" + name + ".png"))); }
var poses = {wave: png("movie-idiot-wave"), point: png("movie-idiot-point"), thumbs: png("movie-idiot-thumbs-up")};

function solid(comp, color, name) { return comp.layers.addSolid(color, name, W, H, 1); }
function text(comp, value, size, color, font) {
  var layer = comp.layers.addText(value);
  var prop = layer.property("ADBE Text Properties").property("ADBE Text Document");
  var doc = prop.value;
  doc.font = font || "Arial-Black";
  doc.fontSize = size;
  doc.fillColor = color;
  doc.justification = ParagraphJustification.CENTER_JUSTIFY;
  prop.setValue(doc);
  return layer;
}
function glow(layer, radius, intensity) {
  var g = layer.Effects.addProperty("ADBE Glo2");
  g.property("ADBE Glo2-0003").setValue(radius);
  g.property("ADBE Glo2-0004").setValue(intensity);
  return g;
}
function shadow(layer) {
  var s = layer.Effects.addProperty("ADBE Drop Shadow");
  s.property("ADBE Drop Shadow-0004").setValue(20);
  s.property("ADBE Drop Shadow-0005").setValue(40);
  s.property("ADBE Drop Shadow-0002").setValue(160);
}
function dust(comp, name, x, y, rx, ry, rate, color, size) {
  var layer = solid(comp, [0, 0, 0], name);
  var pw = layer.Effects.addProperty("ec.sim.ccparticleworld");
  var P = "ec.sim.ccparticleworld-";
  pw.property(P + "0001").setValue(rate);
  pw.property(P + "0002").setValue(2.5);
  var prod = pw.property(P + "0003");
  prod.property("Position X").setValue(x);
  prod.property("Position Y").setValue(y);
  prod.property("Radius X").setValue(rx);
  prod.property("Radius Y").setValue(ry);
  var phys = pw.property(P + "0004");
  phys.property("Velocity").setValue(0.08);
  phys.property("Gravity").setValue(-0.02);
  var part = pw.property(P + "0005");
  part.property("Birth Size").setValue(size);
  part.property("Death Size").setValue(size * 0.6);
  part.property("Birth Color").setValue(color);
  part.property("Death Color").setValue(color);
  layer.blendingMode = BlendingMode.SCREEN;
  return {layer: layer, effect: pw};
}

// ---------------- Shot A: the projector ----------------
var A = app.project.items.addComp("shotA", W, H, 1, 2.8, FPS);
solid(A, BG, "bg");
var haze = solid(A, [0, 0, 0], "haze");
var fn = haze.Effects.addProperty("ADBE Fractal Noise");
fn.property("ADBE Fractal Noise-0010").expression = "time * 90";
haze.opacity.setValue(7);
haze.blendingMode = BlendingMode.SCREEN;

// Projector beam: a soft wedge from the top-left, flickering like an old projector.
var beam = A.layers.addShape();
beam.name = "beam";
var bg = beam.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
var path = bg.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Group");
var shape = new Shape();
shape.vertices = [[-W / 2 + 120, -H / 2 - 60], [W / 2 + 200, H / 2 - 40], [-80, H / 2 + 140]];
shape.closed = true;
path.property("ADBE Vector Shape").setValue(shape);
bg.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue([1, 0.94, 0.8]);
beam.transform.position.setValue([W / 2, H / 2]);
beam.opacity.setValue(22);
beam.opacity.expression = "22 + wiggle(14, 6) - value + random(-3, 3)";
var blur = beam.Effects.addProperty("ADBE Gaussian Blur 2");
blur.property(1).setValue(90);
beam.blendingMode = BlendingMode.ADD;
var rays = beam.Effects.addProperty("ec.generate.cclightrays");
rays.property("ec.generate.cclightrays-0001").setValue(60);
rays.property("ec.generate.cclightrays-0002").setValue([150, 0]);

// CC Particle World positions are world units from the frame centre (about 0.78 units = frame width).
dust(A, "dust", -0.05, -0.05, 0.45, 0.3, 1.1, [1, 0.93, 0.78], 0.022);

// Mascot: drop in and wave, then switch to pointing toward where the logo will land.
function mascot(comp, item, x, y, inT, outT, scale, enterFrom) {
  var layer = comp.layers.add(item);
  layer.inPoint = inT;
  if (outT) layer.outPoint = outT;
  layer.transform.position.setValuesAtTimes([inT, inT + 0.28], [[x, enterFrom], [x, y]]);
  layer.transform.scale.setValuesAtTimes([inT, inT + 0.22, inT + 0.34], [[scale * 0.6, scale * 0.6], [scale * 1.08, scale * 1.08], [scale, scale]]);
  layer.transform.rotation.expression = "Math.sin(time * 3) * 2";
  shadow(layer);
  return layer;
}
mascot(A, poses.wave, W / 2, H / 2 + 60, 0.45, 1.6, 21, -500);
var pointer = A.layers.add(poses.point);
pointer.inPoint = 1.6;
pointer.transform.position.setValue([W / 2, H / 2 + 60]);
pointer.transform.scale.setValuesAtTimes([1.6, 1.72], [[22.5, 22.5], [21, 21]]);
pointer.transform.rotation.expression = "Math.sin(time * 3) * 2";
shadow(pointer);
// Push in on the mascot through the shot (the transition carries it into shot B).
var cam = A.layers.addNull();
cam.name = "push";
var layersToPush = [];
for (var i = 1; i <= A.numLayers; i++) { var L = A.layer(i); if (L.name !== "bg" && L.name !== "push") layersToPush.push(L); }

// ---------------- Shot B: the logo ----------------
var B = app.project.items.addComp("shotB", W, H, 1, 5.0, FPS);
solid(B, BG, "bg");
var halo = B.layers.addShape();
halo.name = "halo";
var hg = halo.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
hg.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse").property("ADBE Vector Ellipse Size").setValue([1300, 900]);
hg.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue(GOLD);
halo.transform.position.setValue([1180, 560]);
halo.opacity.setValuesAtTimes([0.5, 0.9, 4.0], [0, 16, 11]);
halo.Effects.addProperty("ADBE Gaussian Blur 2").property(1).setValue(260);
var hz = solid(B, [0, 0, 0], "haze");
hz.Effects.addProperty("ADBE Fractal Noise").property("ADBE Fractal Noise-0010").expression = "time * 70";
hz.opacity.setValue(5);
hz.blendingMode = BlendingMode.SCREEN;

// Shockwave rings behind the wordmark on the IDIOTS hit.
function ring(comp, t, width, endScale, x, y) {
  var r = comp.layers.addShape();
  var g = r.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
  g.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse").property("ADBE Vector Ellipse Size").setValue([500, 500]);
  var st = g.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke");
  st.property("ADBE Vector Stroke Color").setValue(GOLD);
  st.property("ADBE Vector Stroke Width").setValue(width);
  r.transform.position.setValue([x, y]);
  r.transform.scale.setValuesAtTimes([t, t + 0.7], [[20, 20], [endScale, endScale]]);
  r.opacity.setValuesAtTimes([t, t + 0.08, t + 0.7], [0, 90, 0]);
  glow(r, 40, 1.2);
}
ring(B, 0.88, 26, 420, 1180, 560);
ring(B, 1.0, 10, 560, 1180, 560);

// Spark burst on the hit: particle birth rate spikes for a few frames.
var sparks = dust(B, "sparks", (1180 - W / 2) / W / 0.78, (600 - H / 2) / W / 0.78, 0.18, 0.05, 0, GOLD, 0.02);
var SP = "ec.sim.ccparticleworld-";
sparks.effect.property(SP + "0001").setValuesAtTimes([0.85, 0.9, 1.05, 1.1], [0, 18, 18, 0]);
sparks.effect.property(SP + "0004").property("Velocity").setValue(1.4);
sparks.effect.property(SP + "0004").property("Gravity").setValue(0.35);
glow(sparks.layer, 30, 1.5);
dust(B, "dust", 0.1, 0, 0.5, 0.3, 1.5, [1, 0.93, 0.78], 0.025);

// Wordmark: MOVIE slams first, IDIOTS (gold) second.
function slam(layer, t, x, y) {
  layer.transform.position.setValue([x, y]);
  layer.transform.scale.setValuesAtTimes([t, t + 0.12, t + 0.2], [[260, 260], [94, 94], [100, 100]]);
  layer.opacity.setValuesAtTimes([t, t + 0.06], [0, 100]);
  layer.motionBlur = true;
  glow(layer, 30, 0.8);
  shadow(layer);
}
var movie = text(B, "MOVIE", 190, INK);
slam(movie, 0.6, 1180, 470);
var idiots = text(B, "IDIOTS", 230, GOLD);
slam(idiots, 0.8, 1180, 700);
var sweep = idiots.Effects.addProperty("ec.generate.cclightsweep");
sweep.property("ec.generate.cclightsweep-0001").setValuesAtTimes([1.7, 2.5], [[-400, 600], [2400, 600]]);
sweep.property("ec.generate.cclightsweep-0004").setValue(120);
B.motionBlur = true;

var tag = text(B, TAGLINE, 46, INK, "Arial-BoldMT");
tag.transform.position.setValue([1180, 800]);
var wipe = tag.Effects.addProperty("ADBE Linear Wipe");
wipe.property(1).setValuesAtTimes([1.9, 2.9], [100, 0]);
wipe.property(2).setValue(270);
wipe.property(3).setValue(40);
var handle = text(B, HANDLE, 34, GOLD, "Arial-BoldMT");
handle.transform.position.setValue([1180, 870]);
handle.opacity.setValuesAtTimes([2.8, 3.2], [0, 100]);

mascot(B, poses.thumbs, 420, 600, 1.15, null, 19, 1500);

"intro: shotA " + A.numLayers + " layers, shotB " + B.numLayers + " layers";
