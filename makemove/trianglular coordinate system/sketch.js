let canvasX=400;
let canvasY=400;

function setup (){
  canvasX=vw(100);
  canvasY = vh(100);

  createCanvas(canvasX,canvasY);
  background(30,0,150);

}

function draw(){
  point(100,100)
}

//---------- viewport related functions go here ------------

function vh(v) {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (v * h) / 100;
}

function vw(v) {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return (v * w) / 100;
}

function lowerTriangles() {
  fill(white);
  stroke(white);
  triangle(canvasX / 2, canvasY - 0.5, 0, canvasY - 0.5, 0, 0); //lhs
  triangle(canvasX / 2, canvasY - 0.5, canvasX - 0.5, canvasY - 0.5, canvasX - 0.5, 0); //rhs
}
