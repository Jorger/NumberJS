"use strict";
import utils from "./utils";
import {introGame} from "./intro";
import howler from "./howler.min"; //Para el manejo del sonido...
import randomColor from "./randomColor.min";
import {createButton, buttonsPositions, feedback} from "./buttons";
import explosion from "./Explosion";

let dimensiones 	    = 	{ancho : 320, alto : 480},
    ratio 			    = 	dimensiones.ancho / dimensiones.alto,
    currentHeight 	    = 	window.innerHeight,
    currentWidth 	    = 	(currentHeight * ratio) - 50,
    ctx                 =   canvas.getContext("2d"),
    buttonSize          =   currentWidth * 0.14,
    positionButtons     =   buttonsPositions(buttonSize),
    buttons             =   [], //Guardará los botones que se muestran en el escenario...
    chronometer         =   {counter : 0, time : 0, finish : false},
    scoreGame           =   0,
    bestScore           =   Number(localStorage.getItem("numbers")) || 0, //Guarda el valor máximo obtenido...
    correctSelection    =   false,
    counterTime         =   60,
    gameStarted         =   false,
    counterOk           =   0,
    totalCounter        =   2, //La cantidad de elementos que se muestra en el escenario...
    negativeNumbers     =   0, //si tendrá números aleatorios...
    animation           = {
                                time     : 0,
                                sizeInit : 0,
                                count    : 0,
                                type     : "",
                                animate  : false
                         },
    mueveLeft          =    Math.floor((window.innerWidth - currentWidth) / 2);

    canvas.style.width = currentWidth + "px";
    canvas.style.height = currentHeight + "px";
    canvas.width = currentWidth;
    canvas.height = currentHeight;
const header        = utils.accesoDOM(1, "header"),
      divScore      = utils.accesoDOM(1, "divScore"),
      progress      = utils.accesoDOM(1, "progress"),
      ribbon        = utils.accesoDOM(1, "ribbon"),
      successButton = new Howl({urls: ['sounds/pop.mp3']}),
      successSound  = new Howl({urls: ['sounds/success.mp3']}),
      errorSound    = new Howl({urls: ['sounds/error.mp3']});

header.style.left = `${mueveLeft < 0 ? 0 : mueveLeft}px`;
header.style.width = `${currentWidth}px`;
header.style.height = `${currentHeight * 0.09}px`;

//Para Iniciar el juego...
let startInitGame = () =>
{
    header.style.display = "none";
    ribbon.style.display = "block";
    introGame(
                ctx,
                buttonSize,
                currentWidth,
                currentHeight,
                scoreGame, bestScore
            );
    gameStarted = false;
};
startInitGame();

//para generar los números aleatorios...
let generateRandomNumbers = () =>
{
    let number          = 0,
        exists          = false;
    do
    {
        exists = false;
        number = (Math.floor(Math.random() * 99) + 1);
        if(negativeNumbers === 1)
        {
            number *= (Math.floor(Math.random() * 2) === 0 ? 1 : -1);
        }
        for(let i = 0; i < buttons.length; i++)
        {
            if(buttons[i].number === number)
            {
                exists = true;
                break;
            }
        }
        if(!exists)
        {
            break;
        }
    }while(1);
    return number;
};

//Obtiene la posición de los elementos en el escenario...
let buttonsScenario = (total) =>
{
    buttons = [];
    for(let i = 0; i < total; i++)
    {
        do
        {
            let exists = false,
                index  = Math.floor(Math.random() * positionButtons.length);
            if(i !== 0)
            {
                for(let c = 0; c < buttons.length; c++)
                {
                    if(buttons[c].index === index)
                    {
                        exists = true;
                        break;
                    }
                }
            }
            if(!exists)
            {
                buttons.push({
                                index  : index,
                                color  : randomColor({luminosity: 'dark', hue: 'dark'}),
                                number : generateRandomNumbers()
                });
                break;
            }
        }while(1);
    }
    //Ordenar los botones de menor a mayor...
    buttons.sort((a, b) => (a.number > b.number ? 1 : a.number < b.number ? -1 : 0));
};

