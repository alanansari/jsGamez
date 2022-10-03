let posx = 0, posy =  0;
let prevx=0,prevy=0;
let currx=0,curry=0;
let up=0,left=0,right=1,down=0;
let pause = 0, score=0;
const pausebtn = document.getElementById("pausebtn");

// initial food generation
const food = document.getElementById("food");
let foodx=200;
let foody=200;
let myInterval;

startgame();

function startgame(){
    myInterval = setInterval(nextframe,120);
}

function incLength(length){
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id","tail-"+(length-1));
    newDiv.setAttribute("class","tail");
    const addNode = document.getElementById("console");
    addNode.appendChild(newDiv);
}

function updateTailPos(length){
    for(let i=0;i<length;i++){
        if(i==0){
            const x = document.getElementById("tail-"+0);
            x.style.top = posy + "px";
            x.style.left = posx + "px";
            prevx=posx;
            prevy=posy;
        }else{
            const curr = document.getElementById("tail-"+i);
            currx=parseInt(curr.style.left.slice(0,-2),10);
            curry=parseInt(curr.style.top.slice(0,-2),10);
            curr.style.left = prevx + "px";
            curr.style.top = prevy + "px";
            prevx=currx;
            prevy=curry;
        }
    }
}

function nextframe(){

    updateTailPos(score);

    //              continuous movement
    if(up===1)
        posy-=25;
    if(down===1)
        posy+=25;
    if(left===1)
        posx-=25;
    if(right===1)
        posx+=25;

    //             teleport from playground edges
    if(posx<0)
        posx=900;
    if(posy<0)
        posy=400;
    if(posx>900)
        posx=0;
    if(posy>400)
        posy=0;
    
    //                        Eating food
    if( posx==foodx && posy==foody ){

        foodx = Math.floor(Math.random()*35)*25;
        foody = Math.floor(Math.random()*17)*25;
        food.style.top = foody + "px";
        food.style.left = foodx + "px";

        score++;
        incLength(score);

        const outscore = document.getElementById("score");
        outscore.innerHTML = "Score: "+score;
    }

    // Position the head
    const head = document.getElementById("head");
    head.style.top = posy + "px";
    head.style.left = posx + "px";
}

function changedir(input){
    if(input==='w'||input==='ArrowUp'){
        up=1;down=0;left=0;right=0;
    }
    if(input==='s'||input==='ArrowDown'){
        up=0;down=1;left=0;right=0;
    }
    if(input==='a'||input==='ArrowLeft'){
        up=0;down=0;left=1;right=0;
    }
    if(input==='d'||input==='ArrowRight'){
        up=0;down=0;left=0;right=1;
    }
    if(input===' '){
        if(pause==0){
            clearInterval(myInterval);
            pause=1;
            pausebtn.style.visibility = "visible";
        }
        else{
            pause=0;
            pausebtn.style.visibility = "hidden";
            startgame();
        }
    }
}



window.addEventListener('keydown',function(event){
    changedir(event.key);
});