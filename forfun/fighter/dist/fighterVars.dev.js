"use strict";

var canvas,
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
    color: "red",
    name: "Ruben",
    health: 100,
    crouching: false,
    punchspeed: 300,
    facing: "right",
    img: "../../Bilder/Sprite/characters/ruben.jpg"
  },
  Stian: {
    x: 0,
    y: 0,
    yv: 0,
    width: 70,
    height: 185,
    speed: 3,
    power: 9,
    color: "blue",
    name: "Stian",
    health: 100,
    crouching: false,
    punchspeed: 700,
    facing: "right",
    img: "../../Bilder/Sprite/characters/Stæn.jpg"
  },
  Halvor: {
    x: 0,
    y: 0,
    yv: 0,
    width: 60,
    height: 194,
    speed: 5,
    power: 7,
    color: "green",
    name: "Halvor",
    health: 100,
    crouching: false,
    punchspeed: 500,
    facing: "right",
    img: "../../Bilder/Sprite/characters/halber.jpg"
  },
  Johannes: {
    x: 0,
    y: 0,
    yv: 0,
    width: 50,
    height: 180,
    speed: 9,
    power: 3,
    color: "yellow",
    name: "Johannes",
    health: 100,
    crouching: false,
    punchspeed: 100,
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
    color: "red",
    name: "Ruben",
    health: 100,
    crouching: false,
    punchspeed: 300,
    facing: "right",
    img: "../../Bilder/Sprite/characters/ruben.jpg"
  },
  Stian: {
    x: 0,
    y: 0,
    yv: 0,
    width: 70,
    height: 185,
    speed: 3,
    power: 9,
    color: "blue",
    name: "Stian",
    health: 100,
    crouching: false,
    punchspeed: 700,
    facing: "right",
    img: "../../Bilder/Sprite/characters/Stæn.jpg"
  },
  Halvor: {
    x: 0,
    y: 0,
    yv: 0,
    width: 60,
    height: 194,
    speed: 5,
    power: 7,
    color: "green",
    name: "Halvor",
    health: 100,
    crouching: false,
    punchspeed: 500,
    facing: "right",
    img: "../../Bilder/Sprite/characters/halber.jpg"
  },
  Johannes: {
    x: 0,
    y: 0,
    yv: 0,
    width: 50,
    height: 180,
    speed: 9,
    power: 3,
    color: "yellow",
    name: "Johannes",
    health: 100,
    crouching: false,
    punchspeed: 100,
    facing: "right",
    img: "../../Bilder/Sprite/characters/johannes.jpeg"
  }
},
    ground = {
  x: 0,
  y: window.innerHeight - window.innerHeight / 5,
  width: window.innerWidth,
  height: window.innerHeight,
  color: "#636363"
},
    player1,
    player2,
    P1punch = {
  x: 0,
  y: 0,
  width: -130,
  height: 20,
  color: "red",
  active: false
},
    P2punch = {
  x: 0,
  y: 0,
  width: 130,
  height: 20,
  color: "red",
  active: false
},
    p1punching = false,
    p2punching = false,
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
    grav = 0.2,
    P1crouch,
    P1stand,
    P2crouch,
    P2stand;