let posx = 0,posy = 0;
let up=0,left=0,right=0,down=0;
let pause = 1, score=0;

// initial food generation
const food = document.getElementById("food");

let foodx=100;
let foody=250;
let myInterval;
function startgame(){
    myInterval = setInterval(nextframe,100);
}

function nextframe(){

    // continuous movement

    if(up===1)
        posy-=25;
    if(down===1)
        posy+=25;
    if(left===1)
        posx-=25;
    if(right===1)
        posx+=25;


    // playground edges

    if(posx<0)
        posx=900;
    if(posy<0)
        posy=425;
    if(posx>900)
        posx=0;
    if(posy>425)
        posy=0;

    console.log(posx,foodx);
    
    // Ate food
    if( posx==foodx && posy==foody ){

        foodx = Math.floor(Math.random()*36)*25;
        foody = Math.floor(Math.random()*18)*25;
        food.style.top = foody + "px";
        food.style.left = foodx + "px";

        score++;
        console.log(score);
    }

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
        }
        else{
            pause=0;
            startgame();
        }
    }
}



window.addEventListener('keydown',function(event){
    changedir(event.key);
});