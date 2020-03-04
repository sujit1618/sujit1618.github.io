

function setup() {
  canvasX = vw(100);
  canvasY = vh(100);
  createCanvas(canvasX, canvasY);


  //frameRate(fps);
  //  downloadSheet();
  noFill();
}


function draw() {
  let a = mouseY / 10;
  background(0, 0, 250);
  strokeWeight(mouseX / 100);
  stroke(0);
  for (let i = 0; i < mouseY / 10; i++) {
    line(i * a, i * a, canvasX - i * a, i * a);
    line(canvasX - i * a, i * a, canvasX - i * a, canvasY - i * a);
    line(canvasX - i * a, canvasY - i * a, i * a, canvasY - i * a);
    line(i * a, canvasY - i * a, i * a, i * a + a);
    line(i * a, i * a + a, (i + 1) * a, i * a + a);

  }
}

function vh(v) {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (v * h) / 100;
}

function vw(v) {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return (v * w) / 100;
}
