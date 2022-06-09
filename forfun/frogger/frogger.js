//Frogger med kuber i javascript
//Starter med å definere alle variablene som brukes mellom funksjoner

let frog = {
        "x": 6 * 46.7,
        "y": 12 * 46.7,
        "width": 40,
        "height": 40,
        "color": "#00cc00",
        "dead": false,
        "draw": function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    },
    froginner = {
        "x": frog.x + 2,
        "y": frog.y + 2,
        "width": 36,
        "height": 36,
        "color": "#121212",
        "draw": function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    },
    road = {
        "x": 0,
        "y": 7 * 46.7 - 2.1,
        "width": 600,
        "height": 5 * 46.7,
        "color": "#131313",
        "draw": function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    },
    ground = {
        "x": 0,
        "y": 6 * 46.7 - 4.2,
        "width": 600,
        "height": 7 * 46.7,
        "color": "#004400",
        "draw": function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    },
    froghouse = {
        "x": 0,
        "y": 0,
        "width": 600,
        "height": 1 * 46.7 - 4.2,
        "color": "#00bb00",
        "draw": function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    },
    walls1 = {
        "x": 1 * 46.7 - 1,
        "y": 0,
        "width": 2 * 46.7 - 4.2,
        "height": 1 * 46.7 - 4.2,
        "color": "brown",
        "draw": function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    },
    walls2 = {
        "x": 4 * 46.7 - 1,
        "y": 0,
        "width": 2 * 46.7 - 4.2,
        "height": 1 * 46.7 - 4.2,
        "color": "brown",
        "draw": function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    },
    walls3 = {
        "x": 7 * 46.7 - 1,
        "y": 0,
        "width": 2 * 46.7 - 4.2,
        "height": 1 * 46.7 - 4.2,
        "color": "brown",
        "draw": function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    },
    walls4 = {
        "x": 10 * 46.7 - 1,
        "y": 0,
        "width": 2 * 46.7 - 4.2,
        "height": 1 * 46.7 - 4.2,
        "color": "brown",
        "draw": function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    },
    turtleslong = [],
    roadlines = [],
    buggy = [],
    bulldozer = [],
    car = [],
    racecar = [],
    truck = [],
    movingfrog,
    grid,
    color,
    deadByTurtle = 5,
    drownTurtles,
    logbottom = [],
    logmid = [],
    turtlesshort = [],
    logtop = [],
    winningfrog = [],
    timer = 90,
    points = 0,
    health = 3,
    jerkwad = true,
    keepAnimationGoing = true,
    gameOver = false,
    dickButt = 1,
    logMargin = 20,
    enemyMargin = 10,
    rotate = 0;

function reset() {
    //En god reset funksjon som kjører på hver død og seier
    keepAnimationGoing = false
    frog.x = 6 * 46.7;
    frog.y = 12 * 46.7;
    froginner.x = frog.x + 2;
    froginner.y = frog.y + 2;
    gameOver = false;
    if (gameOver == false) {
        setTimeout(function() {
            keepAnimationGoing = true;
            jerkwad = true;
            moveenemies();
            createenemies();
            createwaterstuff();
        }, 100);
    }
}

function startfrogger() {
    //Setter i gang hele spillet. Startes fra HTML dokumentet.
    canvas = document.getElementById("spacecanvas")
    ctx = canvas.getContext('2d');
    highScore();
    drawfrog();
}

function creategrid() {
    //Mest brukt i forbindelse med regning av hvor stort spilleområdet skulle være
    //og hvor mye frosken skulle kunne bevege seg. Lar ligge igjen fordi den
    //viser en del av prosessen
    for (let j = 0; j < 14; j++) {
        for (let i = 0; i < 14; i++) {
            if (j >= 1 && j <= 5 || j >= 7 && j <= 11) {
                ctx.fillStyle = "#ff000088";
            } else {
                ctx.fillStyle = "#0000ff88";
            }
            ctx.fillRect((i * 42) + (i * 4.7), (j * 42) + (j * 4.7), 40, 40);
        }
    }
}

