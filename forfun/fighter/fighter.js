function intro() {
    document.getElementById("intro").style.display = "block";
}

function selectChar(name) {
    if (!player1) {
        player1 = characters1[name];
        document.getElementById("playerchoosing").innerHTML = "Player 2:";
    } else {
        player2 = characters2[name];
        document.getElementById("chargrid").style.display = "none";
        document.getElementById("playerchoosing").innerHTML = "";
        let imgp1 = document.createElement('img');
        imgp1.src = player1.img;
        let imgp2 = document.createElement('img');
        imgp2.src = player2.img;
        document.getElementById("startmenu_char_selection_title").innerHTML = "<H2>" + imgp1.outerHTML + " <span id='vsvsvs'>VS</span> " + imgp2.outerHTML + "</H2>";
        document.getElementById("charinfo").style.display = "none";
    }
}

function showinfo(name) {
    document.getElementById("charinfo").style.color = characters1[name].color;
    document.getElementById("charinfo_content_name_p").innerHTML = name;
    document.getElementById("charinfo_content_stats_hp_p").innerHTML = characters1[name].health;
    document.getElementById("charinfo_content_stats_power_p").innerHTML = characters1[name].power;
    document.getElementById("charinfo_content_stats_speed_p").innerHTML = characters1[name].speed;
}

function openSettings() {
    if (document.getElementById("settings").style.left === "0%") {
        document.getElementById("startmenu").style.display = "block";
        document.getElementById("settings").style.left = "-100%";
    } else {
        document.getElementById("settings").style.left = "0%";
        setTimeout(function() {
            document.getElementById("startmenu").style.display = "none";
        }, 500)
    }
    for (let i = 0; i < 7; i++) {
        document.getElementById(KeysToInt[i] + 1).value = P1movementKeys[KeysToInt[i]];
        document.getElementById(KeysToInt[i] + 2).value = P2movementKeys[KeysToInt[i]];
        if (i < 2) {
            document.getElementById(eKeysToInt[i] + 1).value = extraKeys[eKeysToInt[i]];
        }
    }
}

function changeKeyPrep(clicked_id) {
    oldvalue = document.getElementById(clicked_id).value;
    document.getElementById(clicked_id).value = "";
    document.getElementById(clicked_id).placeholder = "Type new key";
}

function revertKeyChange(clicked_id) {
    if (key == oldvalue || !key) {
        document.getElementById(clicked_id).value = oldvalue;
    }
}

function changeKey(clicked_id, evt) {
    evt.preventDefault();
    let id = clicked_id;
    key = evt.key.toLowerCase();
    for (let i = 0; i < 7; i++) {
        if (key === P1movementKeys[KeysToInt[i]]) {
            document.getElementById(id).value = oldvalue;
            alert("Key already in use");
            return;
        }
        if (key === P2movementKeys[KeysToInt[i]]) {
            document.getElementById(id).value = oldvalue;
            alert("Key already in use");
            return;
        }
        if (i < 2) {
            if (key === extraKeys[eKeysToInt[i]]) {
                document.getElementById(id).value = oldvalue;
                alert("Key already in use");
                return;
            }
        }
    }
    if (evt) {
        document.getElementById(id).value = key;
        if (id.slice(-2) == "e1") {
            extraKeys[id.slice(0, -1)] = key;
        } else if (id.slice(-1) === "1") {
            P1movementKeys[id.slice(0, -1)] = key;
        } else if (id.slice(-1) === "2") {
            P2movementKeys[id.slice(0, -1)] = key;
        }
    }
    storeKeys('save');
}

