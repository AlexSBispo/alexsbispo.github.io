// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(750, 400, Phaser.AUTO, 'game', stateActions);
var score = -2;
var labelScore;
var player;
var pipes = [];

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
  game.load.image("playerImg","../assets/flappy_frog.png");
  game.load.image("backgroundImg","../assets/bg1.jpg");
  game.load.audio("score","../assets/point.ogg");
  game.load.image("pipeBlock","../assets/pipe_blue.png");


}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    var background = game.add.image(0, 0, "backgroundImg");
    background.width = 790;
    background.height = 500;
    labelScore = game.add.text(30,20,"0", {font: "40px Helvetica", fill: "#FFFFFF"});
    score = -2;
    player = game.add.sprite(60,20,"playerImg");
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    player.x = 60;
    player.y = 200;
    player.body.gravity.y = 600;


  generatePipe();
    game.input
    .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(playerJump);

    var pipeInterval = 1.5 * (Phaser.Timer.SECOND - score);
    game.time.events.loop (
      pipeInterval,
      generatePipe
    );

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

}

function boundary() {
  if (player.y < 0) {
      game.state.restart();
  }
  else if (player.y > 400) {
      game.state.restart();
  }
}
function gameOver(){
  registerScore(score);
  game.state.restart();


}

function  addPipeBlock (x, y) {
  var block = game.add.sprite(x,y, "pipeBlock");
  pipes.push(block);
  game.physics.arcade.enable(block);
  block.body.velocity.x = -250 + (score);

}

function playerJump () {
  player.body.gravity.y = player.body.gravity.y * -1;
}

function changeScore () {
  score = score + 1;

  if (score > 0) {
      labelScore.setText(score.toString());
        game.sound.play("score");
  }

}
function generatePipe () {
  var gap = game.rnd.integerInRange(1, 5);
  for (var count=0; count<8; count++) {
    if (count != gap && count != gap + 1) {
        addPipeBlock(740, count*50);

          }
  }
  changeScore();

}

      function registerScore (){

        var playerName = prompt("What's your name?");
        var scoreEntry = "<li>" + playerName + ":" + score.toString() + "</li>";

      $("#scores").append(
        "<div>" + scoreEntry + "</div>"
      );
    }