function drawfrog() {
    //Funksjonen som tegner alt som skal til i spillområdet
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    froginner.x = frog.x + 2;
    froginner.y = frog.y + 2;

    froghouse.draw();
    walls1.draw();
    walls2.draw();
    walls3.draw();
    walls4.draw();
    ground.draw();
    road.draw();
    createdetails();
    if (grid) {
        creategrid();
    }
    for (let i = 0; i < buggy.length; i++) {
        //Alle fartøyene har samme lengde på arrayet, så det er krever færre
        //linjer å lage en for løkke for en av array lengdene enn for alle
        //buggy[i].draw();
        let driftCar = new Image();
        driftCar.src = "../../Bilder/Sprite/Vehicles/Frogger/vehicle_1.png";
        ctx.translate(buggy[i].x + 20, buggy[i].y + 20);
        ctx.drawImage(driftCar, -20, -20, 40, 40);
        ctx.translate(-buggy[i].x - 20, -buggy[i].y - 20);
        //bulldozer[i].draw();
        let bulldozers = new Image();
        bulldozers.src = "../../Bilder/Sprite/Vehicles/Frogger/vehicle_3.png";
        ctx.translate(bulldozer[i].x + 20, bulldozer[i].y + 20);
        ctx.drawImage(bulldozers, -20, -20, 40, 40);
        ctx.translate(-bulldozer[i].x - 20, -bulldozer[i].y - 20);
        //car[i].draw();
        let cars = new Image();
        cars.src = "../../Bilder/Sprite/Vehicles/Frogger/vehicle_0.png";
        ctx.translate(car[i].x + 20, car[i].y + 20);
        ctx.drawImage(cars, -20, -20, 42, 40);
        ctx.translate(-car[i].x - 20, -car[i].y - 20);
        //racecar[i].draw();
        let redCar = new Image();
        redCar.src = "../../Bilder/Sprite/Vehicles/Frogger/vehicle_2.png";
        ctx.translate(racecar[i].x + 20, racecar[i].y + 20);
        ctx.drawImage(redCar, -20, -20, 40, 40);
        ctx.translate(-racecar[i].x - 20, -racecar[i].y - 20);
        //truck[i].draw();
        let trucks = new Image();
        trucks.src = "../../Bilder/Sprite/Vehicles/Frogger/vehicle_4.png";
        ctx.translate(truck[i].x + 20, truck[i].y + 20);
        ctx.drawImage(trucks, -20, -20, 90, 40);
        ctx.translate(-truck[i].x - 20, -truck[i].y - 20);
    }
    for (let i = 0; i < turtleslong.length; i++) {
        //Denne tegner inn alle de forskjellige skilpaddene og stokkene
        //slik at frosken trygt kommer over til huset sitt
        turtleslong[i].draw();
        logbottom[i].draw();
        turtlesshort[i].draw();
    }
    for (let i = 0; i < logtop.length - 1; i++) {
        logtop[i].draw();
    }
    for (let i = 0; i < logmid.length; i++) {
        //Denne tegner inn de midterste stokkene siden de har en annen 
        //lengde enn resten av stokkene
        logmid[i].draw();
    }
    if (winningfrog) {
        //Denne funksjonen tegner inn den svarte boksen som dukker opp
        //I hver av de grønne feltene man må inn for å vinne.
        //Den indikerer hvilke du har vært innom og hvor mange som er igjen.
        for (let i = 0; i < winningfrog.length; i++) {
            winningfrog[i].draw();
        }
    }
    //frog.draw();
    //froginner.draw();
    img = new Image();
    img.src = '../../Bilder/Sprite/Frog/Frog.png';
    ctx.translate(frog.x + 20, frog.y + 20);
    ctx.rotate(.1 * rotate * Math.PI);
    ctx.drawImage(img, -20, -20, 40, 40);
    ctx.rotate(-.1 * rotate * Math.PI);
    ctx.translate(-frog.x - 20, -frog.y - 20);
    checkfrogposition();
    movingfrog = false;
}

function gridt() {
    //Denne funksjonen sjekker om du vil tegne inn et rutenett eller ikke
    if (grid) {
        grid = false;
    } else {
        grid = true;
    }
    drawfrog();
}

