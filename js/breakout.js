const body = document.querySelector('body');
const console = document.querySelector('.console');
const heading = document.getElementById('heading');
const pad = document.getElementById('pad');
const ball = document.getElementById('ball');
const playbtn = document.getElementById('playbtn');
const pausebtn = document.getElementById('pausebtn');
const retry = document.getElementById('retry');
let posX=0,posY=0,ballX=375,ballY=375;
let xDir = 1,yDir = -1;
let myInterval;
let pause = 1,run = 1;
let counter = 0;

playbtn.addEventListener('click',function(){
    playbtn.style.display = 'none';
    pause = 0;
    startgame();
})


function startgame(){
    body.addEventListener('mousemove',getCursorPos);
    body.style.cursor = 'none';
    myInterval = setInterval(game,10);
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
        xDir = 1;
    if(ballX>=775)
        xDir = -1;
    if(ballY<=0)
        yDir=1;
    if(ballY >= 425)
        yDir = -1;

    // Pad Collision
    if(ballY>375 && ballY<400){
        let spos = posX-350,epos=spos+160;
        if(ballX>=spos && ballX<=epos)
            yDir = -1;
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
    if(ele!=null){
        ele.remove();
        counter++;
        if(counter===32){
            winGame();
        }
    }
}

function getCursorPos(event){
    posX=event.clientX;
    if(posX<325) posX=325;
    if(posX>975) posX=975;
    pad.style.left = posX-325 + 'px';
}


function winGame(){
    heading.innerHTML = "YOU WON!!";
    clearInterval(myInterval);
    body.removeEventListener('mousemove',getCursorPos);
    retry.style.display = "block";
    body.style.cursor = "auto";
    run = 0;
    retry.addEventListener("click",function(){
        location.reload();
    });
}

function gameOver(){
    run=0;
    heading.innerHTML = "Game Over";
    clearInterval(myInterval);
    body.removeEventListener('mousemove',getCursorPos);
    body.style.cursor = "auto";
    retry.style.display = "block";
    retry.addEventListener("click",function(){
        location.reload();
    });
}

window.addEventListener('keydown',function(event){
    if(event.key===' '&&run===1){
        body.style.cursor = 'none';
        if(pause===0){
            pause = 1
            pausebtn.style.display = "block";
            clearInterval(myInterval);
            body.removeEventListener('mousemove',getCursorPos);
            body.style.cursor = "auto";
        }
        else if(pause===1){
            pause=0;
            playbtn.style.display = "none";
            pausebtn.style.display = "none";
            body.style.cursor = "none";
            startgame();
        }
    }else if(event.key===' '&&run===0){
        location.reload();
    }
});