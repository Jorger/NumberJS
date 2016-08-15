"use strict";
import polygon from "./polygon";
let createButton = data =>
{
    data.ctx.beginPath();
    polygon.polygon(data.ctx,data.x,data.y,data.size,6,-Math.PI);
    data.ctx.fillStyle = data.color;
    data.ctx.lineWidth = data.size * 0.1;
    data.ctx.strokeStyle = "white";
    data.ctx.lineJoin = "round";
    data.ctx.fill();
    data.ctx.stroke();
    data.ctx.font = `bold ${data.size - 5}px sans-serif`;
    data.ctx.fillStyle = 'white';
    let centraNumeroX = data.size * (data.number.length === 1 ? 0.25 :
                                     data.number.length === 2 ? 0 : -0.18);
    data.ctx.fillText(data.number, (data.x - (data.size / 2) + (centraNumeroX)), (data.y + (data.size / 2) - (data.size * 0.17)));
};

//Cálculará la posción de los botones, en función del tamaño del botón...
let buttonsPositions = (buttonSize, fil = 4, col = 3) =>
{
    let positionButtons = [];
    for(let c = 0; c < fil; c++)
    {
        for(let i = 0; i < col; i++)
        {
            let position = {
                                x : Math.round((buttonSize + (buttonSize * 0.45) + ((buttonSize * 2) * i))),
                                y : Math.round(((buttonSize * 2) * c)  + (buttonSize + (buttonSize * 2)) + (i % 2 !== 0 ? ((buttonSize + (buttonSize * 0.1))) : 0))
            };
            positionButtons.push({
                                    x : position.x,
                                    y : position.y
                                });
        }
    }
    return positionButtons;
};

let feedback = (ctx, x, y, size, type = "ok") =>
{
    polygon.circle(
                    ctx,
                    x,
                    y,
                    size,
                    type === "ok" ? "#17b287" : "#f44336"
                );
    ctx.lineWidth = size * 0.2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = "white";
    ctx.lineJoin = "round";
    if(type === "ok")
    {
        ctx.beginPath();
        ctx.moveTo(x - (size - (size * 0.5)), y);
        ctx.lineTo(x - (size - (size * 0.8)), y + (size - (size * 0.5)));
        ctx.lineTo(x + (size - (size * 0.5)), y - (size - (size * 0.7)));
        ctx.stroke();
    }
    else
    {
        ctx.beginPath();
        ctx.moveTo(x + (size - (size * 0.6)), y + (size - (size * 0.6)));
        ctx.lineTo(x - (size - (size * 0.6)), y - (size - (size * 0.6)));
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x - (size - (size * 0.6)), y + (size - (size * 0.6)));
        ctx.lineTo(x + (size - (size * 0.6)), y - (size - (size * 0.6)));
        ctx.stroke();
    }
}
module.exports = {createButton, buttonsPositions, feedback};