document.onkeydown = function(e) {
    //Sjekker hvilke taster du trykker på. Så lenge du ikke er død selvfølgelig
    if (frog.dead == false) {
        if (movingfrog == false) {
            //I reset stadiet har du to sekunder hvor frosken ikke er på skjermen.
            //Dermed ville jeg ikke la deg ha muligheten til å bevege deg.
            //I dette stadiet mister du muligheten til å bevege på frosken.
            setTimeout(() => {
                movingfrog = true;
                if (e.keyCode == 37 || e.keyCode == 65) {
                    if (frog.x > 10) {
                        frog.x -= 46.7;
                        rotate = 15;
                    }
                } else if (e.keyCode == 38 || e.keyCode == 87) {
                    if (frog.y > 10) {
                        frog.y -= 46.7;
                        rotate = 0;
                    }
                } else if (e.keyCode == 39 || e.keyCode == 68) {
                    if (frog.x < 550) {
                        frog.x += 46.7;
                        rotate = 5;
                    }
                } else if (e.keyCode == 40 || e.keyCode == 83) {
                    if (frog.y < 550) {
                        frog.y += 46.7;
                        rotate = 10;
                    }
                } else if (e.keyCode == 32) {
                    jerkwad = false;
                    gameOver = false;
                    reset();
                    health = 3;
                    points = 0;
                    timer = 90;
                    document.getElementById("spacecanvas").style.backgroundColor = "#073385";
                    document.getElementById("points").innerHTML = points;
                    moveenemies();
                } else if (e.keyCode == 82) {
                    rotate++;
                }
                if (frog.x < 0) {
                    frog.x = 0;
                }
                froginner.x = frog.x + 2;
                froginner.y = frog.y + 2;
                frog.x = Math.round((frog.x) * 10) / 10;
                frog.y = Math.round((frog.y) * 10) / 10;
            }, 80);
            //Har en timeout som hindrer frosken i å bevege seg for raskt, og har en liten
            //delay slik at frosk-kuben føles ut som frosken i originalspillet.
            //Denne hopper med en animasjon som senker bevegelseshastigheten.
        }
    }
}

function checkfrogposition() {
    //Denne funksjonen sjekker både om frosken rører ett av fartøyene
    //og om frosken er innom husene.
    //Denne funksjonen kan enten drepe frosken, eller belønne frosken.
    for (let i = 0; i < buggy.length; i++) {
        if (frog.x > buggy[i].x - buggy[i].width + enemyMargin && frog.x < buggy[i].x + buggy[i].width - enemyMargin && frog.y == buggy[i].y) {
            //For både tømmerstokkene og fartøyene har jeg lagt til en liten
            //margin som gjør spillet lettere og slik at du har mer tid til å
            //reagere på hindringene. Denne margingn blir stadig mindre, helt
            //til den blir lik 0, og spillet blir på sitt nesten vanskeligste nivå.
            killfrog();
            createenemies();
        } else if (frog.x > bulldozer[i].x - bulldozer[i].width + enemyMargin && frog.x < bulldozer[i].x + bulldozer[i].width - enemyMargin && frog.y == bulldozer[i].y) {
            killfrog();
            createenemies();
        } else if (frog.x > car[i].x - car[i].width + enemyMargin && frog.x < car[i].x + car[i].width - enemyMargin && frog.y == car[i].y) {
            killfrog();
            createenemies();
        } else if (frog.x > racecar[i].x - racecar[i].width + enemyMargin && frog.x < racecar[i].x + racecar[i].width - enemyMargin && frog.y == racecar[i].y) {
            killfrog();
            createenemies();
        } else if (frog.x > truck[i].x - frog.width + enemyMargin && frog.x < truck[i].x + truck[i].width - enemyMargin && frog.y == truck[i].y) {
            killfrog();
            createenemies();
        }
    }
    for (let i = 0; i < 5; i++) {
        if (frog.y < 1 * 46.7) {
            if (frog.x >= i * 3 * 46.7 - 20 && frog.x <= i * 3 * 46.7 + 23.35) {
                deadByTurtle = 30;
                winfrog(i * 3 * 46.7 - 5, i * 3 * 46.7 + 46.7);
            } else {
                deadByTurtle -= 1;
                if (deadByTurtle == 0) {
                    killfrog();
                }
            }
        }
    }
}

