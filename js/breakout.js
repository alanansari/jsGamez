const body = document.querySelector('body');
const console = document.querySelector('.console');
const heading = document.getElementById('heading');
const pad = document.getElementById('pad');
const ball = document.getElementById('ball');
let posX=0,posY=0,ballX=375,ballY=375;
let xDir = 1,yDir = -1;
let request;


for(let i=0;i<=3;i++){
    for(let j=0;j<8;j++){
        const newBlock = document.createElement("div");
        newBlock.setAttribute("class","block");
        newBlock.setAttribute("id","block-"+i+'-'+j);
        const addBlock = document.querySelector('.console');
        newBlock.style.left = j*100 + 'px';
        newBlock.style.top = i*40 + 'px';
        addBlock.appendChild(newBlock);
    }
}

function game(){
    ballGen();
    request = requestAnimationFrame(game);
}

function ballGen(){
    ballX+=xDir*5;
    ballY+=yDir*5;
    checkCollision();
    ball.style.top = ballY + 'px';
    ball.style.left = ballX + 'px';

}

function gameOver(){
    heading.innerHTML = "Game Over";
    cancelAnimationFrame(request);
    console.style.cursor = "auto";
    body.setAttribute('onmouseover','');
}


function checkCollision(){

    // Border Collision
    if(ballX<=0)
        xDir=1;
    if(ballX>=775)
        xDir=-1;
    if(ballY<=0)
        yDir=1;
    if(ballY>=425)
        yDir=-1;

    // Pad Collision
    if(ballY>375&&ballY<400){
        let spos = posX-350,epos=spos+150;
        if(ballX>=spos&&ballX<=epos)
            yDir=-1;
    }

    if(ballY>405){
        gameOver();
    }
}

function getCursorPos(event){
    posX=event.clientX;
    if(posX<325) posX=325;
    if(posX>975) posX=975;
    pad.style.left = posX-325 + 'px';
}