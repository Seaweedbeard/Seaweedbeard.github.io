const timediv = document.createElement("time");

function nono() {
    document.body.appendChild(timediv);
    let milliseconds = 0,
        seconds = 0,
        minutes = 0,
        hours = 0;
    time();

    function time() {
        if (game == "not done") {
            milliseconds++;
            if (milliseconds > 99) {
                milliseconds = 0;
                seconds++;
            }
            timediv.innerHTML = seconds + ":" + milliseconds + " Sacred time units";
            document.body.appendChild(timediv);
            setTimeout(time, 10);
        }
    }

}

let spaceship = {
        "width": 50,
        "height": 20,
        "color": "darkgreen",
        "xpos": 10,
        "ypos": 270,
        "status": "alive"
    },
    barrel = {
        "width": 10,
        "height": 20,
        "color": "darkgreen"
    },
    bullet = {
        "width": 8,
        "height": 10,
        "color": "white",
        "xpos": spaceship.xpos + 21,
        "ypos": 260
    },
    enemybullet = {
        "width": 8,
        "height": 10,
        "color": "white",
        "xpos": spaceship.xpos + 21,
        "ypos": 260
    },
    enemy = {
        "color": "red",
        "width": 30,
        "height": 20,
        "xpos": 460,
        "ypos": 20,
        "status": "alive"
    },
    canvas,
    ctx,
    left = false,
    right = false,
    up = false,
    shooting,
    enemyshooting = false,
    savedenemypos,
    boost = false,
    game = "not done";

function startspaceinvaders() {
    canvas = document.getElementById("spacecanvas")
    ctx = canvas.getContext('2d');
    drawspaceship();
}

function reset() {
    document.location.reload();
}

let lastloop = new Date();

function drawspaceship() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = spaceship.color;
    ctx.fillRect(spaceship.xpos, spaceship.ypos, spaceship.width, spaceship.height);
    ctx.fillRect(spaceship.xpos + 20, spaceship.ypos - 10, barrel.width, barrel.height);

    drawenemies();

    if (boost) {
        movespeed = 4;
    } else {
        movespeed = 2.5;
    }

    if (right) {
        if (spaceship.xpos <= 500 - spaceship.width - 2.5) {
            spaceship.xpos += movespeed;
        }
    }
    if (left) {
        if (spaceship.xpos >= 2.5) {
            spaceship.xpos -= movespeed
        }
    }

    requestAnimationFrame(drawspaceship);
}

document.onkeydown = function(evt) {
    let key = evt.key;
    key = key.toLowerCase();
    if (key === "arrowleft" || key === "a") {
        left = true;
    }
    if (key === "arrowright" || key === "d") {
        right = true;
    }
    if (key === "arrowup" || key === "w" || key == " " || key == "z") {
        if (boost === false) {
            if (shooting) {
                return false;
            }
            savedenemypos = enemy.xpos;
            shoot();
            enemydodge();
        }
    }
    if (key === "shift") {
        boost = true;
    }
    if (key === "r") {
        reset();
    }
    if (key === "enter") {
        reset();
    }
}

document.onkeyup = function(evt) {
    let key = evt.key;
    key = key.toLowerCase();
    if (key === "arrowleft" || key === "a") {
        left = false;
    }
    if (key === "arrowright" || key === "d") {
        right = false;
    }
    if (key === "arrowup" || key === "w" || key == " " || key == "z") {
        up = false;
    }
    if (key === "shift") {
        boost = false;
    }
}

function drawenemies() {
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.xpos, enemy.ypos, enemy.width, enemy.height);
}

function moveenemies() {
    if (enemy.status == "alive") {
        if (enemy.xpos < spaceship.xpos + 30) {
            enemy.xpos += 2;
        }
        if (enemy.xpos > spaceship.xpos - 10) {
            enemy.xpos -= 2;
        }
        if (enemy.xpos >= spaceship.xpos - 10 && enemy.xpos <= spaceship.xpos + 30) {
            if (enemyshooting == false) {
                enemyshoot();
            }
        }
        requestAnimationFrame(moveenemies);
    } else if (enemy.status == "dead") {
        enemy.ypos = -20;
    }
}

