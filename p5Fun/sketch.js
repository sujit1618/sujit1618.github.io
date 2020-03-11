function setup() {
  canvasX = vw(100);
  canvasY = vh(100);
  createCanvas(canvasX, canvasY);


  //frameRate(fps);
  //  downloadSheet();
  noFill();
}


function draw() {
  console.log(mouseX);
  console.log(mouseY);
let b=mouseX;
let a=mouseY;

if (a>5) {
    a=mouseY/10;
    frameRate(30);
  }
  else if (a<=5||b<=5) {
    frameRate(12);
    a=canvasY/random(17,15);
    b=200;
  }



  background(0, 0, 250);
  strokeWeight(5);
  stroke(0);
  for (let i = 0; i < a; i++) {
    line(i * a, i * a, canvasX - i * a, i * a);
    line(canvasX - i * a, i * a, canvasX - i * a, canvasY - i * a);
    line(canvasX - i * a, canvasY - i * a, i * a, canvasY - i * a);
    line(i * a, canvasY - i * a, i * a, i * a + a);
    line(i * a, i * a + a, (i + 1) * a, i * a + a);
  }
  fill(255);
  noStroke();
  //text(a,mouseX+10,mouseY+10);
  //text(b,mouseX-10,mouseY-10);
}

function vh(v) {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (v * h) / 100;
}

function vw(v) {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return (v * w) / 100;
}
