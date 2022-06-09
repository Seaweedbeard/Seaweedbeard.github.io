let array = [];
let array2 = [];
let set = new Set(["Ost", "Syltetøy", "Brød", "Skinke", "Banan"]);
let map = new Map([
    [1, ["Ost", 50]],
    [2, ["Syltetøy", 30]],
    [3, ["Brød", 20]],
    [4, ["Skinke", 25]]
]);
let div;
let div2;
let div3;

//oppgave 1

function createarray() {
    div = document.getElementById("array");
    array = ["Ost", "Syltetøy", "Brød", "Skinke", "Banan"];
    div.innerHTML = array;
}

function getthird() {
    alert(array[2]);
}

function deletefromarray() {
    array.splice(1, 1);
    div.innerHTML = array;
}

function sortalphabetically() {
    array.sort();
    div.innerHTML = array;
}

function mayo() {
    let ndiv = document.getElementById("majones");
    let search = "Majones";
    let majo = array.includes(search);
    console.log(majo);
    if (majo == false) {
        ndiv.innerHTML = "Majones finnes ikke i lista";
    } else if (majo == true) {
        ndiv.innerHTML = "Majones finnes i lista";
    }
}

function addarray() {
    let input = document.getElementById("addarray").value;
    array.push(input);
    div.innerHTML = array;
}

//Oppgave 2

function createarray2() {
    array2 = [
        { navn: "Ost", pris: 50 },
        { navn: "Syltetøy", pris: 30 },
        { navn: "Brød", pris: 20 },
        { navn: "Skinke", pris: 25 },
        { navn: "Banan", pris: 5 }
    ];
    div2 = document.getElementById("array2");
    for (let i = 0; i <= array2.length; i++) {
        div2.innerHTML += array2[i].navn + " koster " + array2[i].pris + "kr, ";
    }
}

function moms() {
    div2.innerHTML = "";
    for (let i = 0; i <= array2.length; i++) {
        array2[i].pris = array2[i].pris * 1.25;
        div2.innerHTML += array2[i].navn + " koster " + array2[i].pris + "kr, ";
    }
}

function table() {
    let table = document.getElementById("array2table");
    table.innerHTML = "<tr><th>Navn</th><th>Pris</th></tr>";
    for (var i of array2) {
        table.innerHTML += "<td>" + i.navn + "</td><td>" + i.pris + "</td>";
    }
}

//Oppgave 3

function createarray3() {
    div3 = document.getElementById("array3");
    div3.innerHTML = "";
    for (let item of set) {
        div3.innerHTML += item + ", ";
    }
}

function addtoset() {
    let input = document.getElementById("addtoset").value;
    set.add(input);
    div3.innerHTML = "";
    for (let item of set) {
        div3.innerHTML += item + ", ";
    }
}

function deletefromset() {
    let input = document.getElementById("deletefromset").value;
    set.delete(input);
    div3.innerHTML = "";
    for (let item of set) {
        div3.innerHTML += item + ", ";
    }
}

function checkinset() {
    let input = document.getElementById("checkinset").value;
    let div3cont = document.getElementById("array3cont");
    let contain = set.has(input);
    if (contain == true) {
        div3cont.innerHTML = input + " finnes i settet";
    } else if (contain == false) {
        div3cont.innerHTML = input + " finnes IKKE i settet"
    }
}

function createlist3() {
    let div3list = document.getElementById("array3list");
    div3list.innerHTML = "";
    set.forEach(function(item) {
        div3list.innerHTML += "<li>" + item + "</li>";
    });
    console.log("Done");
}

/*function animate() {
    let canvas = document.getElementById("myCanvas");
    let c = canvas.getContext("2d");
    c.beginPath();
    c.rect(0, 0, 50, 50);
    c.stroke();
}*/

//Oppgave 4

function createmap() {
    let div = document.getElementById("div4");
    map.set(5, ["Banan", 5]);
    div.innerHTML = "";
    for (let key of map) {
        div.innerHTML += '"Navn: ' + key[1][0] + ', Pris: ' + key[1][1] + '", '
    }
}

function checkmap() {
    let div = document.getElementById("div4check");
    let check = map.has(2);
    if (check == true) {
        div.innerHTML = "Map har en verdi med nøkkel 2. Den er " + map.get(2)[0] + ", med pris: " +
            map.get(2)[1];
    } else if (check == false) {
        div.innerHTML = "Map har ingen verdi med nøkkel 2";
    }
}


//random

function width() {
    let width1 = document.getElementById("oppgave5").offsetWidth;
    console.log(width1);
}