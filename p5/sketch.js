function setup() {
    const dimensions = getViewerDimensions();
    createCanvas(dimensions.width, dimensions.height);
}
  
function draw() {
    let randomRange = random(1,5);
    let screenSize = getViewerDimensions();
    background(220);
    resizeCanvas(screenSize.width, screenSize.height);
    ellipse(screenSize.width/2, screenSize.height/2, mouseX, mouseY);
    ellipse(screenSize.width/2, screenSize.height/2, mouseY/1.2, mouseX/1.2);
    ellipse(screenSize.width/2, screenSize.height/2, mouseX/2, mouseY/2);
}

function getViewerDimensions() {
    return {
        width: windowWidth,
        height: windowHeight
    };
}

