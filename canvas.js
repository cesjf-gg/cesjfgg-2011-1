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

setInterval(passo, 1000/30);

function passo(){

y = y - 180*1000/30/1000 ;



ctx.fillStyle = "rgb(255, 255, 255)";
ctx.fillRect(0,0, 300, 400);

ctx.rect(110+x,200+y, 40, 50);
ctx.fillStyle = "rgb(150, 150, 250)";
ctx.fill();
ctx.lineWidth = 3;
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
