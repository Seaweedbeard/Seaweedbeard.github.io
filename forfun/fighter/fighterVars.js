let canvas,
    ctx,
    started = false,
    pausemenu,
    characters1 = {
        Ruben: {
            x: 0,
            y: 0,
            yv: 0,
            width: 50,
            height: 200,
            speed: 7,
            power: 5,
            color: "green",
            name: "Ruben",
            health: 320,
            OGhealth: 320,
            crouching: false,
            punchspeed: 300,
            kickspeed: 450,
            dead: false,
            facing: "right",
            img: "../../Bilder/Sprite/characters/ruben.jpg"
        },
        Stian: {
            x: 0,
            y: 0,
            yv: 0,
            width: 50,
            height: 185,
            speed: 3,
            power: 9,
            color: "blue",
            name: "Stian",
            health: 500,
            OGhealth: 500,
            crouching: false,
            punchspeed: 700,
            kickspeed: 800,
            dead: false,
            facing: "right",
            img: "../../Bilder/Sprite/characters/Stæn.jpg"
        },
        Halvor: {
            x: 0,
            y: 0,
            yv: 0,
            width: 50,
            height: 194,
            speed: 5,
            power: 7,
            color: "red",
            name: "Halvor",
            health: 300,
            OGhealth: 300,
            crouching: false,
            punchspeed: 500,
            kickspeed: 750,
            dead: false,
            facing: "right",
            img: "../../Bilder/Sprite/characters/halber.jpg"
        },
        Johannes: {
            x: 0,
            y: 0,
            yv: 0,
            width: 50,
            height: 190,
            speed: 9,
            power: 3,
            color: "yellow",
            name: "Johannes",
            health: 290,
            OGhealth: 290,
            crouching: false,
            punchspeed: 150,
            kickspeed: 225,
            dead: false,
            facing: "right",
            img: "../../Bilder/Sprite/characters/johannes.jpeg"
        }
    },
    characters2 = {
        Ruben: {
            x: 0,
            y: 0,
            yv: 0,
            width: 50,
            height: 200,
            speed: 7,
            power: 5,
            color: "green",
            name: "Ruben",
            health: 320,
            OGhealth: 320,
            crouching: false,
            punchspeed: 300,
            kickspeed: 450,
            dead: false,
            facing: "right",
            img: "../../Bilder/Sprite/characters/ruben.jpg"
        },
        Stian: {
            x: 0,
            y: 0,
            yv: 0,
            width: 50,
            height: 185,
            speed: 3,
            power: 9,
            color: "blue",
            name: "Stian",
            health: 500,
            OGhealth: 500,
            crouching: false,
            punchspeed: 700,
            kickspeed: 800,
            dead: false,
            facing: "right",
            img: "../../Bilder/Sprite/characters/Stæn.jpg"
        },
        Halvor: {
            x: 0,
            y: 0,
            yv: 0,
            width: 50,
            height: 194,
            speed: 5,
            power: 7,
            color: "red",
            name: "Halvor",
            health: 300,
            OGhealth: 300,
            crouching: false,
            punchspeed: 500,
            kickspeed: 750,
            dead: false,
            facing: "right",
            img: "../../Bilder/Sprite/characters/halber.jpg"
        },
        Johannes: {
            x: 0,
            y: 0,
            yv: 0,
            width: 50,
            height: 190,
            speed: 9,
            power: 3,
            color: "yellow",
            name: "Johannes",
            health: 290,
            OGhealth: 290,
            crouching: false,
            punchspeed: 100,
            kickspeed: 225,
            dead: false,
            facing: "right",
            img: "../../Bilder/Sprite/characters/johannes.jpeg"
        }
    },
    ground = {
        x: 0,
        y: window.innerHeight - (window.innerHeight / 10),
        width: window.innerWidth,
        height: window.innerHeight,
        color: "#636363",
    },
    player1,
    player2,
    P1punch = {
        x: 0,
        y: 0,
        width: -130,
        OGwidth: -130,
        height: 20,
        color: "red",
        active: false,
    },
    P1kick = {
        x: 0,
        y: 0,
        width: -130,
        OGwidth: -130,
        height: 30,
        color: "red",
        active: false,
    },
    P1block = {
        x: 0,
        y: 0,
        width: 10,
        height: 200,
        color: "white",
        active: false,
    },
    KeysToInt = {
        0: "left",
        1: "right",
        2: "up",
        3: "down",
        4: "block",
        5: "punch",
        6: "kick"
    },
    eKeysToInt = {
        0: "addTime",
        1: "pause"
    },
    P1movementKeys = {
        up: "w",
        left: "a",
        down: "s",
        right: "d",
        block: "f",
        punch: "g",
        kick: "h",
    },
    P2movementKeys = {
        up: "arrowup",
        left: "arrowleft",
        down: "arrowdown",
        right: "arrowright",
        block: "j",
        punch: "k",
        kick: "l",
    },
    extraKeys = {
        addTime: "t",
        pause: "p",
    },
    P2punch = {
        x: 0,
        y: 0,
        width: 130,
        OGwidth: 130,
        height: 20,
        color: "red",
        active: false,
    },
    P2kick = {
        x: 0,
        y: 0,
        width: 130,
        OGwidth: 130,
        height: 30,
        color: "red",
        active: false,
    },
    P2block = {
        x: 0,
        y: 0,
        width: 10,
        height: 200,
        color: "white",
        active: false,
    },
    backgrounds = [
        "../../Bilder/bg/streetFighterBg.png",
        "../../Bilder/bg/streetFighterBg.jpg",
        "../../Bilder/bg/streetFighterBg1.jpg",
    ],
    p1blocking = false,
    p2blocking = false,
    p1punching = false,
    p2punching = false,
    p1kicking = false,
    p2kicking = false,
    p1Attacking = false,
    p2Attacking = false,
    p1Jumping = false,
    p2Jumping = false,
    left = false,
    a = false,
    right = false,
    d = false,
    up = false,
    w = false,
    down = false,
    s = false,
    k = false,
    g = false,
    l = false,
    h = false,
    space = false,
    P1airborne = false,
    P2airborne = false,
    jumpspeed = 16,
    grav = 0.6,
    time = 100,
    P1crouch,
    P1stand,
    P2crouch,
    P2stand,
    bonk = new Audio('../../Audio/Bonk.mp3'),
    background = new Image(),
    oldvalue,
    key;