function endGame() {
    //Om du mister alle livene, eller om tida går ut, sitter du igjen på
    //denne svarte skjermen som lar deg tilbakestille spillet.
    //Den har en liten delay, slik at den ikke kommer før etter reset funskjonen
    //tegnet inn i canvasen. Den siste som tegner overskriver alt annet,
    //så det er best om det du vil vise tegnes sist.
    if (gameOver) {
        dickButt = 1;
        jerkwad = false;
        setTimeout(() => {
            jerkwad = false;
            document.getElementById("spacecanvas").style.backgroundColor = "#000000";
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#b2b2b2";
            ctx.font = "30px Arial";
            ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
            ctx.font = "20px Arial";
            ctx.fillText("Press Space to Restart", canvas.width / 2 - 100, canvas.height / 2 + 30);
            ctx.stroke();
            winningfrog.length = 0;
            highScore();
        }, 2100);
    }
}

function highScore() {
    //Denne funksjonen sjekker om du har fått et nytt høyeste poengsum.
    //highscoren din vil vises som den høyeste poengsummen du har fått
    if (localStorage.getItem("hsasgtesf445&234") == null) {
        localStorage.setItem("hsasgtesf445&234", points);

    } else if (points >= localStorage.getItem("hsasgtesf445&234")) {
        localStorage.setItem("hsasgtesf445&234", points);
    }
    document.getElementById("highscore").innerHTML = localStorage.getItem("hsasgtesf445&234");
}

function killfrog() {
    //killfrog sier vel seg selv. Dreper frosken om du gjør noe galt.
    if (frog.dead == false) {
        console.error("Uncaught ReferenceError:    " +
            "You get no bitches (" + "%cfrogger.js:53:62" +
            "%c)", "color: white;", "");
        frog.dead = true;
        frog.x = 700;
        frog.y = 700;

        health--;

        if (health < 0) {
            gameOver = true;
            endGame();
        }

        drawfrog();
        setTimeout(() => {
            frog.x = 6 * 46.7;
            frog.y = 12 * 46.7;
            drawfrog();
            frog.dead = false;
        }, 2000);
    }
}

