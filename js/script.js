let posx = 0,posy = 0;

function change(input){
    if(input==='w')
        posy-=25;
    if(input==='s')
        posy+=25;
    if(input==='a')
        posx-=25;
    if(input==='d')
        posx+=25;
    // console edges
    if(posx<=0)
        posx=0;
    if(posy<=0)
        posy=0;
    if(posx>=900)
        posx=900;
    if(posy>=425)
        posy=425;
    const head = document.getElementById("head");
    head.style.top = posy + "px";
    console.log(posy+"px");
    head.style.left = posx + "px";
    console.log(posx+"px");
}



window.addEventListener('keydown',function(event){
    change(event.key);
});