"use strict";
//http://www.gameplaypassion.com/blog/explosion-effect-html5-canvas/
//Para realizar una explosión de los elementos...
let particles   = [],
    frameRate   = 30.0,
    frameDelay  = 1000.0 / frameRate,
    explosion   = false;
//Clase Particula...
class Particle
{
    constructor()
    {
        this.scale = 1.0;
        this.x = 0;
        this.y = 0;
        this.radius = 20;
        this.color = "#000";
        this.velocityX = 0;
        this.velocityY = 0;
        this.scaleSpeed = 0.5;
    }
    update(ms)
    {
        this.scale -= this.scaleSpeed * ms / 1000.0;
        if (this.scale <= 0)
        {
            this.scale = 0;
        }
        this.x += this.velocityX * ms/1000.0;
        this.y += this.velocityY * ms/1000.0;
    }
    draw(context2D)
    {
        context2D.save();
        context2D.translate(this.x, this.y);
        context2D.scale(this.scale, this.scale);
        context2D.beginPath();
        context2D.arc(0, 0, this.radius, 0, Math.PI*2, true);
        context2D.closePath();
        context2D.fillStyle = this.color;
        context2D.fill();
        context2D.restore();
    }
}

//Obtener un valor aleatorio
let randomFloat = (min, max) => min + Math.random()*(max-min);

//Crear la explosión...
let createExplosion = (x, y, color, maxSize) =>
{
    let minSize         = 10,
        count           = 5,
        minSpeed        = 100.0,
        maxSpeed        = 300.0,
        minScaleSpeed   = 1.0,
        maxScaleSpeed   = 4.0;
    for(let angle = 0; angle < 360; angle += Math.round(360/count))
    {
        let particle   = new Particle(),
            speed      = randomFloat(minSpeed, maxSpeed);
        particle.x = x;
        particle.y = y;
        particle.radius = randomFloat(minSize, maxSize);
        particle.color = color;
        particle.scaleSpeed = randomFloat(minScaleSpeed, maxScaleSpeed);
        particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
        particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);
        particles.push(particle);
    }
};

let updateExplosion = (ctx) =>
{
    let countParticle   = 0;
    for (let i = 0; i < particles.length; i++)
    {
        let particle = particles[i];
        particle.update(frameDelay);
        particle.draw(ctx);
        if(particle.scale <= 0)
        {
            countParticle++;
        }
    }
    if(countParticle === particles.length)
    {
        explosion = false;
        particles = []; //Se reinicia la variable de particulas...
    }
    return explosion;
};

let launchExplosion = (x, y, size, color) =>
{
    explosion = true;
    createExplosion(x, y, "white", size);
    createExplosion(x, y, color, size);
};

module.exports = {launchExplosion, updateExplosion};
