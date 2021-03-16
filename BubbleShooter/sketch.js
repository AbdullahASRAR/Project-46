var database;
var back_img;
var gameover_img;
var gameover;
var background_img;
var gameState =0;
var playerCount = 0;
var allPlayers;
var score =0;
var player,form,game;
var player1,player2;
var bullet1,bullet2;
var players;
var bubbles;
var bubbleGroup;
var blackBubbleGroup;
var blackBubble;
var background;
var bullets;
var bulletGroup;
var bubbleBlue_img, bubbleRed_img, bubbleGreen_img, bubbleYellow_img, bubblePink_img, bubbleGrey_img,bubbleBlack_img;
var bullet_img;
var player_img;
var player1score =0;
var player2score =0;
var GameOverSou;
var bubblePopSou;
var gunShotSou;



function preload(){
  back_img = loadImage("images/bckgrnd.png");
 // gameover_img=loadImage("images/bckgrnd2.jpg/");
  player1_img = loadImage("images/hunter-1.png");
  player2_img = loadImage("images/hunter-2.png");
  bullet1_img = loadImage("images/bullet2.png");
  bullet2_img = loadImage("images/bullet.png");
  bubbleBlue_img = loadImage("images/bubble.blue.png");
  bubbleRed_img = loadImage("images/bubble.red.png");
  bubbleGreen_img = loadImage("images/bubble.green.png");
  bubbleYellow_img = loadImage("images/bubble.yellow.png");
  bubblePink_img = loadImage("images/bubble.pink.png");
  bubbleGrey_img = loadImage("images/bubble.grey.png");
  bubbleBlack_img = loadImage("images/bubble.black.png");
  GameOverSou = loadSound("gameOver.wav");
  bubblePopSou = loadSound("bubblesPoping.wav");
  gunShotSou = loadSound("gunShoot.mp3");
  bubbleGroup = new Group();
  blackBubbleGroup = new Group();

}
function setup() {
  createCanvas(1000, 600);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  bulletGroup=new Group();
  
}

function draw() {
  background(back_img);
  if (gameState === 1) {
    clear(); 
    game.play();
  }
  else if (gameState === 2&&playerCount===2) {
    game.update(2);
    game.end();

  }
  else if (playerCount === 2) {
    game.update(1);
  }

}

