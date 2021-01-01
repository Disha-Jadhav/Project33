const Events = Matter.Events;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
 
var particles = [];
var plinkos = [];
var divisions = [];

var divisionHeight = 300;
var score = 0;
var particle;
var turn = 0;

var gameState = "start";

function setup() 
{
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2, height, width, 20);

  for (var k = 0; k <= width; k = k + 80) 
  {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  for (var j = 75; j <= width; j = j + 50) 
  {
    plinkos.push(new Plinko(j, 75));
  }

  for (var j = 50; j <= width - 10; j = j + 50) 
  {
    plinkos.push(new Plinko(j, 175));
  }

  for (var j = 75; j <= width; j = j + 50) 
  {
    plinkos.push(new Plinko(j, 275));
  }

  for (var j = 50; j <= width - 10; j = j + 50) 
  {
    plinkos.push(new Plinko(j, 375));
  }  
}

function draw() 
{
  background("black");

  Engine.update(engine);
 
  for (var i = 0; i < plinkos.length; i++) 
  {
    plinkos[i].display();
  }
  /*if(frameCount % 60 === 0)
  {
    particles.push(new Particle(random(width/2 - 30, width/2 + 30), 10, 10));
  }*/
 
  for (var j = 0; j < particles.length; j++) 
  {
    particles[j].display();
  }
  
  for (var k = 0; k < divisions.length; k++) 
  {
    divisions[k].display();
  }


  if(particle != null)
  {
    particle.display()

    if(particle.body.position.y > 550)
    {
      if(particle.body.position.x < 300)
      {
        score = score + 500;
        if(turn >= 5)
        {
          gameState = "end"
        }
      }

      if(particle.body.position.x > 301 && particle.body.position.x < 600)
      {
        score = score + 100
        if(turn >= 5)
        {
          gameState = "end"
        }
      }

      if(particle.body.position.x > 601 && particle.body.position.x < 800)
      {
        score = score + 200
        if(turn >= 5)
        {
          gameState = "end"
        }
      }

    }
  }
  if(turn >= 5 && gameState === "end")
  {
    text("Game Over", 700, 30);
    particle = null;
    score = 0;
  }

  
  textSize(20);

  fill("white");
  stroke("white");

  text("Score : "+ score, 20, 30);
  line(0, 500, 800, 500);
}
function mousePressed()
{
  if(gameState !== "end")
  {
    turn++
    particle = new Particle(mouseX, 10, 10, 10);
  }
}