function storeKeys(type) {
    if (type == "initial") {
        setTimeout(function() {
            if (!localStorage.getItem("P1movementKeys") &&
                !localStorage.getItem("P2movementKeys") &&
                !localStorage.getItem("extraKeys")) {
                localStorage.setItem("P1movementKeys", JSON.stringify(P1movementKeys));
                localStorage.setItem("P2movementKeys", JSON.stringify(P2movementKeys));
                localStorage.setItem("extraKeys", JSON.stringify(extraKeys));
            } else {
                storeKeys("load");
            }
        }, 100)
    } else if (type == "load") {
        P1movementKeys = JSON.parse(localStorage.getItem("P1movementKeys"));
        P2movementKeys = JSON.parse(localStorage.getItem("P2movementKeys"));
        extraKeys = JSON.parse(localStorage.getItem("extraKeys"));
    } else if (type == "save") {
        localStorage.setItem("P1movementKeys", JSON.stringify(P1movementKeys));
        localStorage.setItem("P2movementKeys", JSON.stringify(P2movementKeys));
        localStorage.setItem("extraKeys", JSON.stringify(extraKeys));
    } else if (type == "reset") {
        localStorage.removeItem("P1movementKeys");
        localStorage.removeItem("P2movementKeys");
        localStorage.removeItem("extraKeys");
        location.reload();
    }
}

function setup() {
    if (player2) {
        document.body.style.overflow = "hidden";
        document.getElementById("startmenu").style.top = "100%";
        document.getElementById("pausemenu").style.display = "none";
        document.getElementById("Player_info").style.display = "initial";
        document.getElementById("timer").style.display = "block";
        document.getElementById("Player1_info_name").innerHTML = player1.name;
        document.getElementById("Player1_info_icon").innerHTML = "<img src='" + player1.img + "' width='100%' style='border-radius:50%;border: 1px solid black'>";
        document.getElementById("Player2_info_name").innerHTML = player2.name;
        document.getElementById("Player2_info_icon").innerHTML = "<img src='" + player2.img + "' width='100%' style='border-radius:50%;border: 1px solid black'>";

        document.getElementById("p1keys").innerHTML = "";
        for (let keys in P1movementKeys) {
            document.getElementById("p1keys").innerHTML += P1movementKeys[keys] + " ";
        }
        document.getElementById("p2keys").innerHTML = "";
        for (let keys in P2movementKeys) {
            if (P2movementKeys[keys].length > 1) {
                let newString = P2movementKeys[keys].substring(5);
                document.getElementById("p2keys").innerHTML += newString + " ";
            } else {
                document.getElementById("p2keys").innerHTML += P2movementKeys[keys] + " ";
            }
        }
        document.getElementById("extraKeys").innerHTML = extraKeys.addTime;
        started = true;

        P1crouch = player1.height / 2;
        P1stand = player1.height;
        P2crouch = player2.height / 2;
        P2stand = player2.height;
        player1.facing = "right";
        player2.facing = "left";

        let pickbackground = Math.floor(Math.random() * backgrounds.length);
        background.src = backgrounds[pickbackground];


        canvas = document.getElementById("canvas");
        ctx = canvas.getContext('2d');
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        player1.x = 50;
        player1.y = ground.y - player1.height;
        player2.x = canvas.width - player2.width - 50;
        player2.y = ground.y - player2.height;
        draw();
        timer();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    move();
    gravity();
    block();


    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    health();

    if (!P1airborne) {
        if (p1Jumping) {
            P1airborne = true;
            jump("P1");
        }
    }
    if (!P2airborne) {
        if (p2Jumping) {
            P2airborne = true;
            jump("P2");
        }
    }

    if (p1punching) {
        ctx.fillStyle = P1punch.color;
        ctx.fillRect(player1.x + player1.width / 2 - P1punch.width, player1.y + player1.height / 3 - P1punch.height / 2, P1punch.width, P1punch.height);
    }

    if (p1kicking) {
        ctx.fillStyle = P1kick.color;
        ctx.fillRect(player1.x + player1.width / 2 - P1kick.width, player1.y + player1.height / 3 * 2 - P1kick.height / 2, P1kick.width, P1kick.height);
    }

    if (p2punching) {
        ctx.fillStyle = P2punch.color;
        ctx.fillRect(player2.x + player2.width / 2 - P2punch.width, player2.y + player2.height / 3 - P2punch.height / 2, P2punch.width, P2punch.height);
    }

    if (p2kicking) {
        ctx.fillStyle = P2kick.color;
        ctx.fillRect(P2kick.x, P2kick.y, P2kick.width, P2kick.height);
    }

    if (P1block.active) {
        console.log("p1blocking");
        ctx.fillStyle = P1block.color;
        ctx.fillRect(P1block.x, P1block.y, P1block.width, P1block.height);
    }

    if (P2block.active) {
        ctx.fillStyle = P2block.color;
        ctx.fillRect(P2block.x, P2block.y, P2block.width, P2block.height);
    }

    ctx.fillStyle = player1.color;
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);

    ctx.fillStyle = player2.color;
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);

    if (document.getElementById("pausemenu").style.display === "none") {
        requestAnimationFrame(draw);
    }
}

