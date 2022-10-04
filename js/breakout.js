const console = document.querySelector('.console');
const heading = document.getElementById('heading');
const pad = document.getElementById('pad');
let posX=0,posY=0;

let myInterval = setInterval(game,5);

for(let i=0;i<=5;i++){
    for(let j=0;j<16;j++){
        const newBlock = document.createElement("div");
        newBlock.setAttribute("class","block");
        newBlock.setAttribute("id","block-"+i+'-'+j);
        const addBlock = document.querySelector('.console');
        newBlock.style.left = j*50 + 'px';
        newBlock.style.top = i*20 + 'px';
        addBlock.appendChild(newBlock);
    }
}

function game(){
    blockGen();
}

function blockGen(){
    
}

function getCursorPos(event){
    posX=event.clientX;
    if(posX<325) posX=325;
    if(posX>975) posX=975;
    pad.style.left = posX-325 + 'px';
}