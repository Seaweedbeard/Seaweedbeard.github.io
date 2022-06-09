let canvas, ctx;

let bouncycube = {
        "width": 50,
        "height": 50,
        "color": "red",
        "xpos": 10,
        "ypos": 399,
        "xv": 0,
        "yv": -2,
        "mass": 10,
        "airres": 0.002,
        "groundres": 0,
        "area": 0,
        "dragcoefficient": 1,
        "acceleration": 0.3,
    },
    g = 0.9805,
    sumfriction,
    airdensity = 1.2,
    θ = 0,
    N = 0,
    μ = 0.3,
    Fr = 0,
    onground = true,
    airtime,
    acceleratingl = false,
    acceleratingr = false,
    jumpforce = 15,
    jumpspeed = 15,
    maxspeed = 15,
    frictiontoggle = true,
    keepspeedonclick = false,
    G = 0,
    realspeed;

function begin() {
    canvas = document.getElementById("myCanvas")
    ctx = canvas.getContext('2d');

    bouncycube.acceleration = 0.3 * 10 / bouncycube.mass;

    document.getElementById("buttons").style.display = "initial";
    document.getElementById("begin").style.display = "none";


    calculate_everything();
    setupfields();
    speedo();
    begin2();
    changeicon();
}

function calculate_everything() {
    bouncycube.area = bouncycube.width * bouncycube.height;
    bouncycube.mass = bouncycube.area / 250
    bouncycube.airres = (airdensity * bouncycube.dragcoefficient * bouncycube.height) / 3000;
    N = Math.abs(bouncycube.mass * g * Math.cos(θ));
    Fr = μ * N / 200;
    bouncycube.groundres = Fr;
    G = bouncycube.mass * g;
    jumpspeed = jumpforce / G * 10;

    realspeed = Math.sqrt((bouncycube.yv ** 2) + (bouncycube.xv ** 2));
    θ = Math.round(Math.acos(bouncycube.xv / realspeed) * (180 / Math.PI) * 10) / 10;
    /*console.log("Friksjonskraft " + Fr);
    console.log("Kubens luftmotstand " + bouncycube.airres);*/
}

function setupfields() {
    document.getElementById("acceleration").value = bouncycube.acceleration * 100 / bouncycube.mass;
    document.getElementById("jump").value = jumpforce;
    document.getElementById("g").value = g * 10;
    document.getElementById("maxspeed").value = maxspeed;
    document.getElementById("mass").value = bouncycube.mass;
    document.getElementById("airdensity").value = airdensity;
    document.getElementById("dragcoefficient").value = bouncycube.dragcoefficient;
    document.getElementById("height").value = bouncycube.height;
    document.getElementById("width").value = bouncycube.width;
}

function changevar(clicked_id) {
    let id = clicked_id;
    if (id == "friction") {
        if (document.getElementById("friction").checked == true) {
            frictiontoggle = true;
        } else if (document.getElementById("friction").checked == false) {
            frictiontoggle = false;
        }
    } else if (id == "keepspeedonclick") {
        if (document.getElementById("keepspeedonclick").checked == true) {
            keepspeedonclick = true;
        } else if (document.getElementById("keepspeedonclick").checked == false) {
            keepspeedonclick = false;
        }
    } else if (id == "acceleration") {
        bouncycube.acceleration = document.getElementById(id).value / 100 * bouncycube.mass;
    } else if (id == "jump") {
        jumpforce = document.getElementById(id).value;
    } else if (id == "g") {
        g = document.getElementById(id).value / 10;
    } else if (id == "maxspeed") {
        maxspeed = document.getElementById(id).value;
    } else if (id == "mass") {
        bouncycube.mass = document.getElementById(id).value;
    } else if (id == "airdensity") {
        airdensity = document.getElementById(id).value;
    } else if (id == "dragcoefficient") {
        bouncycube.dragcoefficient = document.getElementById(id).value;
    } else if (id == "height") {
        bouncycube.height = document.getElementById(id).value;
        resized();
    } else if (id == "width") {
        bouncycube.width = document.getElementById(id).value;
        resized();
    }
    calculate_everything();
}

function resized() {
    if (+bouncycube.ypos > 449 - +bouncycube.height ||
        bouncycube.ypos < 449 - bouncycube.height) {
        bouncycube.ypos = (449 - bouncycube.height);
    }
    if ((+bouncycube.xpos + +bouncycube.width) >= canvas.width &&
        (+bouncycube.xpos + +bouncycube.width) !== "infinity") {
        bouncycube.xpos = (899 - bouncycube.width)
    }
}

function begin2() {
    drawline();
    addCube();
    accelerate();
    friction();
    setupfields();
    requestAnimationFrame(begin2);
}

function speedo() {
    document.getElementById("speed").innerHTML = Math.round(realspeed * 10) / 10;
    document.getElementById("groundres").innerHTML = Math.round(bouncycube.groundres * 200 * 10) / 10;
    document.getElementById("airres").innerHTML = Math.round(bouncycube.airres * 3000 * 10) / 10;
    calculate_everything();
    setTimeout(speedo, 200);
}

function drawline() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "white";
    ctx.moveTo(0, 450);
    ctx.lineTo(900, 450);
    ctx.stroke();
}

