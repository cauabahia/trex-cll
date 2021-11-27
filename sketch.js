var JOGAR = 1;
var ENCERRAR = 0;
var estadoJogo = JOGAR;

var trex, trex_correndo, trex_colidiu;
var solo, soloinvisivel, imagemdosolo;

var nuvem, grupodenuvens, imagemdanuvem;
var grupodeobstaculos, obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;

var pontuacao;


function preload(){
  trex_correndo = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_colidiu = loadAnimation("trex_collided.png");
  
  imagemdosolo = loadImage("ground2.png");
  imagemgameover=loadImage("gameOver.png")
  imagemdanuvem = loadImage("cloud.png");
  imagemmi=loadImage("restart.png")
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  gameover=createSprite(300,100)
  gameover.addImage("gameOver",imagemgameover)
  mi=createSprite(300,140)
  mi.addImage("restart",imagemmi)
  trex = createSprite(50,height-90,20,50);
  trex.addAnimation("running", trex_correndo);
  trex.addAnimation("collided" , trex_colidiu)
  trex.scale = 0.5;
  gameover.visible=false
  mi.visible=false
  solo = createSprite(200,height-100,400,20);
  solo.addImage("ground",imagemdosolo);
  solo.x = solo.width /2;
  solo.velocityX = -4;
  
  soloinvisivel = createSprite(200,height-90,400,10);
  soloinvisivel.visible = false;
   
  //criar grupos de obstáculos e de nuvens
  grupodeobstaculos = createGroup();
  grupodenuvens = createGroup();
  trex.setCollider("circle",0,0,40)
  
  trex.debug=false
  console.log("Oi" + 5);
  
  pontuacao = 0;
}

function draw() {
  background(180);
  //exibindo pontuação
  text("Pontuação: "+ pontuacao, 500,50);
    
  
  
  if(estadoJogo === JOGAR){
    //mover o solo
    solo.velocityX = -(4+pontuacao/5000);
    //marcando pontuação
    pontuacao = pontuacao + Math.round(frameCount/60);
    
    if (solo.x < 0){
      solo.x = solo.width/2;
    }
    
    //saltar quando a tecla de espaço é pressionada
    if((touches.length>0 ||keyDown("space"))&& trex.y >= height-130) {
       trex.velocityY = -13;
      touches=[]
  }
  
    //adicionar gravidade
    trex.velocityY = trex.velocityY + 0.8
   
    //gerar as nuvens
    gerarNuvens();
  
    //gerar obstáculos no solo
    gerarObstaculos();
    
    if(grupodeobstaculos.isTouching(trex)){
        estadoJogo = ENCERRAR;
    }
  }
     else if (estadoJogo === ENCERRAR) {
      solo.velocityX = 0;
      trex.changeAnimation("collided")
     gameover.visible=true
  mi.visible=true
       grupodeobstaculos.setLifetimeEach(-8532353211353211344)
     grupodenuvens.setLifetimeEach(-8532353211353211344)
       grupodeobstaculos.setVelocityXEach(0);
     grupodenuvens.setVelocityXEach(0);
    if(touches.length>0 ||mousePressedOver(mi)){
      touches=[]
      estadoJogo=JOGAR    
      grupodeobstaculos.destroyEach()
        grupodenuvens.destroyEach()
       gameover.visible=false
      mi.visible=false
      trex.changeAnimation("running")
      
      
       }
     
     
     
     }
  
  
  //evita que o Trex caia no solo
  trex.collide(soloinvisivel);

  
  
  drawSprites();
}

function gerarObstaculos(){
 if (frameCount % 60 === 0){
   var obstaculo = createSprite(600,height-120,10,40);
  obstaculo.velocityX = -(4+pontuacao/5000);
      
    //gerar obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstaculo.addImage(obstaculo1);
              break;
      case 2: obstaculo.addImage(obstaculo2);
              break;
      case 3: obstaculo.addImage(obstaculo3);
              break;
      case 4: obstaculo.addImage(obstaculo4);
              break;
      case 5: obstaculo.addImage(obstaculo5);
              break;
      case 6: obstaculo.addImage(obstaculo6);
              break;
      default: break;
    }
   
    //atribuir escala e tempo de duração ao obstáculo         
    obstaculo.scale = 0.5;
    obstaculo.lifetime = 300;
   
    //adicionar cada obstáculo ao grupo
    grupodeobstaculos.add(obstaculo);
 }
}

function gerarNuvens() {
  //escreva o código aqui para gerar as nuvens 
  if (frameCount % 60 === 0) {
    nuvem = createSprite(600,100,40,10);
    nuvem.y = Math.round(random(10,60));
    nuvem.addImage(imagemdanuvem);
    nuvem.scale = 0.5;
    nuvem.velocityX = -3;
    
     //atribuir tempo de duração à variável
    nuvem.lifetime = 274;
    
    //ajustando a profundidade
    nuvem.depth = trex.depth;
    trex.depth = trex.depth + 1;
        
    //adiciondo nuvem ao grupo
   grupodenuvens.add(nuvem);
  }
}