function winfrog(left, right) {
    //Denne funksjonen sier vel seg selv.
    //Denne funksjonen tilbakestiller frosken til startposisjonen, og
    //legger en svart boks der du gikk for å vinne.
    //Slik vet du hvor du har vært

    frog.dead = true;

    if (winningfrog.length > 0) {
        for (let i = 0; i < winningfrog.length; i++) {
            if (winningfrog[i].x == left) {
                killfrog();
            } else {
                winningfrog.push({
                    x: left,
                    y: 0 * 46.7,
                    width: right - left,
                    height: 42,
                    draw: function() {
                        ctx.fillStyle = "black";
                        ctx.fillRect(this.x, this.y, this.width, this.height);
                    }
                });
            }
        }
        if (winningfrog.length == 16) {
            console.log("You win!");
            completelywin();
        }
    } else {
        winningfrog.push({
            x: left,
            y: 0 * 46.7,
            width: right - left,
            height: 42,
            draw: function() {
                ctx.fillStyle = "black";
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        });
        console.log("You win!");
    }

    points += 10;
    highScore();
    document.getElementById("points").innerHTML = points;

    frog.x = 700;
    frog.y = 700;
    drawfrog();
    setTimeout(() => {
        frog.x = 6 * 46.7;
        frog.y = 12 * 46.7;
        drawfrog();
        frog.dead = false;
    }, 2000);
}

function completelywin() {
    //Denne funksjonen forekommer når du har fylt opp alle fem punktene
    //på toppen av skjermen.
    //Den tilbakestiller frosken, og øker vanskelighetsgraden litt for hver gang
    //Fram til farta for objektene er 4x så stor, så vil den øke med 0.2
    //Fram til Sikkerhetsmarginen for stokkene er lik 0, vil den synke med 1px fra 20px
    winningfrog.length = 0;
    timer += 70;
    if (timer > 100) {
        //For å ikke gi spilleren for god, begrenser jeg tiden til 100 sekunder maks
        timer = 100;
    }
    points += 100;
    if (health < 10) {
        health++;
    } else {
        health = 10;
    }
    if (dickButt < 4) {
        dickButt += .2;
    }
    if (logMargin < 0) {
        logMargin -= 1;
    }
    if (enemyMargin < 0) {
        enemyMargin -= 1;
    }
    document.getElementById("points").innerHTML = points;
}

function adaptSpeed() {
    //Alt inne i denne funksjonen er kopiert fra nettet.
    //Denne funksjonen regulerer hastigheten på alle objektene til å være like
    //uansett hvor raskt frekvensen på skjermen din er
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
    var lastTime = Date.now();
    var lastFameTime = Date.now();

    var loop = function() {
        var now = Date.now();
        var fs = (now - lastFameTime);
        fps = Number(Math.round(1000 / fs));

        lastFameTime = now;
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

function createdetails() {
    //Denne funksjonen legger til veilinjene som skiller filene
    //Den er bare for å gjøre det lettere å se hva som skjer
    roadlines.length = 0;
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 6; i++) {
            roadlines.push({
                "x": (80 * i) + (20 * i) + 10,
                "y": ((j * 1) + 8) * 46.7 - 5.025,
                "width": 80,
                "height": 3.35,
                "color": "lightgray",
                "draw": function() {
                    ctx.fillStyle = this.color;
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                }
            });
        }
    }
    spawndetails();
}

function spawndetails() {
    //Denne funksjonen legger til objektene som skal vises på skjermen
    //Fra detalj funksjonen
    for (let i = 0; i < roadlines.length; i++) {
        roadlines[i].draw();
    }
}

function createenemies() {
    //Denne funksjonen legger til fiendene som skal vises på skjermen
    //Funskjonen lager dem og gir dem en posisjon på banen
    buggy.length = 0;
    bulldozer.length = 0;
    car.length = 0;
    racecar.length = 0;
    truck.length = 0;
    for (let i = 0; i < 4; i++) {
        buggy.push({
            "x": (80 * i) + ((Math.floor(Math.random() * 80) + 80) * i),
            "y": 11 * 46.7,
            "width": 40,
            "height": 40,
            "color": "red",
            "draw": function() {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        });
        bulldozer.push({
            "x": (80 * i) + ((Math.floor(Math.random() * 80) + 80) * i),
            "y": 10 * 46.7,
            "width": 40,
            "height": 40,
            "color": "yellow",
            "draw": function() {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        });
        car.push({
            "x": (80 * i) + ((Math.floor(Math.random() * 80) + 80) * i),
            "y": 9 * 46.7,
            "width": 40,
            "height": 40,
            "color": "pink",
            "draw": function() {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        });
        racecar.push({
            "x": (80 * i) + ((Math.floor(Math.random() * 80) + 80) * i),
            "y": 8 * 46.7,
            "width": 40,
            "height": 40,
            "color": "darkred",
            "draw": function() {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        });
        truck.push({
            "x": (80 * i) + ((Math.floor(Math.random() * 80) + 80) * i),
            "y": Math.round((7 * 46.7) * 10) / 10,
            "width": 90,
            "height": 40,
            "color": "gray",
            "draw": function() {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        });
    }
}

function moveenemies() {
    //Funksjonen beveger fiendene og passer på at de ikke forsvinner for alltid av skjermen
    //Samtidig så passer den på at detaljene ikke blir for rare.
    for (let i = 0; i < buggy.length; i++) {
        buggy[i].x -= .5 * (60 / fps) * dickButt;
        if (buggy[i].x < -40) {
            buggy[i].x = Math.floor(Math.random() * 400) + 600;
        }
        bulldozer[i].x += .6 * (60 / fps) * dickButt;
        if (bulldozer[i].x > 600) {
            bulldozer[i].x = Math.floor(Math.random() * 400) - 600;
        }
        car[i].x -= .7 * (60 / fps) * dickButt;
        if (car[i].x < -40) {
            car[i].x = Math.floor(Math.random() * 400) + 600;
        }
        racecar[i].x += 2 * (60 / fps) * dickButt;
        if (racecar[i].x > 600) {
            racecar[i].x = Math.floor(Math.random() * 400) - 600;
        }
        truck[i].x -= .9 * (60 / fps) * dickButt;
        if (truck[i].x < -90) {
            truck[i].x = Math.floor(Math.random() * 400) + 600;
        }
    }
    checkForBug();
    movewaterstuff();
    drawfrog();
    timebar();
    if (gameOver == false) {
        if (keepAnimationGoing) {
            requestAnimationFrame(moveenemies);
        }
    }
}

function checkForBug() {
    //Hver gang jeg har vært i en annen fane lenge, så kom tilbake til denne
    //hadde tømmerstokkene stilt seg oppå hverandre slik at det bare var en stor en hver gang.
    //Denne funksjonen passer på at dersom de er på hverandre, så tilbakestiller posisjonene
    //seg, slik at spillet fungerer som det skal
    if (turtleslong[0].x == turtleslong[1].x) {
        reset();
        let Anus = Math.floor(Math.random() * 3) + 1;
        if (Anus == 1) {
            console.log("There was a bug. " + Anus + " bug squashed!");
        } else {
            console.log("There were bugs. " + Anus + " bugs squashed!");
        }
    }
}

function createwaterstuff() {
    //De hjelpemidlene som befinner seg på vannet kommer av denne funksjonen som 
    //lager de i en array hver. 
    turtleslong.length = 0;
    logbottom.length = 0;
    logmid.length = 0;
    turtlesshort.length = 0;
    logtop.length = 0;
    for (let i = 0; i < 5; i++) {
        turtleslong.push({
            "x": (90 * i) + (90 * i),
            "y": (5 * 46.7),
            "width": 140.1 - 6.7,
            "height": 40,
            "color": "#005b00",
            "draw": function() {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        });
        logbottom.push({
            "x": ((93.4 - 6.7) * i) + ((93.4 - 6.7) * i),
            "y": (4 * 46.7),
            "width": 93.4 - 6.7,
            "height": 40,
            "color": "#964b00",
            "draw": function() {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        });
        turtlesshort.push({
            "x": (90 * i) + (90 * i),
            "y": Math.floor((2 * 46.7) * 10) / 10,
            "width": 90,
            "height": 40,
            "color": "#005b00",
            "draw": function() {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        });
        logtop.push({
            "x": ((93.4 - 6.7) * i) + ((117) * i),
            "y": Math.floor((1 * 46.7) * 10) / 10,
            "width": 130.4 - 6.7,
            "height": 40,
            "color": "#964b00",
            "draw": function() {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        });
    }
    for (let i = 0; i < 3; i++) {
        logmid.push({
            "x": ((186.8 - 6.7) * i) + ((93.4 - 6.7) * i),
            "y": Math.floor((3 * 46.7) * 10) / 10,
            "width": 186.8 - 6.7,
            "height": 40,
            "color": "#964b00",
            "draw": function() {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        })

    }
}

function movewaterstuff() {
    //Hjelpemidlene på vannet beveges ved hjelp av denne funksjonen
    for (let i = 0; i < turtleslong.length; i++) {
        turtleslong[i].x -= 1.5 * (60 / fps) * dickButt;
        if (turtleslong[i].x < -140.1) {
            turtleslong[i].x = 16 * 46.7 + 6.7 * 2;
        }
    }
    for (let i = 0; i < logbottom.length; i++) {
        logbottom[i].x += .5 * (60 / fps) * dickButt;
        if (logbottom[i].x > 15 * 46.7 + 6.7 * 2) {
            logbottom[i].x = -140.1;
        }
    }
    for (let i = 0; i < turtlesshort.length; i++) {
        turtlesshort[i].x -= .8 * (60 / fps) * dickButt;
        if (turtlesshort[i].x < -90) {
            turtlesshort[i].x = 16 * 46.7 + 6.7 * 2;
        }
    }
    for (let i = 0; i < logmid.length; i++) {
        logmid[i].x += 1 * (60 / fps) * dickButt;
        if (logmid[i].x > 600) {
            logmid[i].x = -186.1;
        }
    }
    for (let i = 0; i < logtop.length; i++) {
        logtop[i].x += 1.2 * (60 / fps) * dickButt;
        if (logtop[i].x > 600) {
            logtop[i].x = -186.1;
        }
    }
    moveFrogWithWaterStuff();
}

function moveFrogWithWaterStuff() {
    //Denne funksjonen passer på at den lille kjære frosken beveger seg sidelengs med
    //objektene i vannet, slik at de ikke drukner frosken.
    if (frog.y > (0 * 46.7) && frog.y <= (5 * 46.7)) {
        for (let i = 0; i < turtleslong.length; i++) {
            if (frog.y == turtleslong[i].y) {
                if (frog.x >= turtleslong[i].x - logMargin && frog.x <= turtleslong[i].x + turtleslong[i].width - frog.width + logMargin) {
                    //frog.x = turtleslong[i].x;
                    frog.x -= 1.5 * (60 / fps) * dickButt;
                    deadByTurtle = 30;
                } else {
                    deadByTurtle -= 1;
                    if (deadByTurtle == 0) {
                        killfrog();
                    }
                }
            } else if (frog.y == logbottom[i].y) {
                if (frog.x >= logbottom[i].x - logMargin && frog.x <= logbottom[i].x + logbottom[i].width - frog.width + logMargin) {
                    frog.x += .5 * (60 / fps) * dickButt;
                    deadByTurtle = 30;
                } else {
                    deadByTurtle -= 1;
                    if (deadByTurtle == 0) {
                        killfrog();
                    }
                }
            } else if (frog.y == logmid[Math.round(i / 4 * 2)].y) {
                if (frog.x >= logmid[Math.round(i / 4 * 2)].x - logMargin && frog.x <= logmid[Math.round(i / 4 * 2)].x + logmid[Math.round(i / 4 * 2)].width - frog.width + logMargin) {
                    let speed = 1 * (60 / fps) * dickButt;
                    if (i == 0) {
                        speed = 1 * (60 / fps) * dickButt;
                    } else {
                        speed = (1 * (60 / fps) * dickButt) / 2;
                    }
                    frog.x += speed;
                    deadByTurtle = 30;
                } else {
                    deadByTurtle -= 1;
                    if (deadByTurtle == 0) {
                        killfrog();
                    }
                }
            } else if (frog.y == turtlesshort[i].y) {
                if (frog.x >= turtlesshort[i].x - logMargin && frog.x <= turtlesshort[i].x + turtlesshort[i].width - frog.width + logMargin) {
                    frog.x -= .8 * (60 / fps) * dickButt;
                    deadByTurtle = 30;
                } else {
                    deadByTurtle -= 1;
                    if (deadByTurtle == 0) {
                        killfrog();
                    }
                }
            } else if (frog.y == logtop[i].y) {
                if (frog.x >= logtop[i].x - logMargin && frog.x <= logtop[i].x + logtop[i].width - frog.width + logMargin) {
                    frog.x += 1.2 * (60 / fps) * dickButt;
                    deadByTurtle = 30;
                } else {
                    deadByTurtle -= 1;
                    if (deadByTurtle == 0) {
                        killfrog();
                    }
                }
            } else {
                deadByTurtle -= 1;
                if (deadByTurtle == 0) {
                    killfrog();
                }
            }
        }
    }
}

function starttimer() {
    //Denne funksjonen står for Timeren som forårsaker spillet til å
    //ha en form for hast som får spilleren til å føle at det er mer på spill.
    setInterval(function() {
        if (jerkwad) {
            healthInFrogs();
            timer--;
            if (timer == 0) {
                gameOver = true;
                endGame();
            } else if (timer >= 101) {
                timer = 1;
                alert("Ikke juks din tulling");
            }
        }
    }, 1000);
}

function timebar() {
    //Denne funksjonen viser tiden som en linje som krymper til den blir 0

    document.getElementById("time").style.width = timer * 3 + "px";
}

function healthInFrogs() {
    //Denne funksjonen viser hvor mange liv som er igjen
    document.getElementById("health").innerHTML = "";
    if (health <= 5) {
        for (let i = 0; i < health; i++) {
            document.getElementById("health").innerHTML += "<img src='../../Bilder/Sprite/Frog/frog.png' width='35px' class='frog'>&nbsp";
        }
    } else if (health > 5) {
        for (let i = 0; i < 6; i++) {
            if (i < 5) {
                document.getElementById("health").innerHTML += "<img src='../../Bilder/Sprite/Frog/frog.png' width='35px' class='froggerimg'>&nbsp";
            }
            if (i == 5) {
                document.getElementById("health").innerHTML += "+ " + (health - 5);
            }
        }
    }
    if (health > 10) {
        timer = 1;
        alert("Ikke juks din tulling");
    }
}