function addCube() {
    ctx.fillStyle = bouncycube.color;
    ctx.fillRect(bouncycube.xpos, bouncycube.ypos, bouncycube.width, bouncycube.height);
    bouncycube.xpos += bouncycube.xv;
    bouncewalls();
    gravity();
}

function bouncewalls() {
    if (bouncycube.xpos >= 900 - bouncycube.width) {
        bouncycube.xv = -bouncycube.xv;
    } else if (bouncycube.xpos <= 0) {
        bouncycube.xv = -bouncycube.xv;
    }
}

document.onkeydown = function(evt) {
    let key = evt.key.toLowerCase();
    //console.log(key);
    if (key === "arrowright") {
        acceleratingr = true;
        return false;
    }
    if (key === "arrowleft") {
        acceleratingl = true;
        return false;
    }
    if (key === "arrowdown") {
        stop();
        return false;
    }
    if (key === " " || key === "arrowup") {
        jump();
        return false;
    }
}
document.onkeyup = function(evt) {
    let key = evt.key.toLowerCase();
    //console.log(key);
    if (key === "arrowright") {
        acceleratingr = false;
        return false;
    }
    if (key === "arrowleft") {
        acceleratingl = false;
        return false;
    }
}

function stop() {
    bouncycube.xv = 0;
    bouncycube.yv = g;
}

let mouseclick = false;

function clickscreen() {
    mouseclick = true;
}

function removeclickscreen() {
    mouseclick = false;
}

function dragcube(evt) {
    if (mouseclick) {
        //evt.preventDefault();
        bouncycube.xpos = evt.offsetX - (bouncycube.width / 2);
        bouncycube.ypos = evt.offsetY - (bouncycube.height / 2);
        if (keepspeedonclick == false) {
            bouncycube.xv = 0;
            bouncycube.yv = 0;
        }
        if (evt.offsetY >= 450 - (bouncycube.height / 2)) {
            bouncycube.xpos = evt.offsetX - (bouncycube.width / 2);
            bouncycube.ypos = 449 - (bouncycube.height);
            onground = true;
            airtime = false;
        }
        if (evt.offsetX >= 900 - (bouncycube.width / 2)) {
            bouncycube.xpos = 899 - bouncycube.width;
            bouncycube.ypos = evt.offsetY - (bouncycube.height / 2);
        }
        if (evt.offsetX <= bouncycube.width / 2) {
            bouncycube.xpos = 1;
            bouncycube.ypos = evt.offsetY - (bouncycube.height / 2);
        }
        onground = false;
        airtime = true;
    }
}

function accelerate() {
    if (acceleratingr) {
        if (bouncycube.xv <= maxspeed) {
            bouncycube.xv += bouncycube.acceleration;
        }
        if (bouncycube.xpos > 900 - bouncycube.width) {
            bouncycube.xpos = 899 - bouncycube.width;
        }
    }
    if (acceleratingl) {
        if (bouncycube.xv >= -maxspeed) {
            bouncycube.xv -= bouncycube.acceleration;
        }
        if (bouncycube.xpos < 0) {
            bouncycube.xpos = 1;
        }
    }
}

function friction() {
    if (frictiontoggle == true) {
        frictionair = bouncycube.airres;
        if (onground == true) {
            sumfriction = bouncycube.groundres + bouncycube.airres;
            if (bouncycube.xv < -sumfriction) {
                bouncycube.xv += sumfriction;
            } else if (bouncycube.xv > sumfriction) {
                bouncycube.xv -= sumfriction;
            } else {
                bouncycube.xv = 0;
            }
        } else if (onground == false) {
            if (bouncycube.xv < -frictionair) {
                bouncycube.xv += frictionair;
            } else if (bouncycube.xv > frictionair) {
                bouncycube.xv -= frictionair;
            } else {
                bouncycube.xv = 0;
            }
        }
    }
}

function jump() {
    bouncycube.yv = -jumpspeed;
    airtime = true;
    onground = false;
}

function gravity() {
    if (airtime) {
        bouncycube.ypos += bouncycube.yv;
        bouncycube.yv += g;
        if (bouncycube.ypos > 455 - bouncycube.height) {
            bounceground();
        }
    } else {
        bouncycube.yv = g;
    }
}

function bounceground() {
    if (bouncycube.yv > 0) {
        bouncycube.ypos = 450 - bouncycube.height;
        bouncycube.yv = -bouncycube.yv / 2;
        if (bouncycube.yv > -3) {
            airtime = false;
            bouncycube.ypos = 449 - bouncycube.height;
            onground = true;
        }
    }
}

let pic = "../../Bilder/Icon/physicsredball1.png";

function changeicon() {
    if (pic == "../../Bilder/Icon/physicsredball1.png") {
        document.getElementById('favicon').setAttribute('href', '../../Bilder/Icon/physicsredball1.png');
        pic = "../../Bilder/Icon/physicsredball2.png";
    } else if (pic == "../../Bilder/Icon/physicsredball2.png") {
        document.getElementById('favicon').setAttribute('href', '../../Bilder/Icon/physicsredball2.png');
        pic = "../../Bilder/Icon/physicsredball1.png";
    }
    setTimeout(changeicon, 2000);
}