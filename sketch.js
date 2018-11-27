var myMap;
var canvas;
var earthQuakes = [];

var mappa = new Mappa('MapboxGL', "pk.eyJ1IjoiYWlzbGluZ2siLCJhIjoiY2pmaWNrcTV3MDBkODJ4cXI4OTU5dzdjMyJ9.WuIfO31e1iVn-8cHtWGjhg");

var options = {
  lat: 20,
  lng: 0,
  zoom: 1.6,
  style: "mapbox://styles/aislingk/cjp07y1sx00ii2smzthgi9i5v",
  pitch: 0
}

var earthquake = function(la, ln, de) {
  this.laa = la;
  this.lnn = ln;
  this.dee = de;
  this.deee = map(this.dee, 0, 1000, 0, 40);
  this.drawNumber = function() {
    fill(10,255,255,70);
    stroke(255,255,10);
    var point = myMap.latLngToPixel(this.laa,this.lnn);
    ellipse(point.x,point.y,this.deee);
  }
}

function preload() {
  table = loadTable("assets/hearthquakes.csv", "csv", "header");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  var rows = table.getRows();
  for (var i = 0; i < rows.length; i++) {
    var lat = rows[i].getNum("Latitude");
    var lng = rows[i].getNum("Longitude");
    var depth = rows[i].getNum("Depth");
    var earthQuake = new earthquake(lat, lng, depth);
    earthQuakes.push(earthQuake);
  }

}

function draw() {
  clear();

//text
  fill(60);
  noStroke();
  textSize(18);
  textFont('Lora');
  text('[ Earthquake All Over World ]', width/20, height/15);

//function
  for (var i in earthQuakes) {
    earthQuakes[i].drawNumber();
  }
}

function mouseWheel() {
  redraw()
  return false
}

function mouseMoved() {
  redraw()
  return false
}
