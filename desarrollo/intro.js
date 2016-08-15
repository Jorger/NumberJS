"use strict";
//Para mostrar la primera pantalla...
import {createButton} from "./buttons";
let introGame = (ctx, size, w, h, score, best) =>
{
    ctx.clearRect(0, 0, w, h);
    let lengthTxt = String(score).length;
    ctx.font = `bold ${size}px Arial`;
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = "white";
    ctx.fillText("NumberJS", w * 0.18, h * 0.1);

    ctx.font = `oblique bold ${size * 0.45}px Arial`;
    ctx.fillText("By @ostjh", w * 0.38, h * 0.16);

    createButton({
                        ctx    : ctx,
                        x      : (w * 0.53),
                        y      : h * 0.3,
                        size   : size,
                        color  : "#f44336",
                        number : "#"
                });

    ctx.font = `${size * 0.7}px Arial`;
    ctx.fillText("SCORE", w * 0.36, h * 0.46);
    ctx.font = `bold ${size * 2}px Arial`;
    ctx.fillText(score, (w * (0.45 - (lengthTxt - 1) * 0.08)), h * 0.63);
    ctx.font = `bold ${size * 0.5}px Arial`;
    ctx.fillText(`BEST : ${best}`, w * 0.35, h * 0.7);
    ctx.beginPath();
    ctx.rect(w * 0.30, h * 0.77, (size * 3.3), size * 1.35);
    ctx.fillStyle = '#b2014b';
    ctx.fill();
    ctx.lineWidth = size * 0.1;;
    ctx.strokeStyle = 'white';
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.font = `bold ${size * 0.77}px Arial`;
    ctx.fillText("START", w * 0.37, h * 0.85);
};

module.exports = {introGame};