function enemyshoot() {
    enemyshooting = true;
    createenemybullet();

    function createenemybullet() {
        enemybullet.xpos = enemy.xpos + 10;
        ctx.fillStyle = bullet.color;
        enemybullet.xpos = enemy.xpos + 10;
        enemybullet.ypos = enemy.ypos + 20;
        ctx.fillRect(enemybullet.xpos, enemybullet.ypos, enemybullet.width, enemybullet.height);
    }
    moveenemybullet();

    function moveenemybullet() {
        if (enemyshooting) {
            ctx.fillStyle = enemybullet.color;
            ctx.fillRect(enemybullet.xpos, enemybullet.ypos, enemybullet.width, enemybullet.height);
            enemybullet.ypos += 11;
            if (enemybullet.ypos >= 300) {
                enemyshooting = false;
                return false;
            }
            if (enemybullet.xpos >= spaceship.xpos &&
                enemybullet.xpos <= spaceship.xpos + spaceship.width &&
                enemybullet.ypos >= spaceship.ypos &&
                enemybullet.ypos <= spaceship.ypos + spaceship.height ||
                enemybullet.xpos + enemybullet.width >= spaceship.xpos &&
                enemybullet.xpos + enemybullet.width <= spaceship.xpos + spaceship.width &&
                enemybullet.ypos >= spaceship.ypos &&
                enemybullet.ypos <= spaceship.ypos + spaceship.height) {
                killplayer();

                function killplayer() {
                    spaceship.status = "dead";
                    spaceship.ypos = -20;
                    document.getElementById("spaceinvaderscont").innerHTML = "Du tapte etter &nbsp";
                    game = "done";
                }
            }
            requestAnimationFrame(moveenemybullet);
        }
    }

}

function enemydodge() {
    if (shooting) {
        enemy.xpos = savedenemypos;
        let randspeed = Math.floor(Math.random() * 4);
        if (enemy.xpos <= bullet.xpos - 8 && enemy.xpos >= bullet.xpos - 40) {
            if (enemy.xpos >= 50) {
                enemy.xpos -= randspeed;
            } else {
                enemy.xpos += randspeed;
            }
        } else if (enemy.xpos > bullet.xpos - 8 && enemy.xpos <= bullet.xpos + 40) {
            if (enemy.xpos <= 450) {
                enemy.xpos += randspeed;
            } else {
                enemy.xpos -= randspeed;
            }
        }
        savedenemypos = enemy.xpos;
        requestAnimationFrame(enemydodge);
    }
}

function shoot() {
    shooting = true;
    createbullet();

    function createbullet() {
        bullet.xpos = spaceship.xpos + 21;
        ctx.fillStyle = bullet.color;
        bullet.xpos = spaceship.xpos + 21;
        bullet.ypos = spaceship.ypos - 10;
        ctx.fillRect(bullet.xpos, bullet.ypos, bullet.width, bullet.height);
    }
    movebullet();

    function movebullet() {
        if (shooting) {
            ctx.fillStyle = bullet.color;
            ctx.fillRect(bullet.xpos, bullet.ypos, bullet.width, bullet.height);
            bullet.ypos -= 15;
            if (bullet.ypos <= 0 - bullet.height) {
                shooting = false;
                return false;
            }
            if (bullet.xpos >= enemy.xpos && bullet.xpos <= enemy.xpos + enemy.width &&
                bullet.ypos >= enemy.ypos && bullet.ypos <= enemy.ypos + enemy.height ||
                bullet.xpos + bullet.width >= enemy.xpos &&
                bullet.xpos + bullet.width <= enemy.xpos + enemy.width &&
                bullet.ypos >= enemy.ypos && bullet.ypos <= enemy.ypos + enemy.height) {
                killenemy();

                function killenemy() {
                    enemy.status = "dead";
                    enemy.ypos = -20;
                    document.getElementById("spaceinvaderscont").innerHTML = "Du vant etter &nbsp";
                    game = "done";
                }
            }
            requestAnimationFrame(movebullet);
        }
    }
}