function timer() {
    if (document.getElementById("pausemenu").style.display === "none") {
        if (time > 0) {
            time--;
            if (time < 100) {
                document.getElementById("timer_text").innerHTML = time;
            } else {
                document.getElementById("timer_text").innerHTML = "OL";
            }
        } else {
            document.getElementById("timer_text").innerHTML = "0";
            document.getElementById("timer").style.display = "none";
            document.getElementById("Player_info").style.display = "none";
            document.getElementById("pausemenu").style.display = "block";
            document.getElementById("pausemenu_content_header").innerHTML = "<H1>Tie!</H1>";
            document.getElementById("pausemenu_content_body").innerHTML = "<button>Play Again</button>";
            document.getElementById("pausemenu_content_body").onclick = function() {
                location.reload();
            };
        }
    }
    setTimeout(timer, 1000);
}

document.onkeydown = function(evt) {
    if (document.getElementById("pausemenu").style.display === "none") {
        if (!player1.dead && !player2.dead) {
            let key = evt.key;
            key = key.toLowerCase();
            //console.log(key);
            if (key === P2movementKeys.left) {
                left = true;
                player2.facing = "left";
            }
            if (key === P2movementKeys.right) {
                right = true;
                player2.facing = "right";
            }
            if (key === P2movementKeys.up) {
                if (!P2airborne) {
                    p2Jumping = true;
                    P2airborne = true;
                    jump("P2");
                }
            }
            if (key === P2movementKeys.down) {
                down = true;
                crouch();
            }
            if (key === P1movementKeys.left) {
                a = true;
                player1.facing = "left";
            }
            if (key === P1movementKeys.right) {
                d = true;
                player1.facing = "right";
            }
            if (key === P1movementKeys.up) {
                if (!P1airborne) {
                    p1Jumping = true;
                    P1airborne = true;
                    jump("P1");
                }
            }
            if (key === P1movementKeys.down) {
                s = true;
                crouch();
            }
            if (key === P1movementKeys.block) {
                if (!p1blocking) {
                    p1blocking = true;
                }
            }
            if (key === P1movementKeys.punch) {
                if (!p1punching && !p1kicking && !p1blocking) {
                    p1punching = true;
                    document.getElementById("Player1_info_move").innerHTML = "Punch";
                    punch("P1");
                }
            }
            if (key === P1movementKeys.kick) {
                if (!p1kicking && !p1punching && !p1blocking) {
                    p1kicking = true;
                    document.getElementById("Player1_info_move").innerHTML = "Kick";
                    kick("P1");
                }
            }
            if (key === P2movementKeys.kick) {
                if (!p2kicking && !p2punching && !p2blocking) {
                    p2kicking = true;
                    document.getElementById("Player2_info_move").innerHTML = "Kick";
                    kick("P2");
                }
            }
            if (key === P2movementKeys.punch) {
                if (!p2punching && !p2kicking && !p2blocking) {
                    p2punching = true;
                    document.getElementById("Player2_info_move").innerHTML = "Punch";
                    punch("P2");
                }
            }
            if (key === P2movementKeys.block) {
                if (!p2blocking && !p2kicking && !p2punching) {
                    p2blocking = true;
                }
            }
            if (key === extraKeys.addTime) {
                time = 100;
            }
        }
    }
}

document.onkeyup = function(evt) {
    let key = evt.key;
    key = key.toLowerCase();
    if (document.getElementById("pausemenu")) {
        if (document.getElementById("pausemenu").style.display === "none") {
            if (key === P2movementKeys.left) {
                left = false;
            }
            if (key === P2movementKeys.right) {
                right = false;
            }
            if (key === P2movementKeys.down) {
                down = false;
                crouch();
            }
            if (key === P1movementKeys.left) {
                a = false;
            }
            if (key === P1movementKeys.right) {
                d = false;
            }
            if (key === P1movementKeys.down) {
                s = false;
                crouch();
            }
            if (key === P1movementKeys.block) {
                p1blocking = false;
                P1block.active = false;
            }
            if (key === P2movementKeys.block) {
                p2blocking = false;
                P2block.active = false;
            }
            if (key === P1movementKeys.up) {
                p1Jumping = false;
            }
            if (key === P2movementKeys.up) {
                p2Jumping = false;
            }
        }
    }
    if (key === "escape" || key === extraKeys.pause) {
        pause();
    }
}

