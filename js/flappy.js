// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var width = 790;
var height = 400;
var game = new Phaser.Game(750, 400, Phaser.AUTO, 'game', stateActions);
var score = -2;
var labelScore;
var player;
var pipes = [];
var balloons = [];
var weight = [];
var maximumScores = 0;
var gapSize = 80;
var gapMargin = 40;
var blockHeight = 50;
var pipeEndHeight = 25;
var pipeEndExtraWidth= 10;
var gameGravity = 800;
var gameStyle = 1;
var bgSpeed = 10;


/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
  game.load.image("player1","../assets/flappy_frog.png");
  game.load.image("player2","../assets/flappy_frog2.png");
  game.load.image("backgroundImg","../assets/bg.png");
  game.load.audio("score","../assets/point.ogg");
  game.load.image("pipeBlock","../assets/pipe_blue.png");
  game.load.image("pipeEnd","../assets/pipe-end.png");
  game.load.image("pipeEnd2","../assets/pipe-end2.png");
  game.load.image("balloons","../assets/balloons.png");
  game.load.image("weight","../assets/weight.png");
  game.load.audio("music","../assets/blue.wav");

}

/*
 * Initialises the game. This function is only called once.
 */

var music;

function create() {
    // set the background colour of the scene
    music = game.add.audio("music");
    music.play();

    var backgroundSprite = game.add.tileSprite(0, 0, 3840, 400, "backgroundImg");
    backgroundSprite.autoScroll(-bgSpeed, 0);
    player = game.add.sprite(60, 200,"player1");
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    player.body.gravity.y = gameGravity;
    player.x = 80;
    player.y = 200;
    player.anchor.setTo(0.5, 0.5);



    game.input
    .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(jump);


    var Interval = (0.7) + (1.5 * Phaser.Timer.SECOND);
        game.time.events.loop (
            Interval,
            generate
          );

    var pipeInterval = 1.5 * Phaser.Timer.SECOND;
    game.time.events.loop (
      pipeInterval,
      generatePipe
    );

    labelScore = game.add.text(30,20,"0", {font: "50px Impact", fill: "#FFFFFF", stroke: "#000000", strokeThickness: 5});
    score = -2;


game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(scoreChange);
  }

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {


game.physics.arcade.overlap (
    player,
            pipes,
            gameOver);
  boundary();
player.rotation = Math.atan(player.body.velocity.y / 450);

for(var i = balloons.length - 1; i >= 0; i--) {
  game.physics.arcade.overlap(player, balloons [i], function(){
    player.body.gravity.y = 1000;
    gameStyle = -1;
    balloons[i].destroy();
    balloons.splice(i, 1);


  });
}

for (var i = weight.length - 1; i >= 0; i--) {
  game.physics.arcade.overlap(player, weight [i], function(){
    gameStyle = 1;
    weight[i].destroy();
    weight.splice(i, 1);


  });
}

}

function jump() {
  if (gameStyle > 0) {
    playerGrav();
  }
  if (gameStyle < 0) {
    playerJump();
  }
}
function generate() {
  var dice = game.rnd.integerInRange(1,8);
if (gameStyle < 0){
  if (dice == 1) {
    generateWeight();
}}

if (gameStyle > 0) {
 if (dice == 2) {
    generateBalloons();
}}
}

function changeGravity(g) {
  gameGravity += g;
  player.body.gravity.y = gameGravity;

}

function generateWeight () {
  var bonus = game.add.sprite(width, 0, "weight");
  weight.push(bonus);
  game.physics.arcade.enable(bonus);
  bonus.body.velocity.x = -20;
  bonus.body.velocity.y = game.rnd.integerInRange(60,100);
}
function generateBalloons () {
  var bonus = game.add.sprite(width, height , "balloons");
  balloons.push(bonus);
  game.physics.arcade.enable(bonus);
  bonus.body.velocity.x = -200;
  bonus.body.velocity.y = - game.rnd.integerInRange(60,100);
}
function playerGrav(){
  player.body.gravity.y = -1 * player.body.gravity.y;
}

function playerJump () {
  player.body.velocity.y = -360;
}

function boundary() {

  if (player.y < 0) {
    if (score >= 1) {
    registerScore(score); }
      game.state.restart();
      player.body.y.gravity = gameGravity;
      gameStyle = 1;
      music.stop();
  }
  else if (player.y > 400) {
    if (score >= 1){
    registerScore(score); }
      game.state.restart();
      player.body.y.gravity = gameGravity;
      gameStyle = 1;
      music.stop();
  }
}

function gameOver(){
  if (score >=1 ){
  registerScore(score); }
  game.state.restart();
  player.body.y.gravity = gameGravity;
  gameStyle = 1;
  music.stop();



}

function  addPipeBlock (x, y) {
  var block = game.add.sprite(x,y, "pipeBlock");
  pipes.push(block);
  game.physics.arcade.enable(block);
  block.body.velocity.x = -250;

}

function addPipeEndTop(x,y) {
  var block = game.add.sprite (x,y,"pipeEnd");
  pipes.push(block);
  game.physics.arcade.enable(block);
  block.body.velocity.x = -250;
}

function addPipeEndBot(x,y) {
  var block = game.add.sprite (x,y,"pipeEnd2");
  pipes.push(block);
  game.physics.arcade.enable(block);
  block.body.velocity.x = -250;
}


function generatePipe() {
  var gapStart = game.rnd.integerInRange (gapMargin, height - gapSize - gapMargin);
  addPipeEndBot(width - (pipeEndExtraWidth / 2), gapStart - 25);
    for(var y = gapStart - pipeEndHeight; y > 0; y -= blockHeight){
      addPipeBlock(width, y - blockHeight);
 }

 addPipeEndTop(width - (pipeEndExtraWidth /2), gapStart + gapSize);
    for(var y = gapStart + gapSize + pipeEndHeight ; y < height; y += blockHeight) {
      addPipeBlock(width, y);
 }
 changeScore();
}

function changeScore () {
  score = score + 1;

  if (score > 0) {
      labelScore.setText(score.toString());
        game.sound.play("score");
  }

}

function registerScore (){
  if (maximumScores < 10) {
        var playerName = prompt("What's your name?");
        var scoreEntry = "<li>" + playerName + ":" + score.toString() + "</li>";

      $("#scores").append(
        "<div>" + scoreEntry + "</div>"
      );
      maximumScores++;
    }
  }

  function scoreChange() {
    score = score + 20;
  }