//Para dibujar los botones...
let drawButtons = (size, alpha = 1) =>
{
    for(let i = 0; i < buttons.length; i++)
    {
        let rgba = utils.hexToRgb(buttons[i].color);
        createButton({
                            ctx    : ctx,
                            x      : positionButtons[buttons[i].index].x,
                            y      : positionButtons[buttons[i].index].y,
                            size   : size,
                            color  : `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${alpha})`,
                            number : String(buttons[i].number)
                    });
    }
};

//Destruir todos los elementos...
let destroyAll = () =>
{
    //Se debe explotar los que quedaron...
    for(let i = 0; i < buttons.length; i++)
    {
        explosion.launchExplosion(
                                    positionButtons[buttons[i].index].x,
                                    positionButtons[buttons[i].index].y,
                                    buttonSize,
                                    buttons[i].color
                                );
    }
    buttons = [];
    if(!animation.animate)
    {
        animation.animate = true;
        animation.type = "explosion";
        animate();
    }
};

//Para saber si existe un botón...
let pressButton = (x, y) =>
{
    let numberButton = -1;
    if(!chronometer.finish)
    {
        for(let i = 0; i < buttons.length; i++)
        {
            let coordinateRange = {
                                    x : {
                                            start : positionButtons[buttons[i].index].x - (buttonSize - (buttonSize * 0.2)),
                                            end   : positionButtons[buttons[i].index].x + (buttonSize - (buttonSize * 0.2)),
                                        },
                                    y :
                                        {
                                            start : positionButtons[buttons[i].index].y - (buttonSize - (buttonSize * 0.2)),
                                            end   : positionButtons[buttons[i].index].y + (buttonSize - (buttonSize * 0.2)),
                                        }
            };
            let positionMouse = {
                                    x : x > coordinateRange.x.start && x < coordinateRange.x.end,
                                    y : y > coordinateRange.y.start && y < coordinateRange.y.end
            };
            if(positionMouse.x && positionMouse.y)
            {
                numberButton = i;
                break;
            }
        }
        if(numberButton >= 0)
        {
            if(buttons[0].number === buttons[numberButton].number)
            {
                successButton.play();
                correctSelection = true;
                scoreGame += 10;
                divScore.innerHTML = `${scoreGame}`;
                if(scoreGame > bestScore)
                {
                    bestScore = scoreGame;
                    localStorage.setItem("numbers", bestScore);
                }
                explosion.launchExplosion(
                                            positionButtons[buttons[numberButton].index].x,
                                            positionButtons[buttons[numberButton].index].y,
                                            buttonSize,
                                            buttons[numberButton].color
                                        );
                buttons.splice(numberButton, 1);
                if(buttons.length === 0)
                {
                    successSound.play();
                }
                //Llamar la acción de explosión...
                if(!animation.animate)
                {
                    animation.animate = true;
                    animation.type = "explosion";
                    animate();
                }
            }
            else
            {
                if ("vibrate" in navigator)
                {
                    navigator.vibrate(200);
                }
                errorSound.play();
                correctSelection = false;
                destroyAll();
            }
        }
    }
};

//Animación...
let animate = () =>
{
    ctx.clearRect(0, 0, currentWidth, currentHeight);
    animation.time = requestAnimationFrame(animate);
    if(animation.type === "start")
    {
        if(animateButtons())
        {
            drawButtons(buttonSize);
            animation.animate = false;
            cancelRequestAnimFrame(animation.time);
        }
    }
    else
    {
        if(animation.type === "explosion")
        {
            if(!correctSelection || buttons.length === 0)
            {
                feedback(
                            ctx,
                            currentWidth / 2,
                            currentHeight / 2,
                            buttonSize,
                            correctSelection ? "ok" : "error"
                        );
            }
            drawButtons(buttonSize);
            if(!explosion.updateExplosion(ctx))
            {
                animation.animate = false;
                cancelRequestAnimFrame(animation.time);
                if(!correctSelection || buttons.length === 0)
                {
                    if(!chronometer.finish)
                    {
                        if(correctSelection)
                        {
                            chronometer.counter = counterTime;
                            counterOk++;
                        }
                        newFigures();
                    }
                    else
                    {
                        startInitGame();
                    }
                }
            }
        }
    }
};