function move() {
    if (right) {
        if (player2.x < canvas.width - player2.width) {
            if (!P2airborne) {
                if (player2.crouching == true) {
                    player2.x += (player2.speed / 2) * (60 / fps);
                } else { player2.x += player2.speed * (60 / fps); }
            } else { player2.x += player2.speed * (60 / fps); }
        }
    }
    if (d) {
        if (player1.x < canvas.width - player1.width) {
            if (!P1airborne) {
                if (player1.crouching == true) {
                    player1.x += (player1.speed / 2) * (60 / fps);
                } else { player1.x += player1.speed * (60 / fps); }
            } else { player1.x += player1.speed * (60 / fps); }
        }
    }
    if (left) {
        if (player2.x > 0) {
            if (!P2airborne) {
                if (player2.crouching == true) {
                    player2.x -= (player2.speed / 2) * (60 / fps);
                } else { player2.x -= player2.speed * (60 / fps); }
            } else { player2.x -= player2.speed * (60 / fps); }
        }
    }
    if (a) {
        if (player1.x > 0) {
            if (!P1airborne) {
                if (player1.crouching == true) {
                    player1.x -= (player1.speed / 2) * (60 / fps);
                } else { player1.x -= player1.speed * (60 / fps); }
            } else { player1.x -= player1.speed * (60 / fps); }
        }
    }
}

function crouch() {
    if (s) {
        if (!player1.crouching) {
            player1.height = P1crouch;
            player1.y = player1.y + P1crouch;
        }
        player1.crouching = true;
    } else if (player1.crouching) {
        player1.crouching = false;
        player1.height = P1stand;
        player1.y = player1.y - player1.height / 2;
    }
    if (down) {
        if (!player2.crouching) {
            player2.height = P2crouch;
            player2.y = player2.y + P2crouch;
        }
        player2.crouching = true;
    } else if (player2.crouching) {
        player2.crouching = false;
        player2.height = P2stand;
        player2.y = player2.y - player2.height / 2;
    }
}

function block() {
    P1block.y = player1.y;
    P1block.height = player1.height;
    P2block.y = player2.y;
    P2block.height = player2.height;

    if (player1.facing === "left") {
        P1block.x = player1.x - P1block.width;
    } else if (player1.facing === "right") {
        P1block.x = player1.x + player1.width;
    }
    if (player2.facing === "left") {
        P2block.x = player2.x - P2block.width;
    } else if (player2.facing === "right") {
        P2block.x = player2.x + player2.width;
    }
    if (!p1kicking && !p1punching && p1blocking) {
        document.getElementById("Player1_info_move").innerHTML = "Block";
        P1block.active = true;
    }
    if (!p2kicking && !p2punching && p2blocking) {
        document.getElementById("Player2_info_move").innerHTML = "Block";
        P2block.active = true;
    }
}

function punch(who) {
    if (who === "P1") {
        if (player1.facing === "left") {
            P1punch.width = -P1punch.OGwidth;
        } else if (player1.facing === "right") {
            P1punch.width = P1punch.OGwidth;
        }
        setTimeout(function() {
            p1Attacking = false;
            p1punching = false;
        }, player1.punchspeed);
    }
    if (who === "P2") {
        if (player2.facing === "left") {
            P2punch.width = P2punch.OGwidth;
        } else if (player2.facing === "right") {
            P2punch.width = -P2punch.OGwidth;
        }
        setTimeout(function() {
            p2Attacking = false;
            p2punching = false;
        }, player2.punchspeed);
    }
}

