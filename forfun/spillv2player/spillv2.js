let spaceship = {
        "width": 50,
        "height": 20,
        "color": "darkgreen",
        "xpos": 10,
        "ypos": 270,
        "status": "alive",
        "score": 0
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
    enemy = {
        "color": "red",
        "width": 50,
        "height": 20,
        "xpos": 440,
        "ypos": 10,
        "status": "alive",
        "score": 0
    },
    enemybarrel = {
        "width": 10,
        "height": 20,
        "color": "red"
    },
    enemybullet = {
        "width": 8,
        "height": 10,
        "color": "white",
        "xpos": enemy.xpos + 21,
        "ypos": 260
    },
    canvas,
    ctx,
    left = false,
    right = false,
    up = false,
    a = false,
    d = false,
    ws = false,
    shooting,
    enemyshooting = false,
    boost = false,
    enemyboost = false,
    ogbulletspeed = 13,
    bulletspeed = 13,
    ogmovespeed = 2.5,
    movespeed,
    fps,
    limit = 5;

function startspaceinvaders() {
    canvas = document.getElementById("spacecanvas")
    ctx = canvas.getContext('2d');
    drawspaceship();
}

function reset(type) {
    //document.location.reload();
    if (type === "full") {
        spaceship.score = 0;
        enemy.score = 0;
        document.getElementById("score").innerHTML = spaceship.score + " - " + enemy.score;
        makestars();
    }
    spaceship = {
            "width": 50,
            "height": 20,
            "color": "darkgreen",
            "xpos": 10,
            "ypos": 270,
            "status": "alive",
            "score": spaceship.score
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
        enemy = {
            "color": "red",
            "width": 50,
            "height": 20,
            "xpos": 440,
            "ypos": 10,
            "status": "alive",
            "score": enemy.score
        },
        enemybarrel = {
            "width": 10,
            "height": 20,
            "color": "red"
        },
        enemybullet = {
            "width": 8,
            "height": 10,
            "color": "white",
            "xpos": enemy.xpos + 21,
            "ypos": 260
        },
        canvas,
        ctx,
        left = false,
        right = false,
        up = false,
        a = false,
        d = false,
        ws = false,
        shooting = false,
        enemyshooting = false,
        boost = false,
        ogmovespeed = 2.5,
        movespeed,
        enemyboost = false
}

function drawspaceship() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createstars();
    /*ctx.fillStyle = spaceship.color;
    ctx.fillRect(spaceship.xpos, spaceship.ypos, spaceship.width, spaceship.height);
    ctx.fillRect(spaceship.xpos + 20, spaceship.ypos - 10, barrel.width, barrel.height);*/

    let Spriteship = new Image();
    Spriteship.src = "../../Bilder/Sprite/Vehicles/spaceship/sprite_up.png";
    ctx.drawImage(Spriteship, spaceship.xpos, spaceship.ypos - 10, 53, 40);

    drawenemy();

    if (boost) {
        movespeed = ogmovespeed * (60 / fps) * 1.6;
    } else {
        movespeed = ogmovespeed * (60 / fps);
    }

    if (right) {
        if (spaceship.xpos <= 500 - spaceship.width - 2.5) {
            spaceship.xpos += movespeed;
        }
    }
    if (left) {
        if (spaceship.xpos >= 2.5) {
            spaceship.xpos -= movespeed;
        }
    }

    requestAnimationFrame(drawspaceship);
}

document.onkeydown = function(evt) {
    let key = evt.key;
    key = key.toLowerCase();
    if (key === "arrowleft") {
        left = true;
    }
    if (key === "a") {
        a = true;
    }
    if (key === "arrowright") {
        right = true;
    }
    if (key === "d") {
        d = true;
    }
    if (key === "arrowup" || key === "arrowdown") {
        if (boost === false) {
            if (shooting) {
                return false;
            }
            savedenemypos = enemy.xpos;
            shoot();
        }
    }
    if (key === "w" || key == "s") {
        if (enemyboost === false) {
            if (enemyshooting) {
                return false;
            }
            enemyshoot();
        }
    }
    if (key === "shift") {
        enemyboost = true;
    }
    if (key === " ") {
        boost = true;
    }
    if (key === "r") {
        reset("full");
    }
    if (key === "enter") {
        reset();
    }
}

document.onkeyup = function(evt) {
    let key = evt.key;
    key = key.toLowerCase();
    if (key === "arrowleft") {
        left = false;
    }
    if (key === "a") {
        a = false;
    }
    if (key === "arrowright") {
        right = false;
    }
    if (key === "d") {
        d = false;
    }
    if (key === "arrowup") {
        up = false;
    }
    if (key === "w" || key == "s") {
        ws = false;
    }
    if (key === "shift") {
        enemyboost = false;
    }
    if (key === " ") {
        boost = false;
    }
}

function drawenemy() {
    /*ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.xpos, enemy.ypos, enemy.width, enemy.height);
    ctx.fillRect(enemy.xpos + 20, enemy.ypos + 10, enemybarrel.width, enemybarrel.height);*/

    let Spriteenemy = new Image();
    Spriteenemy.src = "../../Bilder/Sprite/Vehicles/spaceship/sprite_down.png";
    ctx.drawImage(Spriteenemy, enemy.xpos - 1, enemy.ypos - 6, 53, 40);

    if (enemyboost) {
        movespeed = ogmovespeed * (60 / fps) * 1.6;
    } else {
        movespeed = ogmovespeed * (60 / fps);
    }

    if (d) {
        if (enemy.xpos <= 500 - enemy.width - 2.5) {
            enemy.xpos += movespeed;
        }
    }
    if (a) {
        if (enemy.xpos >= 2.5) {
            enemy.xpos -= movespeed
        }
    }
}

function enemyshoot() {
    enemyshooting = true;
    createenemybullet();

    function createenemybullet() {
        enemybullet.xpos = enemy.xpos + 21;
        ctx.fillStyle = bullet.color;
        enemybullet.xpos = enemy.xpos + 21;
        enemybullet.ypos = enemy.ypos + 20;
        ctx.fillRect(enemybullet.xpos, enemybullet.ypos, enemybullet.width, enemybullet.height);
    }
    moveenemybullet();

    function moveenemybullet() {
        if (enemyshooting) {
            ctx.fillStyle = enemybullet.color;
            ctx.fillRect(enemybullet.xpos, enemybullet.ypos, enemybullet.width, enemybullet.height);
            enemybullet.ypos += bulletspeed * (60 / fps);
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
                    bullet.ypos = 0 - bullet.height;
                    enemybullet.ypos = 300;
                    updatescore("enemy");
                }
            }
            requestAnimationFrame(moveenemybullet);
        }
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
            bullet.ypos -= bulletspeed * (60 / fps);
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
                    bullet.ypos = 0 - bullet.height;
                    enemybullet.ypos = 300;
                    updatescore("player");
                }
            }
            requestAnimationFrame(movebullet);
        }
    }
}

