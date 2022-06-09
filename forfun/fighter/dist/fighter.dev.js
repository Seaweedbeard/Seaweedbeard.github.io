"use strict";

function intro() {
  document.getElementById("intro").style.display = "block";
}

function selectChar(name) {
  if (!player1) {
    player1 = characters1[name];
    document.getElementById("playerchoosing").innerHTML = "Player 2:";
    console.log("player1: " + player1.name);
  } else {
    player2 = characters2[name];
    console.log("player2: " + player2.name);
    document.getElementById("chargrid").style.display = "none";
    var imgp1 = document.createElement('img');
    imgp1.src = player1.img;
    var imgp2 = document.createElement('img');
    imgp2.src = player2.img;
    document.getElementById("startmenu_char_selection_title").innerHTML = "<H2>" + imgp1.outerHTML + " VS " + imgp2.outerHTML + "</H2>"; //document.getElementById("startmenu_char_selection_title").innerHTML = "<H2>" + player1.name + " vs " + player2.name + "</h2>";

    document.getElementById("charinfo").style.display = "none";
  }
}

function showinfo(name) {
  document.getElementById("charinfo_content_name_p").innerHTML = name;
  document.getElementById("charinfo_content_stats_hp_p").innerHTML = characters1[name].health;
  document.getElementById("charinfo_content_stats_power_p").innerHTML = characters1[name].power;
  document.getElementById("charinfo_content_stats_speed_p").innerHTML = characters1[name].speed;
}

function setup() {
  if (player2) {
    document.getElementById("startmenu").style.display = "none";
    document.getElementById("pausemenu").style.display = "none";
    document.getElementById("Player_info").style.display = "absolute";
    document.getElementById("Player1_info").innerHTML = player1.name;
    document.getElementById("Player2_info").innerHTML = player2.name;
    started = true;
    P1crouch = player1.height / 2;
    P1stand = player1.height;
    P2crouch = player2.height / 2;
    P2stand = player2.height;
    player1.facing = "right";
    player2.facing = "left";
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    player1.x = 50;
    player1.y = ground.y - player1.height;
    player2.x = canvas.width - player2.width - 50;
    player2.y = ground.y - player2.height;
    draw();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  move();
  gravity();
  ctx.fillStyle = ground.color;
  ctx.fillRect(ground.x, ground.y, ground.width, ground.height);

  if (p1punching) {
    ctx.fillStyle = P1punch.color;
    ctx.fillRect(player1.x + player1.width / 2 - P1punch.width, player1.y + player1.height / 3 - P1punch.height / 2, P1punch.width, P1punch.height);
  }

  if (p2punching) {
    ctx.fillStyle = P2punch.color;
    ctx.fillRect(player2.x + player2.width / 2 - P2punch.width, player2.y + player2.height / 3 - P2punch.height / 2, P2punch.width, P2punch.height);
  }

  ctx.fillStyle = player1.color;
  ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
  ctx.fillStyle = player2.color;
  ctx.fillRect(player2.x, player2.y, player2.width, player2.height);

  if (document.getElementById("pausemenu").style.display === "none") {
    requestAnimationFrame(draw);
  }
}

document.onkeydown = function (evt) {
  if (document.getElementById("pausemenu").style.display === "none") {
    var key = evt.key;
    key = key.toLowerCase();

    if (key === "arrowleft") {
      left = true;
      player2.facing = "left";
    }

    if (key === "arrowright") {
      right = true;
      player2.facing = "right";
    }

    if (key === "arrowup") {
      if (!P2airborne) {
        P2airborne = true;
        jump("P2");
      }
    }

    if (key === "arrowdown") {
      down = true;
      crouch();
    }

    if (key === "a") {
      a = true;
      player1.facing = "left";
    }

    if (key === "d") {
      d = true;
      player1.facing = "right";
    }

    if (key === "w") {
      if (!P1airborne) {
        P1airborne = true;
        jump("P1");
      }
    }

    if (key === "s") {
      s = true;
      crouch();
    }

    if (key === "g") {
      if (!p1punching) {
        p1punching = true;
        punch("P1");
      }
    }

    if (key === "k") {
      if (!p2punching) {
        p2punching = true;
        punch("P2");
      }
    }
  }
};

document.onkeyup = function (evt) {
  var key = evt.key;
  key = key.toLowerCase();

  if (document.getElementById("pausemenu").style.display === "none") {
    if (key === "arrowleft") {
      left = false;
    }

    if (key === "arrowright") {
      right = false;
    }

    if (key === "arrowdown") {
      down = false;
      crouch();
    }

    if (key === "a") {
      a = false;
    }

    if (key === "d") {
      d = false;
    }

    if (key === "s") {
      s = false;
      crouch();
    }
  }

  if (key === "escape" || key === "p") {
    pause();
  }
};

function move() {
  if (right) {
    if (player2.x < canvas.width - player2.width) {
      if (!P2airborne) {
        if (player2.crouching == true) {
          player2.x += player2.speed / 2 * (60 / fps);
        } else {
          player2.x += player2.speed * (60 / fps);
        }
      } else {
        player2.x += player2.speed * (60 / fps);
      }
    }
  }

  if (d) {
    if (player1.x < canvas.width - player1.width) {
      if (!P1airborne) {
        if (player1.crouching == true) {
          player1.x += player1.speed / 2 * (60 / fps);
        } else {
          player1.x += player1.speed * (60 / fps);
        }
      } else {
        player1.x += player1.speed * (60 / fps);
      }
    }
  }

  if (left) {
    if (player2.x > 0) {
      if (!P2airborne) {
        if (player2.crouching == true) {
          player2.x -= player2.speed / 2 * (60 / fps);
        } else {
          player2.x -= player2.speed * (60 / fps);
        }
      } else {
        player2.x -= player2.speed * (60 / fps);
      }
    }
  }

  if (a) {
    if (player1.x > 0) {
      if (!P1airborne) {
        if (player1.crouching == true) {
          player1.x -= player1.speed / 2 * (60 / fps);
        } else {
          player1.x -= player1.speed * (60 / fps);
        }
      } else {
        player1.x -= player1.speed * (60 / fps);
      }
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

function punch(who) {
  if (who === "P1") {
    if (player1.facing === "left") {
      P1punch.width = 150;
    } else if (player1.facing === "right") {
      P1punch.width = -150;
    }

    setTimeout(function () {
      p1punching = false;
    }, player1.punchspeed);
  }

  if (who === "P2") {
    if (player2.facing === "left") {
      P2punch.width = 150;
    } else if (player2.facing === "right") {
      P2punch.width = -150;
    }

    setTimeout(function () {
      p2punching = false;
    }, player2.punchspeed);
  }
}

function jump(who) {
  if (who == "P1") {
    player1.yv = -10 * (60 / fps);
  }

  if (who == "P2") {
    player2.yv = -10 * (60 / fps);
  }
}

function gravity() {
  if (P1airborne) {
    if (player1.y <= ground.y - player1.height) {
      player1.y += player1.yv * (60 / fps);
      player1.yv += grav * (60 / fps);
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
  var rAF = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  }();

  var frame = 0;
  var allFrameCount = 0;
  var lastTime = Date.now();
  var lastFameTime = Date.now();

  var loop = function loop() {
    var now = Date.now();
    var fs = now - lastFameTime;
    fps = Number(Math.round(1000 / fs));
    lastFameTime = now;
    allFrameCount++;
    frame++;

    if (now > 1000 + lastTime) {
      fps = Number(Math.round(frame * 1000 / (now - lastTime)));
      frame = 0;
      lastTime = now;
    }

    ;
    rAF(loop);
  };

  loop();
}