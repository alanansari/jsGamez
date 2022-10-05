const console = document.querySelector('.console');
const heading = document.getElementById('heading');
const pad = document.getElementById('pad');
const ball = document.getElementById('ball');
let posX=0,posY=0,ballX=375,ballY=375;
let xDir = 1,yDir = -1;

let myInterval = setInterval(game,5);

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
}

function ballGen(){
    ballX+=xDir;
    ballY+=yDir;
    checkCollision();
    ball.style.top = ballY + 'px';
    ball.style.left = ballX + 'px';
}

function checkCollision(){
    if(ballX<=0)
        xDir=1;
    if(ballX>=775)
        xDir=-1;
    if(ballY<=0)
        yDir=1;
    if(ballY>=425)
        yDir=-1;
}

function getCursorPos(event){
    posX=event.clientX;
    if(posX<325) posX=325;
    if(posX>975) posX=975;
    pad.style.left = posX-325 + 'px';
}