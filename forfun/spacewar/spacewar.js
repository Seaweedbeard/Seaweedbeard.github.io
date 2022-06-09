let canvas, ctx;

let bouncycube = {
        "width": 50,
        "height": 50,
        "color": "red",
        "xpos": -25,
        "ypos": -25,
        "vx": 0,
        "vy": 0,
        "acceleration": 0.005,
    },
    g = 0.9805,
    acceleratingl = false,
    acceleratingr = false,
    left = false,
    right = false,
    up = false,
    angle = 0;

function begin() {
    canvas = document.getElementById("myCanvas")
    ctx = canvas.getContext('2d');

    document.getElementById("buttons").style.display = "initial";
    document.getElementById("begin").style.display = "none";


    setupfields();
    begin2();
    accelerate();
    rotateit();
}

function setupfields() {
    document.getElementById("g").value = g * 10;
}

function changevar(clicked_id) {
    let id = clicked_id;
    if (id == "g") {
        g = document.getElementById(id).value / 10;
    }
}

function begin2() {
    drawline();
    addCube();
    accelerate();
    requestAnimationFrame(begin2);
    //gravity();
}

function drawline() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "White";
    ctx.fillRect(0, 449, 900, 1);
}

function rotateit() {
    if (left) {
        angle -= 1 * Math.PI / 180;
    }
    if (right) {
        angle += 1 * Math.PI / 180;
    }
    requestAnimationFrame(rotateit);
}

function addCube() {
    ctx.fillStyle = bouncycube.color;
    ctx.save();
    ctx.translate(bouncycube.xpos + bouncycube.width / 2, bouncycube.ypos + bouncycube.height / 2);
    ctx.rotate(angle);
    ctx.fillRect(bouncycube.xpos, bouncycube.ypos, bouncycube.width, bouncycube.height);
    bouncycube.xpos += bouncycube.vx;
    ctx.restore();
}

function moveit() {}

document.onkeydown = function(evt) {
    let key = evt.key.toLowerCase();
    //console.log(key);
    if (key === "arrowright") {
        right = true;
        return false;
    }
    if (key === "arrowleft") {
        left = true;
        return false;
    }
    if (key === "arrowdown") {
        stop();
        return false;
    }
    if (key === " " || key === "arrowup") {
        up = true;
        return false;
    }
}
document.onkeyup = function(evt) {
    let key = evt.key.toLowerCase();
    //console.log(key);
    if (key === "arrowright") {
        right = false;
        return false;
    }
    if (key === "arrowleft") {
        left = false;
        return false;
    }
    if (key === " " || key === "arrowup") {
        up = false;
        return false;
    }
}

function stop() {
    bouncycube.vx = 0;
    bouncycube.vy = g;
}

function accelerate() {
    if (up) {
        bouncycube.vx += bouncycube.acceleration;
    } else {
        bouncycube.vx = 0;
    }
}

/*function gravity() {
    bouncycube.ypos += bouncycube.vy;
    bouncycube.vy += g;
    if (bouncycube.ypos > 400) {
        bouncycube.ypos = 300;
    }
}*/