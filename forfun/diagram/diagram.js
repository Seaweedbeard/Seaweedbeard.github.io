let c, ctx, x, y;
let mstate = "up";
let linemove = [];

function draw() {
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");


    /*ctx.beginPath();
    ctx.arc(50, 50, 40, 0, 2 * Math.PI);
    ctx.stroke();*/
}

function cleara() {
    ctx.clearRect(0, 0, c.width, c.height);
}

function move() {
    for (let i = 0; i <= 1000; i++) {

        Task(i);
    }
    //x coords: 110, 170, 230
}

function Task(i) {
    setTimeout(function() {
        //ctx.clearRect(0, 0, c.width, c.height);
        ctx.beginPath();
        ctx.arc(50 + .1 * i, 50 + i * .05, 40 + i * .06, 0, 2 * Math.PI);
        ctx.stroke();
    }, 1 * i);
}

function mdraw(e) {
    x = e.clientX;
    y = e.clientY - 133;

    if (mstate == "down") {
        ctx.beginPath();
        ctx.moveTo(x, y);
        linemove.push(x + ":" + y);

    } else if (mstate == "up") {
        ctx.lineTo(x, y);
        linemove.push(x + ":" + y);
        ctx.stroke();
    }
}

function draww(e) {
    if (mstate == "down") {
        x = e.clientX;
        y = e.clientY - 133;
        ctx.lineTo(x, y);
        linemove.push(x + ":" + y);
        ctx.stroke();
    }
}

function mdown() {
    mstate = "down";
};

function mup() {
    mstate = "up";
};

function colorpick() {
    let color = document.getElementById("colorpicker").value;
    ctx.strokeStyle = color;
}

function linesize() {
    let size = document.getElementById("linesize").value;
    ctx.lineWidth = size;
    console.log(size);
}