// EffectCraft (After Effects-style JSX): a transparent 1.5 s impact sting for a big number,
// overlaid in FilmCraft on the spoken word. Edit STING below, then:
//   effectcraft-cli --empty script scripts/effectcraft/sting.jsx --save-as projects/shorts/<slug>/fx/sting.ecproj
//   effectcraft-cli --project projects/shorts/<slug>/fx/sting.ecproj render --comp sting --out .../sting.mov --format prores --prores 4444 --channels rgba
var STING = {text: "50x", color: [1, 0.784, 0.239], y: 1060, size: 380};

var W = 1080, H = 1920, DUR = 1.5, FPS = 30;
var comp = app.project.items.addComp("sting", W, H, 1, DUR, FPS);
var gold = STING.color;

function ring(name, delay, width, endScale) {
  var layer = comp.layers.addShape();
  layer.name = name;
  var group = layer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
  var items = group.property("ADBE Vectors Group");
  items.addProperty("ADBE Vector Shape - Ellipse").property("ADBE Vector Ellipse Size").setValue([420, 420]);
  var stroke = items.addProperty("ADBE Vector Graphic - Stroke");
  stroke.property("ADBE Vector Stroke Color").setValue(gold);
  stroke.property("ADBE Vector Stroke Width").setValue(width);
  layer.transform.position.setValue([W / 2, STING.y]);
  layer.transform.scale.setValuesAtTimes([0.04 + delay, 0.6 + delay], [[15, 15], [endScale, endScale]]);
  layer.transform.opacity.setValuesAtTimes([0.04 + delay, 0.12 + delay, 0.6 + delay], [0, 100, 0]);
  var glow = layer.Effects.addProperty("ADBE Glo2");
  glow.property("ADBE Glo2-0003").setValue(40);
  return layer;
}

ring("shockwave", 0, 30, 300);
ring("shockwave 2", 0.1, 12, 380);

var text = comp.layers.addText(STING.text);
text.name = "number";
var doc = text.property("ADBE Text Properties").property("ADBE Text Document").value;
doc.font = "Arial-Black";
doc.fontSize = STING.size;
doc.fillColor = gold;
doc.applyStroke = true;
doc.strokeColor = [0.09, 0.07, 0.04];
doc.strokeWidth = 14;
doc.justification = ParagraphJustification.CENTER_JUSTIFY;
text.property("ADBE Text Properties").property("ADBE Text Document").setValue(doc);
text.transform.position.setValue([W / 2, STING.y + STING.size * 0.35]);
// Punch in past full size, settle, hold, then pop out.
text.transform.scale.setValuesAtTimes([0, 0.12, 0.22, 1.2, 1.45], [[0, 0], [128, 128], [100, 100], [104, 104], [0, 0]]);
text.transform.rotation.setValuesAtTimes([0, 0.22], [-12, -4]);
text.transform.opacity.setValuesAtTimes([0, 0.05, 1.3, 1.45], [0, 100, 100, 0]);
var glow = text.Effects.addProperty("ADBE Glo2");
glow.property("ADBE Glo2-0003").setValue(60);
glow.property("ADBE Glo2-0004").setValue(1.6);
var shadow = text.Effects.addProperty("ADBE Drop Shadow");
shadow.property("ADBE Drop Shadow-0004").setValue(18);
shadow.property("ADBE Drop Shadow-0005").setValue(30);
shadow.property("ADBE Drop Shadow-0002").setValue(180);

"sting: " + comp.numLayers + " layers, " + DUR + " s";
