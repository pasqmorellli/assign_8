var s;
var scl = 50;
var food;

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
  s = new Snake();
  frameRate(5);
  pickLocation();
}

function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function draw() {
  background(164, 209, 142);

  if (s.eat(food)) {
    pickLocation();
  }

  orientation();
  s.update();
  s.show();

  stroke(164, 209, 142);
  strokeWeight(6);
  fill(0, 0, 0);
  rect(food.x, food.y, scl, scl);

  noStroke();
  fill(0, 0, 0)
  textAlign(CENTER);
  textSize(28);
  text('rotate your device to move the snake', width / 2, height / 2);
}

function orientation() {
  if (rotationX < 20) {
    s.dir(0, -1);
  } else if (rotationX > 70) {
    s.dir(0, 1);
  } else if (rotationY < -25) {
    s.dir(-1, 0);
  } else if (rotationY > 25) {
    s.dir(1, 0);
  }
}

function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  }

  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.update = function() {
    if (this.total == this.tail.length) {
      for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  }

  this.show = function() {
    stroke(164, 209, 142);
    strokeWeight(6);
    fill(0, 0, 0);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }

    rect(this.x, this.y, scl, scl);
  }
}