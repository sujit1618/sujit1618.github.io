let canvasX = 400;
let canvasY = 400;

let triaNumber = 10;
let halfX=0;
let halfY=0;
let area;
let height;
let base;

//--------------- define vectors ------------------

function setup() {
  background(0);
  canvasX = vw(100);
  canvasY = vh(100);
  createCanvas(canvasX, canvasY);

  noFill();

  halfX=canvasX/2;
  halfY=canvasY/2;

  strokeWeight(2);
  frameRate(30);
  y[0] = 0;
  y[1] = 0;
  y[2] = canvasY;

  height = y[2]-y[0];

  x[2]=halfX;
  x[0]=x[2]-(height/sqrt(3));
  x[1]=x[2]+(height/sqrt(3));

  base=x[1]-x[0];

  area=0.5*base*height;

}


function draw() {
  var x = new Array(triaNumber-1);
  var y = new Array(triaNumber-1);


  background(0);
  labelledTriangle(area/400);
  stroke(255,0,0);
  let y1=y[0]+b;
  let x1=sqrt(3)/y1;
  fill(255);
  ellipse(x1,y1/3,10,10);
  noFill();
  noStroke();


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

function labelledTriangle(){
  stroke(100);
  triangle(x[0], y[0], x[1], y[1], x[2], y[2]);
  //line(x[2],y[0],x[2],y[2]);
  fill(255);
  noStroke();
  text('x0',x[0]+a,y[0]+a);
  text('y0',x[0]+a,y[0]+2*a);
  text('x1',x[1]-a,y[1]+a);
  text('y1',x[1]-a,y[1]+2*a);
  text('x2',x[2],y[2]-a);
  text('y2',x[2],y[2]-2*a);
  noFill();
}
