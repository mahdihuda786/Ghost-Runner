var tower,towerImage; 
var ghost, ghostRunning, ghostStanding;
var door, doorImage;
var climber, climberImage;
var doorGroup,climberGroup;
var invisibleBlock,invisibleBlockGroup;

var gameState = "play";
var spookySound;




function preload()
{
  towerImage = loadImage("tower.png");  
  ghostRunning = loadImage("ghost-jumping.png");
  ghostStanding = loadImage("ghost-standing.png");
  
  doorImage = loadImage("door.png");
  
  climberImage = loadImage("climber.png");
  
  spookySound = loadSound("spooky.wav");
}


function setup()
{
  createCanvas(600,600);
  
  tower = createSprite(300,300,600,600);
  tower.addImage(towerImage);
  tower.velocityY = 3;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostRunning);
  ghost.scale = 0.3;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
  
  spookySound.loop();
}


function draw()
{
  background("black");
  
  if(gameState === "play")
  {
    if (tower.y > 600)
    {
       tower.y = 300; 
    }

    if (keyDown("left_arrow"))
    {
      ghost.x=ghost.x-3;
    }

    if (keyDown("right_arrow"))
    {
      ghost.x=ghost.x+3;
    }

    if (keyDown("space"))
    {
      ghost.velocityY = -7;
      ghost.addImage(ghostRunning);
    }

    if (climberGroup.isTouching(ghost))
    {
      ghost.addImage(ghostStanding);
      ghost.velocityY = 0;     
    }

    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600)
    {
      ghost.destroy();
      gameState = "end";
    }
    
    ghost.velocityY = ghost.velocityY+0.5;
    spawnDoors();
  }  
  
  
  
    
  drawSprites();
  
  if (gameState === "end")
  {
     stroke("yellow");
     fill("yellow");
     textSize(50);
     text("Game Over",150,250); 

     tower.velocityY = 0;

     doorGroup.setVelocityYEach(0);
     climberGroup.setVelocityYEach(0);
     invisibleBlockGroup.setVelocityYEach(0);  
  }
}

function spawnDoors()
{
  if (frameCount % 300 === 0)
  {
    door = createSprite(200,-50,13,13);
    door.addImage(doorImage);
    door.velocityY = 1;
    door.x = Math.round(random(120,400));
    door.lifetime = 600;
    
    ghost.depth = door.depth; ghost.depth +=1
    
    climber = createSprite(200,10,13,13);
    climber.addImage(climberImage);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 600;
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 600;
    invisibleBlock.visible=false;
    
    
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    
    
  }



}