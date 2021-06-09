var bg,bga;
var monkey,monkeyrunning;
var stone,stoneimage;
var banana,bananaimage;
var foodGroup,obstacleGroup;
function preload(){
  bga=loadImage("jungle.jpg");
  var score;
  monkeyrunning=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  stoneimage=loadImage("stone.png");
  bananaimage=loadImage("banana.png");
  
  
}
function setup(){
  createCanvas(800,400);
  
  
  bg=createSprite(0,0,800,400);
  bg.addImage(bga);
  bg.scale=1.5;
  bg.velocityX=-4;
  
  monkey=createSprite(100,340,10,10);
  monkey.addAnimation("running",monkeyrunning);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,800,20);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  foodGroup=new Group()
  obstacleGroup=new Group()
  score=0;
}
function draw(){
  background(255);
  if(bg.x<0){
    bg.x=bg.width/2;
  }
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  if(foodGroup.isTouching(monkey)){
    score=score+2;
  }
  switch(score){
    case 10:monkey.scale=0.12;
      break;
      case 20:monkey.scale=0.14;
      break;
      case 30:monkey.scale=0.16;
      break;
      case 40:monkey.scale=0.18;
      break;
      default:break;
  }
  if(keyDown("space")){
    monkey.velocityY=-10;
  }
  monkey.velocityY=monkey.velocityY+0.5;
  monkey.collide(ground);
  spawnfood();
  spawnobstacle();
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale=0.08;
    score=score-2;
  }
  drawSprites();
  fill(255);
  text("SCORE:"+ score,500,50);
  
  
  
}

function spawnfood(){
  if(World.frameCount%80===0){
     banana=createSprite(600,250,10,10);
    banana.y=Math.round(random(150,200));
    banana.velocityX=-5;
    banana.lifetime=150;
    monkey.depth=banana.depth;
    monkey.depth+=1;
    banana.addImage(bananaimage);
    banana.scale=0.05;
    foodGroup.add(banana);
  }
}
function spawnobstacle(){
  if(World.frameCount%300===0){
     obstacle=createSprite(600,340,20,20);
    obstacle.velocityX=-5;
    obstacle.addImage(stoneimage);
    obstacle.lifetime=150;
    obstacle.scale=0.1;
    obstacleGroup.add(obstacle);
  }
  
} 