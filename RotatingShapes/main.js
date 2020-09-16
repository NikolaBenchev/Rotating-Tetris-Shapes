"use strict"
let canvas = document.getElementById('canvas'),
ctx = canvas.getContext('2d'),
degrees = 0,
width = 50;

canvas.width = 800;
canvas.height = 800;

let mouse = {
    x: undefined,
    y: undefined
}

document.addEventListener("mousemove", (ev) =>
{
    var rect = canvas.getBoundingClientRect();
    mouse.x = ev.x - rect.left;
    mouse.y = ev.y - rect.top;
    // degrees = Math.atan2(mouse.y - canvas.height / 2, mouse.x - canvas.width / 2) * (180 / Math.PI);
});

document.addEventListener("keypress", (ev) =>
{
   switch(ev.key)
   {
        case 'a':
            for(let i = 0; i < currentShape.cubes.length; i++)
            {    
                currentShape.cubes[i].x -= 50;
            }
            break;
        case 'd':
            for(let i = 0; i < currentShape.cubes.length; i++)
            {    
                currentShape.cubes[i].x += 50;
            }
            break;
        case 'w':
            degrees += 90;
           break;
        default:
            break;
   } 
});

class Shape{
    constructor()
    {
        this.cubes = [];
        this.cubes.push({x: 0, y: 0});
        this.cubes.push({x: 0, y: 50});
        this.cubes.push({x: -50, y: 50});
        this.cubes.push({x: -50, y: 100});
        this.findCenter();
    }

    findCenter()
    {
        let highestX = this.cubes[0].x,
        highestY = this.cubes[0].y,
        lowestX = this.cubes[0].x,
        lowestY = this.cubes[0].y;

        for(let i = 0; i < this.cubes.length; i++)
        {
            if(highestX < this.cubes[i].x)
                highestX = this.cubes[i].x
            if(lowestX > this.cubes[i].x)
                lowestX = this.cubes[i].x
            if(highestY < this.cubes[i].y)
                highestY = this.cubes[i].y
            if(lowestY > this.cubes[i].y)
                lowestY = this.cubes[i].y
        }
        this.centerX = lowestX + (highestX - lowestX) / 2 + canvas.width / 2;
        this.centerY = lowestY + (highestY - lowestY) / 2;
        console.log(this.centerX, this.centerY);
    }
}

let currentShape = new Shape();

const Draw = () =>
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(currentShape.centerX, currentShape.centerY);
    // ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(degrees * Math.PI / 180);
    ctx.fillStyle = "#ff7f7f";
    for(let i = 0; i < currentShape.cubes.length; i++)
    {
        let x, y;
        x = currentShape.cubes[i].x;
        y = currentShape.cubes[i].y - 50;
        ctx.fillRect(x, y + yDifference, width, width);
        ctx.strokeRect(x, y + yDifference, width, width);
    }
    ctx.restore();
    // ctx.beginPath();
    // ctx.moveTo(canvas.width / 2,  canvas.height / 2);
    // ctx.lineTo(mouse.x, mouse.y);
    // ctx.stroke();
}

let yDifference = 0;

const Drop = () =>
{
    // yDifference += 50;
    currentShape.centerY += 50;
}

const Main = () =>
{
    requestAnimationFrame(Main);
    Draw();
}

setInterval(Drop, 500);
Main();