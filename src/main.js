let simon;

function setup() {
    createCanvas(800,800);
    simon = new Simon(0,0,60,60);
}

function draw() {
    background(255);
    simon.update();
    simon.draw();
}

function keyPressed() {
    simon.keyPressed(keyCode);
}
