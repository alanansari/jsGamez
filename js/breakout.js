const body = document.querySelector('body');
const console = document.querySelector('.console');
const heading = document.getElementById('heading');
const pad = document.getElementById('pad');
const ball = document.getElementById('ball');
let posX=0,posY=0,ballX=375,ballY=375;
let xDir = 1,yDir = -1;
let myInterval;
let pause = 0,run=1;

body.addEventListener('mousemove',getCursorPos);

startgame();

function startgame(){
    myInterval = setInterval(game,15);
}

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
    checkCollision();
    ballX+=xDir*5;
    ballY+=yDir*5;
    ball.style.top = ballY + 'px';
    ball.style.left = ballX + 'px';
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
        let spos = posX-350,epos=spos+160;
        if(ballX>=spos&&ballX<=epos)
            yDir=-1;
    }

    if(ballY>405){
        gameOver();
    }

    // Check for Blocks

    if(checkBlock()){
        yDir = 1;
        destroyBlock();
    }

}

function checkBlock(){
    let i=Math.floor(ballX/100),j=Math.floor((ballY)/40);
    if(document.getElementById("block-"+j+"-"+i))
        return 1;
    else
        return 0;
}

function destroyBlock(){
    let i=Math.floor(ballX/100),j=Math.floor((ballY)/40);
    let ele = document.getElementById("block-"+j+"-"+i);
    if(ele!=null)
    ele.remove();
}

function getCursorPos(event){
    posX=event.clientX;
    if(posX<325) posX=325;
    if(posX>975) posX=975;
    pad.style.left = posX-325 + 'px';
}


function gameOver(){
    run=0;
    heading.innerHTML = "Game Over";
    clearInterval(myInterval);
    console.style.cursor = "auto";
    body.removeEventListener('mousemove',getCursorPos);
    const retry = document.getElementById('retry');
    retry.style.display = "block";
    retry.addEventListener("click",function(){
        location.reload();
    });
}

window.addEventListener('keydown',function(event){
    if(event.key===' '&&run===1){
        if(pause===0){
            pause = 1
            pausebtn.style.display = "block";
            clearInterval(myInterval);
            body.removeEventListener('mousemove',getCursorPos);
            
        }
        else if(pause===1){
            pause=0;
            pausebtn.style.display = "none";
            body.addEventListener('mousemove',getCursorPos);
            startgame();
        }
    }

});