function punchAttack(who) {
    if (who === "P1") {
        if (!p1Attacking) {
            if (P2block.active && player2.facing === "left" && player1.x + player1.width / 2 < player2.x + player2.width / 2 ||
                P2block.active && player2.facing === "right" && player1.x + player1.width / 2 > player2.x + player2.width / 2) {
                player2.health -= player1.power / 10 * 2;
            } else {
                player2.health -= player1.power;
            }
        }
    }
    if (who === "P2") {
        if (!p2Attacking) {
            if (P1block.active && player1.facing === "left" && player2.x + player2.width / 2 < player1.x + player1.width / 2 ||
                P1block.active && player1.facing === "right" && player2.x + player2.width / 2 > player1.x + player1.width / 2) {
                player1.health -= player2.power / 10 * 2;
            } else {
                player1.health -= player2.power;
            }
        }
    }
}

function kick(who) {
    if (who === "P1") {
        if (player1.facing === "left") {
            P1kick.width = -P1kick.OGwidth;
        } else if (player1.facing === "right") {
            P1kick.width = P1kick.OGwidth;
        }
        setTimeout(function() {
            p1Attacking = false;
            p1kicking = false;
        }, player1.kickspeed);
    }
    if (who === "P2") {
        if (player2.facing === "left") {
            P2kick.width = P2kick.OGwidth;
        } else if (player2.facing === "right") {
            P2kick.width = -P2kick.OGwidth;
        }
        setTimeout(function() {
            p2Attacking = false;
            p2kicking = false;
        }, player2.kickspeed);
    }
}

function kickAttack(who) {
    if (who === "P1") {
        if (!p1Attacking) {
            if (P2block.active && player2.facing === "left" && player1.x + player1.width / 2 < player2.x + player2.width / 2 ||
                P2block.active && player2.facing === "right" && player1.x + player1.width / 2 > player2.x + player2.width / 2) {
                player2.health -= player1.power / 10 * 2;
            } else {
                player2.health -= player1.power;
            }
        }
    }
    if (who === "P2") {
        if (!p2Attacking) {
            if (P1block.active && player1.facing === "left" && player2.x + player2.width / 2 < player1.x + player1.width / 2 ||
                P1block.active && player1.facing === "right" && player2.x + player2.width / 2 > player1.x + player1.width / 2) {
                player1.health -= player2.power / 10 * 2;
            } else {
                player1.health -= player2.power;
            }
        }
    }
}

function health() {
    P1kick.x = player1.x + player1.width / 2 - P1kick.width;
    P1kick.y = player1.y + player1.height / 3 * 2 - P1kick.height / 2;
    P2kick.x = player2.x + player2.width / 2 - P2kick.width;
    P2kick.y = player2.y + player2.height / 3 * 2 - P2kick.height / 2;
    P1punch.x = player1.x + player1.width / 2 - P1punch.width;
    P1punch.y = player1.y + player1.height / 3 - P1punch.height / 2;
    P2punch.x = player2.x + player2.width / 2 - P2punch.width;
    P2punch.y = player2.y + player2.height / 3 - P2punch.height / 2;
    if (player2.facing == "left") {
        if (player1.x < P2kick.x + P2kick.width && player1.x + player1.width > P2kick.x && player1.y < P2kick.y + P2kick.height && player1.y + player1.height > P2kick.y) {
            if (p2kicking) {
                kickAttack("P2");
                p2Attacking = true;
            }
        }
        if (player1.x < P2punch.x + P2punch.width && player1.x + player1.width > P2punch.x && player1.y < P2punch.y + P2punch.height && player1.y + player1.height > P2punch.y) {
            if (p2punching) {
                punchAttack("P2");
                p2Attacking = true;
            }
        }
    } else if (player2.facing == "right") {
        if (player1.x < P2kick.x && player1.x + player1.width > P2kick.x + P2kick.width && player1.y < P2kick.y + P2kick.height && player1.y + player1.height > P2kick.y) {
            if (p2kicking) {
                kickAttack("P2");
                p2Attacking = true;
            }
        }
        if (player1.x < P2punch.x && player1.x + player1.width > P2punch.x + P2punch.width && player1.y < P2punch.y + P2punch.height && player1.y + player1.height > P2punch.y) {
            if (p2punching) {
                punchAttack("P2");
                p2Attacking = true;
            }
        }
    }
    if (player1.facing == "left") {
        if (player2.x < P1kick.x + P1kick.width && player2.x + player2.width > P1kick.x && player2.y < P1kick.y + P1kick.height && player2.y + player2.height > P1kick.y) {
            if (p1kicking) {
                kickAttack("P1");
                p1Attacking = true;
            }
        }
        if (player2.x < P1punch.x + P1punch.width && player2.x + player2.width > P1punch.x && player2.y < P1punch.y + P1punch.height && player2.y + player2.height > P1punch.y) {
            if (p1punching) {
                punchAttack("P1");
                p1Attacking = true;
            }
        }
    } else if (player1.facing == "right") {
        if (player2.x < P1kick.x && player2.x + player2.width > P1kick.x + P1kick.width && player2.y < P1kick.y + P1kick.height && player2.y + player2.height > P1kick.y) {
            if (p1kicking) {
                kickAttack("P1");
                p1Attacking = true;
            }
        }
        if (player2.x < P1punch.x && player2.x + player2.width > P1punch.x + P1punch.width && player2.y < P1punch.y + P1punch.height && player2.y + player2.height > P1punch.y) {
            if (p1punching) {
                punchAttack("P1");
                p1Attacking = true;
            }
        }
    }

    if (player1.health <= 0) {
        player1.health = 0;
        player1.dead = true;
    }
    if (player2.health <= 0) {
        player2.health = 0;
        player2.dead = true;
    }

    document.getElementById("Player1_info_healthbar").style.width = 350 * (player1.health / player1.OGhealth) + "px";
    document.getElementById("Player2_info_healthbar").style.width = 350 * (player2.health / player2.OGhealth) + "px";
    document.getElementById("Player1_info_healthbar_bg").style.width = 350 * (player1.health / player1.OGhealth) + "px";
    document.getElementById("Player2_info_healthbar_bg").style.width = 350 * (player2.health / player2.OGhealth) + "px";

    if (player1.dead) {
        if (player1.height <= 0) {
            player1.height -= 5;
            player1.y += 5;
        }
    }
    if (player2.dead) {
        if (player2.height <= 0) {
            player2.height -= 5;
            player2.y += 5;
        }
    }
}

