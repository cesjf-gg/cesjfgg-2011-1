/*
This file are part of CESJFGG-2011-1.

CESJFGG-2011-1 is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

CESJFGG-2011-1 is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with CESJFGG-2011-1.  If not, see <http://www.gnu.org/licenses/>.
*/

var tela = document.getElementById("tela");
var ctx = tela.getContext("2d");

var x = 0;
var y = 0;
var ax = 0;
var ay = 0;
var acelerando=false;
document.addEventListener("keydown",botaoPressionado,false);
document.addEventListener("keyup",botaoSolto,false);
var r = 0;

const fps = 30;
const segundo = 1000;
var intervalo = segundo/fps;
var vy = 0 ;
var ay = 30;
setInterval(passo,intervalo);

var astro1 = new Sprite(250,50,40,40);
var astro2 = new Sprite(250,150,40,40);

function Sprite(x,y,h,w){
   this.x = x;
   this.y = y;
   this.h = h;
   this.w = w;
}

function foguete(){

   //Casco
   ctx.beginPath();
   ctx.rect(110+x,200+y, 40, 50);
   ctx.closePath();   
   ctx.fillStyle = "rgb(150, 150, 250)";
   ctx.fill();
   ctx.lineWidth = 2;
   ctx.stroke();


   ctx.beginPath();
   ctx.moveTo(110+x,250+y);
   ctx.lineTo(90+x,250+y);
   ctx.lineTo(110+x,235+y);
   ctx.closePath();
   ctx.fillStyle = "rgb(250, 150, 150)";
   ctx.fill();
   ctx.stroke();


   ctx.beginPath();
   ctx.moveTo(150+x,250+y);
   ctx.lineTo(170+x,250+y);
   ctx.lineTo(150+x,235+y);
   ctx.closePath();
   ctx.fill();
   ctx.stroke();


   ctx.beginPath();
   ctx.moveTo(110+x,200+y);
   ctx.lineTo(130+x,180+y);
   ctx.lineTo(150+x,200+y);
   ctx.closePath();
   ctx.fillStyle = "rgb(150, 250, 150)";
   ctx.fill();
   ctx.stroke();


   ctx.beginPath();
   ctx.arc(130+x,225+y, 10, 0, 2*Math.PI, false);
   ctx.closePath();
   ctx.fillStyle = "rgb(100, 100, 150)";
   ctx.fill();
   ctx.stroke();
}

//lipar a tela
function limpar(){
   ctx.fillStyle = "rgb(255, 255, 255)";
   ctx.fillRect(0,0, 300, 400);
}

function passo(){
   limpar();
   if(acelerando){
    vy-=100*(intervalo/1000);  
   }
   vy+=ay*(intervalo/1000);
   y+=vy*(intervalo/1000); 
   if(y>150){
      y=150;
      vy=0;   
   }
   if (y<(0-180)){
   y=-180;
   vy=0;
   }
   foguete();
   astronauta(10, 20, 0);  
   astronauta(50, 120, 45);  
   
   astronauta(ax++, 120, r++);  
   if(ax>340){
      ax= -40;
      ay= 0;
   }

   astronauta(astro1.x, astro1.y, 0);
   astronauta(astro2.x, astro2.y, 0);
   astro1.y++;
   console.log(colisao(astro1,astro2));
   if(colisao(astro1,astro2)){
      astro1.y =-10;
   }
}

function botaoPressionado(evento){
   if(evento.keyCode==38){
      console.log(evento.keyCode);
      acelerando=true;     
   }
}

function botaoSolto(evento){
   if(evento.keyCode==38){
      console.log(evento.keyCode);
      acelerando=false;     
   }
}

function astronauta(x, y, a){
   ctx.save();
   ctx.translate(x, y);
   ctx.rotate(a*2*Math.PI/360);
   ctx.beginPath();
   ctx.arc(0, -10, 10, 0, 2*Math.PI, false);
   ctx.closePath();
   ctx.fillStyle = "yellow";
   ctx.fill();
   ctx.stroke();

   ctx.moveTo(-20,0);
   ctx.lineTo(20,0);
   ctx.stroke();
   ctx.moveTo(0,0);
   ctx.lineTo(20,20);
   ctx.stroke();
   ctx.moveTo(0,0);
   ctx.lineTo(-20,20);
   ctx.stroke();
   
   ctx.restore();
}

function colisao(o1, o2){
   if((o1.y-o1.h/2)>(o2.y+o2.h/2)){
      return false;
   }
   if((o1.y+o1.h/2)<(o2.y-o2.h/2)){
      return false;
   }

   if((o1.x+o1.w/2)<(o2.x-o2.w/2)){
      return false;
   }
   if((o1.x-o1.w/2)>(o2.x+o2.w/2)){
      return false;
   }

   return true;
}
