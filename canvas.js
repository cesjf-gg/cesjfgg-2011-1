/*-
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

var pontos = 0;
var vidas = 5;
var combustivel = 100;

var x = 0;
var y = 0;
var gravidadeY = 30;
var acelerando=false;
document.addEventListener("keydown",botaoPressionado,false);
document.addEventListener("keyup",botaoSolto,false);
var r = 0;
var frame=0;
var framel=0;

const fps = 42;
const segundo = 1000;
var intervalo = segundo/fps;
var vy = 0 ;
setInterval(passo,intervalo);

var imagemNave = new Image();
imagemNave.src = "player_ship.png";
var imagemInimigo = new Image();
imagemInimigo.src = "enemy_4.png";
var imagemAstro = new Image();
imagemAstro.src = "astro.png";
var gameOver = new Image();
gameOver.src = "gameover.png";
var imagemBoom = new Image();
imagemBoom.src = "exp2_0.png";
var imagemVidas = new Image();
imagemVidas.src = "vidas.png";
var imagemPontos = new Image();
imagemPontos.src = "pontos.png";
var imagemFundo = new Image();
imagemFundo.src = "fundo.jpg";

var pcfoguete = new Sprite(150, 375, 55, 55);
var astro0 = new Sprite(-40,120,55,55);
var astro1 = new Sprite(340,50,55,55);
var astro2 = new Sprite(-100,220,55,55);
var inimigo1 = new Sprite(-100,280,50,50);
var inimigo2 = new Sprite(180,85,50,50);
var inimigo3 = new Sprite(180,245,50,50);
var boom = new Sprite(-150,-150,64,64);

function Sprite(x,y,h,w){
   this.x = x;
   this.y = y;
   this.h = h;
   this.w = w;
}

function desenhaFoguete(){

   ctx.save();
   ctx.drawImage(imagemNave,x+90,y+190);
   ctx.restore();
}

//limpar a tela
function limpar(){
   ctx.fillStyle = "rgb(255, 255, 255)";
   ctx.fillRect(0,0, 300, 400);
}


function passo(){
   limpar();
   ctx.drawImage(imagemFundo,0,0);
   if(acelerando && combustivel > 0){
      vy-=100*(intervalo/1000);
      combustivel -= 10*(intervalo/1000);
   }
   vy+=gravidadeY*(intervalo/1000);
   //y+=vy*(intervalo/1000); 
   pcfoguete.y+=vy*(intervalo/1000);
   y = pcfoguete.y-200-50/2;
   x = pcfoguete.x-110-40/2;

   if(pcfoguete.y>(380-pcfoguete.h/2)){
      pcfoguete.y=(380-pcfoguete.h/2);
      vy=0;   
   }
   if (pcfoguete.y<(0)){
      pcfoguete.y=0;
      vy=0;
   }
   desenhaFoguete();
   //desenhaLimiteSprites(pcfoguete);
   desenhaAstronauta(astro0.x++, astro0.y++, 45+r++);  
   //desenhaLimiteSprites(astro0);
   desenhaAstronauta(astro1.x--, astro1.y++, r++);  
   //desenhaLimiteSprites(astro1);
   desenhaAstronauta(astro2.x++, astro2.y--, 120+r++);  
  //desenhaLimiteSprites(astro2);
   desenhaInimigo((inimigo1.x+=2), inimigo1.y--, 50+r++);  
   desenhaInimigo(inimigo3.x++, inimigo3.y, r--);  
   //desenhaLimiteSprites(inimigo1);
   desenhaInimigo(inimigo2.x--, inimigo2.y, r++);  
   //desenhaLimiteSprites(inimigo2);
   desenhaBoom(boom.x, boom.y, 0);
   desenhaCombustivel();  
   if(++frame>3) {
      frame = 0;
      framel++;
   }
   if(framel>3) {
      framel = 0;
      boom.x = -1000;
      boom.y = -1000;
   }
   if(colisao(astro0, pcfoguete)){
      astro0.x=1000;
      pontos++;
      combustivel = (combustivel+10>100)?100:combustivel+10;
   }
   if(colisao(astro1, pcfoguete)){
      astro1.x=-1000;
      pontos++;
      combustivel = (combustivel+10>100)?100:combustivel+10;
   }
   if(colisao(astro2, pcfoguete)){
      astro2.x=1000;
      pontos++;
      combustivel = (combustivel+10>100)?100:combustivel+10;
   }
   if(
      colisao(inimigo2, pcfoguete) ||
      colisao(inimigo3, pcfoguete) ||
      combustivel <= 0
   ){
      boom.x = pcfoguete.x;
      boom.y = pcfoguete.y;
      frame = 0;
      framel = 0;
      pcfoguete.y=(380-pcfoguete.h/2);
      acelerando = false;
      vy = 0;
      vidas--;
      combustivel = 100;
   }
   if(
      colisao(inimigo1, pcfoguete)
   ){
      boom.x = pcfoguete.x;
      boom.y = pcfoguete.y;
      frame = 0;
      framel = 0;
      inimigo1.y=(150-inimigo1.h/2);
      inimigo1.x=0;
      pcfoguete.y=(380-pcfoguete.h/2);
      acelerando = false;
      vy = 0;
      vidas--;
      combustivel = 100;
   }
   if(astro0.x>340){
      astro0.x= -40;
   }
   if(astro1.x<-40){
      astro1.x= 340;
   }
   if(astro2.x>340){
      astro2.x= -40;
   }
   if(inimigo1.x>340){
      inimigo1.x= -40;
   }
   if(inimigo2.x<-40){
      inimigo2.x= 340;
   }
   if(inimigo3.x>340){
      inimigo3.x= -60;
   }
   if(astro0.y>400){
		astro0.y-=400;
   }
   if(astro1.y>400){
		astro1.y-=400;
    }
    if(astro2.y<50){
		astro2.y+=600;
    }
    if(inimigo1.y<50){
		inimigo1.y+=600;
     }

   desenhaPlacar();
   if(vidas<=0){
	   limpar();
	   astro0.x=0;
	   astro0.y=0;
	   astro1.x=0;
	   astro1.y=0;
	   astro2.x=0;
	   astro2.y=0;
	   ctx.drawImage(imagemFundo,0,0);
	   ctx.drawImage(gameOver,25,100);
	   ctx.fillText("Pontuação: "+pontos, 70, 200);
	   ctx.strokeText("Pontuação: "+pontos, 70, 200);
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

function desenhaCombustivel(){
   ctx.strokeStyle = "rgb(0, 0, 0)";
   ctx.beginPath();
   ctx.rect(10, 380, 280*(combustivel/100), 10);
   ctx.closePath();   
   ctx.fillStyle = "hsl("+80*(combustivel/100)+",100%, 50%)";
   ctx.fill();
   ctx.lineWidth = 2;
   ctx.stroke();   

}

function desenhaBoom(x, y, a){
   ctx.save();
   ctx.translate(x, y);
   //ctx.rotate(a*2*Math.PI/360);
   ctx.drawImage(imagemBoom,frame*64,framel*64,64, 64,-32,-32, 64, 64);
   ctx.restore();
}

function desenhaInimigo(x, y, a){
   ctx.save();
   ctx.translate(x, y);
   ctx.rotate(a*Math.PI/360);
   ctx.drawImage(imagemInimigo,-27,-26);
   ctx.restore();
}
function desenhaAstronauta(x, y, a){
   ctx.save();
   ctx.translate(x, y);
   ctx.rotate(a*Math.PI/360);
   ctx.drawImage(imagemAstro,-30,-30);
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


function desenhaLimiteSprites(sprite){
   ctx.beginPath();
   ctx.rect(sprite.x-sprite.w/2,sprite.y-sprite.h/2, sprite.w, sprite.h);
   ctx.closePath();   
   ctx.strokeStyle = "rgb(255, 0, 0)";
   ctx.lineWidth = 2;
   ctx.stroke();

}

function desenhaPlacar(){
   ctx.strokeStyle = "rgb(255, 255, 255)";
   ctx.fillStyle = "rgb(255, 255, 255)";
   ctx.lineWidth = 3;
   ctx.font = '25px bold "Arial Black", sans-serif';
   ctx.drawImage(imagemPontos,0,0);
   ctx.fillText(pontos, 130, 37);
   ctx.strokeText(pontos, 130, 37);
   ctx.drawImage(imagemVidas,160,0);
   ctx.fillText(vidas, 270, 37);
   ctx.strokeText(vidas, 270, 37);
}

tela.addEventListener("touchstart",toquePressionado,false);
tela.addEventListener("touchend",toqueSolto,false);
tela.addEventListener("mousedown",toquePressionado,false);
tela.addEventListener("mouseup",toqueSolto,false);

function toquePressionado(evento){
      evento.preventDefault();
      console.dir(evento);
      acelerando=true;     
}

function toqueSolto(evento){
      evento.preventDefault();
      console.dir(evento);
      acelerando=false;     
}
