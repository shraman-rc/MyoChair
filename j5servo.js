var five = require("johnny-five");
var Edison = require("edison-io");
var http = require("http");
var express = require("express");

var app = express();
var board = new five.Board({
  io: new Edison()
});

var leftservo;
var rightservo;
var direction = true;

var forwardBtn = document.getElementById("forward");
var backBtn = document.getElementById("back");
var spinBtn = document.getElementById("spin");

forwardBtn.addEventListener("click", function() {forward();});
backBtn.addEventListener("click", function() {back();});
spinBtn.addEventListener("click", function() {spin();});

board.on("ready",function(){

  leftservo = new five.Servo({
    pin : 3,
    type : "continuous"
  });

  rightservo = new five.Servo({
    pin : 5,
    type : "continuous"
  });

});

var switchDirections = function() {
  if(direction){ leftservo.cw(1); rightservo.ccw(1);}
  else { leftservo.ccw(1); rightservo.cw(1);}
  direction = !direction;
};

var back = function() {
  leftservo.cw(1);
  rightservo.ccw(1);
}

var forward = function() {
  leftservo.ccw(1);
  rightservo.cw(1);
}

var spin = function() {
  leftservo.cw(1);
  rightservo.cw(1);
}

app.get('/', function (req, res) {
  res.sendfile("./example.html");
});

app.get('/switch', function (req, res) {
  console.log("Switch request");
  switchDirections();
});

app.get('/b', function (req, res) {
  console.log("Back request");
  back();
});

app.get('/f', function (req, res) {
  console.log("Forward request");
  forward();
});

app.get('/s', function (req, res) {
  console.log("Spin request");
  spin();
});

var server = app.listen(8080, function() {
  console.log("Example app listening...");
});

app.use("/", express.static(__dirname));
