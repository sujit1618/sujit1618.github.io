let choice, size;

function setup() {
  const dims = getViewerDimensions();
  createCanvas(dims.width, dims.height);
  background("#331d1d");
  noLoop();

  size = 20;

  for (let i = 0; i < width; i += size) {
    for (let j = 0; j < height; j += size) {
      choice = random(0, 1);
      if (choice < 0.5) {
        stroke("#9f3434");
        line(i, j, i + size, j + size);
      } else {
        stroke("#e1b486");
        line(i, j + size, i + size, j);
      }
    }
  }
}

function draw() {
}

function getViewerDimensions() {
  return {
    width: windowWidth,
    height: windowHeight,
  };
}