function jump(who) {
    if (who == "P1") {
        if (p1Jumping) {
            player1.yv = -jumpspeed - (player1.speed / 10) * (60 / fps);
            document.getElementById("Player1_info_move").innerHTML = "Jump";
        }
    }
    if (who == "P2") {
        if (p2Jumping) {
            document.getElementById("Player2_info_move").innerHTML = "Jump";
            player2.yv = -jumpspeed - (player2.speed / 10) * (60 / fps);
        }
    }
}

function gravity() {
    if (P1airborne) {
        if (player1.y <= ground.y - player1.height) {
            player1.y += player1.yv * (60 / fps);
            player1.yv += grav * (60 / fps);
            if (player1.y + player1.height > player2.y && player1.y + player1.height < player2.y + 10 &&
                player1.yv > 0 && player1.x + player1.width > player2.x && player1.x < player2.x + player2.width) {
                down = true;
                bonk.play();
                crouch();
                setTimeout(function() {
                    down = false;
                    crouch();
                    player2.health -= player1.power * 2;
                }, 100);
            }
        } else {
            P1airborne = false;
            player1.yv = 0;
            player1.y = ground.y - player1.height;
        }
    }
    if (P2airborne) {
        if (player2.y <= ground.y - player2.height) {
            player2.y += player2.yv;
            player2.yv += grav;
            if (player2.y + player2.height > player1.y && player2.y + player2.height < player1.y + 10 &&
                player2.yv > 0 && player2.x < player1.x + player1.width && player2.x + player2.width > player1.x) {
                s = true;
                bonk.play();
                crouch();
                setTimeout(function() {
                    s = false;
                    crouch();
                    player1.health -= player2.power * 2;
                }, 100);
            }
        } else {
            P2airborne = false;
            player2.yv = 0;
            player2.y = ground.y - player2.height;
        }
    }
}

function pause() {
    if (started) {
        pausemenu = document.getElementById("pausemenu");
        if (pausemenu.style.display === "block") {
            pausemenu.style.display = "none";
            draw();
        } else {
            pausemenu.style.display = "block";
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
            frame = 0;
            lastTime = now;
        };

        rAF(loop);
    }

    loop();
}