//Para animar los botones, al inicio y al final...
let animateButtons = (action) =>
{
    let sizeAnima = animation.sizeInit < buttonSize ? animation.sizeInit : buttonSize;
    drawButtons(sizeAnima, sizeAnima / buttonSize);
    animation.sizeInit += 6;
    return animation.sizeInit >= buttonSize;
};

//Mostrar nuevas figuras...
let newFigures = () =>
{
    if(counterOk >= 2)
    {
        if(counterOk % 3 === 0 && correctSelection)
        {
            totalCounter++;
        }
    }
    ctx.clearRect(0, 0, currentWidth, currentHeight);
    correctSelection = false;
    negativeNumbers = Math.floor(Math.random() * 2);
    buttonsScenario(totalCounter > 12 ? 12 : totalCounter);
    animation.sizeInit = buttonSize * 0.2;
    animation.animate = true;
    animation.type = "start";
    animate();
};

let startGame = () =>
{
    counterOk = scoreGame = 0;
    totalCounter = 2;
    newFigures();
    ribbon.style.display = "none";
    header.style.display = "block";
    chronometer.counter = counterTime;
    chronometer.finish = false;
    divScore.innerHTML = `${scoreGame}`;
    progress.style.width = "100%";
    progress.style.left = "0px";
    progress.style.display = "block";
    chronometer.time = setInterval(() =>
    {
        chronometer.counter -= 1;
        let percentaje = Math.round((chronometer.counter / counterTime) * 100);
        progress.style.width = `${percentaje}%`;
        progress.style.left = `${Math.round((100 - percentaje) / 2)}%`;
        progress.style.right = `${Math.round((100 - percentaje) / 2)}%`;
        if(chronometer.counter === 0)
        {
            progress.style.display = "none";
            clearInterval(chronometer.time);
            chronometer.finish = true;
            if(buttons.length !== 0)
            {
                destroyAll();
            }
            else
            {
                startInitGame();
            }
        }
    }, 300);
};

//Botón de inicio...
let pressButtonStart = (x, y) =>
{
    let coordinateRange = {
                            x : {
                                    start : Math.round(currentWidth * 0.3),
                                    end   : Math.round(currentWidth * 0.3) + Math.round(buttonSize * 3.3),
                                },
                            y :
                                {
                                    start : Math.round(currentHeight * 0.77),
                                    end   : Math.round(currentHeight * 0.77) + Math.round(buttonSize * 1.35)
                                }
    };
    let positionMouse = {
                            x : x > coordinateRange.x.start && x < coordinateRange.x.end,
                            y : y > coordinateRange.y.start && y < coordinateRange.y.end
    };
    if(positionMouse.x && positionMouse.y)
    {
        gameStarted = true;
        startGame();
    }
};

let eventoCanvas = (e) =>
{
    e.stopPropagation();
    e.preventDefault();
    let evento = e;
    if(e.type === "touchstart")
    {
        evento = e.touches[0] || e.changedTouches[0];
    }
    const x = Math.floor(evento.pageX) - canvas.offsetLeft;
    const y = Math.floor(evento.pageY) - canvas.offsetTop;
    if(e.type === "mousedown" || e.type === "touchstart")
    {
        if(gameStarted)
        {
            pressButton(x, y);
        }
        else
        {
            pressButtonStart(x, y);
        }
    }
};

//Para los eventos...
let addListenerMulti = (el, fn, ...evts) =>
{
    for(let i = 0; i < evts.length; i++)
    {
        el.addEventListener(evts[i], fn, false);
    }
};
addListenerMulti(canvas, eventoCanvas, 'mousedown', 'mousemove', 'touchmove', 'touchstart');
//Créditos...
console.log('%c Desarrollado por Jorge Rubiano - @ostjh', 'background: blue; color: white; font-size: x-large');
console.log('%c https://twitter.com/ostjh', 'background: green; color: white; font-size: x-large');
console.log('%c http://jorger.github.io/page/es/', 'background: orange; color: white; font-size: x-large');
