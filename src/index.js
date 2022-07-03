//#region import

import './css/style.css'
import logoImg from './assets/logo-img.png'

//#endregion

//#region references

//references to basic level attributes and elements
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

//references to all the buttons we need
const btns = document.querySelectorAll(".subBtn");
const drawTog = document.getElementById("drawToggle");
const canvasTog = document.getElementById("toggleCanvas");
const logo = document.getElementById("logoImg");

logo.src = logoImg;

//#endregion

//#region variables

var freeDraw = false;
var drawFlag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0;

var rainbow = false;

var x = "black",
    y = 2;

//#endregion

//#region event listeners
btns.forEach(element => 
{
    element.addEventListener("mouseenter", function()
    {
        element.style.background = "yellow";
    }, false);
    element.addEventListener("mouseleave", function()
    {
        element.style.background = "white";
    }, false);
});

//get draw toggle button manually because we want to add seperate
//functionality when mousing over
drawTog.addEventListener("mouseenter", function()
{
    drawTog.style.background = "yellow";
}, false);

drawTog.addEventListener("mouseleave", function()
{
    if (freeDraw)
    {
        drawTog.style.background = "white";
    }
    else
    {
        drawTog.style.background = "grey";
    }
}, false);

canvas.addEventListener("mousemove", function (e) 
{
    findxy("move", e)
}, false);
canvas.addEventListener("mousedown", function (e) 
{
    findxy("down", e)
}, false);
canvas.addEventListener("mouseup", function (e) 
{
    findxy("up", e)
}, false);
canvas.addEventListener("mouseout", function (e) 
{
    findxy("out", e)
}, false);

//#endregion

//#region button functionality
document.getElementById("widthBtn1").onclick = function()
{
    y = 2;
};

document.getElementById("widthBtn2").onclick = function()
{
    y = 7;
};

document.getElementById("widthBtn3").onclick = function()
{
    y = 12;
};

document.getElementById("rainbowBtn").onclick = function()
{
    rainbow = !rainbow;
};

drawTog.onclick = function()
{ 
    freeDraw = !freeDraw;
    if(freeDraw)
    {
        drawTog.style.background = "white";
    }
    else
    {
        drawTog.style.background = "grey";
    }
};

document.getElementById("rectangleBtn").onclick = function() 
{
    clearCanvas();
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(canvas.width/4, canvas.height/4,150,75);
};

document.getElementById("clearBtn").onclick = function()
{
    clearCanvas();
};

document.getElementById("circleBtn").onclick = function()
{
    clearCanvas();
    
    /*
        this is needed! else when going
        from triangle to circle the triangle will not clear,
        something to do with how arcs and lines are drawn
    */
    ctx.beginPath();
    
    ctx.arc(canvas.width/4, canvas.height/4, 20, 0, 2*Math.PI);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
};

document.getElementById("triangleBtn").onclick = function()
{
    clearCanvas();

    ctx.beginPath();
    ctx.moveTo(200, 50);
    ctx.lineTo(200, 200);
    ctx.lineTo(400, 200);
    ctx.closePath();

    ctx.fillStyle = "#FF0000";
    ctx.fill();
};

document.getElementById("hexagonBtn").onclick = function()
{
    /*radius*/
    const r = 100;
    /*Regular hexagon*/
    const a = 2 * Math.PI / 6;
    
    clearCanvas();
    
    ctx.beginPath();
    for (let i = 0; i < 6; i++) 
    {
        ctx.lineTo(canvas.width/2 + r * Math.cos(a * i), canvas.height/2 + r * Math.sin(a * i));
    }
    ctx.closePath();

    ctx.fillStyle = "#FF0000";
    ctx.fill();
    
};

document.getElementById("randomBtn").onclick = function()
{
    drawRandom(false);
};

document.getElementById("randomLineBtn").onclick = function()
{
    drawRandom(true);
};

canvasTog.onclick = function()
{
    if(canvas.style.display === "none")
    {
        canvas.style.display = "flex";
        btns.forEach(element => element.disabled = false);
        drawTog.disabled = false;
        canvasTog.style.backgroundColor = "green";
    }
    else
    {
        canvas.style.display = "none";
        btns.forEach(element => element.disabled = true);
        drawTog.disabled = true;
        canvasTog.style.backgroundColor = "red";
    }    
};

//#endregion

//#region utility functions

//res = resolve (way/how to resolve the below request)
//e = request (event that sent a request)
function findxy(res, e) {
    if(freeDraw)
    {
        if (res == 'down')
        {
            /*
                each time the mouse button is pressed update the cursor
                position in order to start drawing from where the
                cursor currently is
            */
           
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft - 5;
            currY = e.clientY - canvas.offsetTop - 5;
            
            drawFlag = true;
        }
        if (res == 'up' || res == "out")
        {
            drawFlag = false;
        }
        if (res == 'move')
        {
            if (drawFlag)
            {
                prevX = currX;
                prevY = currY;

                //-5 because the border has 5px width and they count as offset on
                //the canvas
                currX = e.clientX - canvas.offsetLeft - 5;
                currY = e.clientY - canvas.offsetTop - 5;
                if (rainbow)
                {
                    x = generateRandomColor();
                }
                else
                {
                    x = "black";
                }
                draw();
            }
        }
    }
}

function draw() {
    
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.lineCap = "round";
    ctx.stroke();
}

function drawRandom(res)
{
    clearCanvas();

    ctx.beginPath();
    ctx.moveTo(10,10);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";

    /*3 to 8 vertices + 1 at the starting point at (10,10)*/
    let maxVertices = Math.trunc((Math.random()*5)+3);

    alert("number of vertices: " + (maxVertices+1));

    for(let i=0; i< maxVertices; i++)
    {
        ctx.lineTo((Math.random()*canvas.width)+1,(Math.random()*canvas.height)+1);
    }
    ctx.closePath();

    if (res)
    {
        ctx.stroke();
    }
    else
    {
        ctx.fillStyle = "#FF0000";
        ctx.fill();
    }
    
}

function clearCanvas()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function generateRandomColor()
{
    let r = Math.trunc(Math.random()*256);
    let g = Math.trunc(Math.random()*256);
    let b = Math.trunc(Math.random()*256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

//#endregion