function updatescore(side) {
    if (side == "player") {
        spaceship.score++;
    } else if (side == "enemy") {
        enemy.score++;
    }
    if (spaceship.score == limit || enemy.score == limit) {
        if (spaceship.score == limit) {
            document.getElementById("result").innerHTML = "Grønn vinner";
            spaceship.score = 0;
            enemy.score = 0;
        } else {
            document.getElementById("result").innerHTML = "Rød vinner";
            spaceship.score = 0;
            enemy.score = 0;
        }
        document.getElementById("score").innerHTML = spaceship.score + " - " + enemy.score;
        reset("full");
    } else {
        document.getElementById("score").innerHTML = spaceship.score + " - " + enemy.score;
        reset("half");
    }
}

let stars = [];

function makestars() {
    stars.length = 0;
    for (let i = 0; i < 300; i++) {
        let size = Math.random() * 2;
        stars.push({
            xpos: Math.floor(Math.random() * 500),
            ypos: Math.floor(Math.random() * 300),
            height: size,
            width: size,
            //The closer, the more yellow
            color: "#fff" + Math.floor(255 * (2 / size)).toString(16)
        });
    }

    createstars();
}

function createstars() {
    for (let i = 0; i < stars.length; i++) {
        ctx.fillStyle = stars[i].color;
        ctx.fillRect(stars[i].xpos, stars[i].ypos, stars[i].width, stars[i].height);
        if (stars[i].xpos <= 500) {
            stars[i].xpos += .5 * stars[i].height * (60 / fps);
        } else if (stars[i].xpos >= 500) {
            let size = Math.random() * 2;
            stars[i].xpos = 0;
            stars[i].ypos = Math.floor(Math.random() * 300);
            stars[i].height = size;
            stars[i].width = size;
            stars[i].color = "#fff" + Math.floor(255 * (2 / stars[i].height)).toString(16);
        }
    }
}

function adaptSpeed() {
    //Alt inne i denne funksjonen er kopiert fra nettet.
    var rAF = function() {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            }
        );
    }();

    var frame = 0;
    var allFrameCount = 0;
    var lastTime = Date.now();
    var lastFameTime = Date.now();

    var loop = function() {
        var now = Date.now();
        var fs = (now - lastFameTime);
        fps = Number(Math.round(1000 / fs));

        lastFameTime = now;
        allFrameCount++;
        frame++;

        if (now > 1000 + lastTime) {
            fps = Number(Math.round((frame * 1000) / (now - lastTime)));
            //console.log('1s, FPS:', fps);
            frame = 0;
            lastTime = now;
        };

        rAF(loop);
    }

    loop();
}