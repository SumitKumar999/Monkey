var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver, restart;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, SurvivalTime, obstacleImage, monkeyStopImage;
var FoodGroup, obstacleGroup;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkeyStopImage = loadAnimation("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(400,400);
  
  monkey=createSprite(100,300,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  
  ground = createSprite(200,350,800,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  SurvivalTime = 0;
}


function draw() {
  background("skyblue");
  textSize(20);
  text("Survival Time: "+ SurvivalTime, 130,50);

  monkey.velocityY = monkey.velocityY + 0.5;
  
  if(ground.x<0){
     ground.x = ground.width/2;
}
  monkey.collide(ground);
  
  if(gameState === PLAY){
    
  if (keyDown("space")){
    monkey.velocityY = -12;
  }
    ground.velocityX = -4;
    FoodGroup.velocityX  = -7;
    obstacleGroup.velocityX = -4;
    spawnBanana();
    spawnObstacles();
    
    SurvivalTime=Math.ceil(frameCount/frameRate());
  }
  
  if(gameState === END){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    monkey.addAnimation("collided", monkeyStopImage);
  }
  
  
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
  }
  
  if(obstacleGroup.isTouching(monkey)){
   gameState = END;
   
  }
  
  
  drawSprites();
}

function spawnBanana(){
 if (frameCount % 80 === 0){
   var banana = createSprite(400,200,10,10);
   banana.velocityX = -7;
   banana.y = Math.round(random(100,300));
   banana.addImage(bananaImage);
   banana.scale = 0.08;
   banana.lifetime = 370;
   FoodGroup.add(banana);
 }
}


function spawnObstacles(){
  if(frameCount % 180 === 0){
    var obstacle = createSprite(400,310,50,50);
    obstacle.velocityX = -4;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.lifetime = 390;
    obstacleGroup.add(obstacle);
  }
  
  
}