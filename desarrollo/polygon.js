"use strict";
//Para la creación de Polígono...
//http://www.storminthecastle.com/2013/07/24/how-you-can-draw-regular-polygons-with-the-html5-canvas-api/
//Se cambia a sintaxis ES6
let polygon = (context, x, y, radius, sides, startAngle, anticlockwise) =>
{
    if (sides < 3) return;
    let a = (Math.PI * 2)/sides;
    a = anticlockwise?-a:a;
    context.save();
    context.translate(x,y);
    context.rotate(startAngle);
    context.moveTo(radius,0);
    for (let i = 1; i < sides; i++)
    {
        context.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
    }
    context.closePath();
    context.restore();
};

let circle = (ctx, x, y, radio, color = "red", alpha = 1) =>
{
    ctx.beginPath();
    ctx.lineWidth = radio * 0.2;
    ctx.arc(x, y, radio, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.strokeStyle = "white";
    ctx.globalAlpha = alpha;
    ctx.fill();
    ctx.stroke();
};

module.exports = {polygon, circle};
