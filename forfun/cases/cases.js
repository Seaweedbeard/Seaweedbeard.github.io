let littlewidth;
let bigwidth;
let sum;
let randnum;
let walleta;

const items = [
    "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "2",
    "2", "2", "2", "2", "2", "2", "2", "2", "3", "3", "3",
    "3", "3", "3", "3", "3", "4", "4", "4", "4", "4", "4",
    "4", "5", "5", "5", "5", "5", "5", "6", "6", "6", "6",
    "6", "7", "7", "7", "7", "8", "8", "8", "9", "9", "10"
];

function wallet() {
    if (localStorage.getItem("Wallet") <= 0) {
        localStorage.setItem("Wallet", 50);
    }
    document.getElementById("wallet").innerHTML = localStorage.getItem("Wallet");
    walleta = localStorage.getItem("Wallet");
    document.getElementById("name").innerHTML = localStorage.getItem("Username") + " sin ";
}

function getwidth() {
    littlewidth = document.getElementById("slots").offsetWidth;
    bigwidth = document.getElementById("slots-int").offsetWidth;
    sum = Math.floor((bigwidth - littlewidth) / 10);
}

function createboxes() {
    randnum = Math.floor(Math.random() * 40) + 70;
    for (let i = 1; i <= randnum; i++) {
        let cont = items[Math.floor(Math.random() * items.length)];
        document.getElementById("slots-int").innerHTML += '<span id="slot' + i + '" class="slot">' + cont + '</span>';
    }
}

let id = null;

function animateit() {
    document.getElementById("animatebtn").style.display = "none";
    document.getElementById("resetbtn").style.display = "block";
    walleta = walleta - 5;
    document.getElementById("wallet").innerHTML = walleta;
    localStorage.setItem("Wallet", walleta);

    let elem = document.getElementById("slots-int");
    let pos = 0;
    clearInterval(id);
    id = setInterval(frame, 1);

    function frame() {
        if (pos == sum) {
            clearInterval(id);
            setTimeout(animateend, 10000);
        } else {
            pos++;
            elem.style.transform = "translateX(-" + pos * 10 + "px)";
        }
    }
}

function animateend() {
    let endnum = randnum - 1;
    let elem = document.getElementById("slot" + endnum);
    let size = 0;
    clearInterval(id);
    id = setInterval(frame, 30);

    function frame() {
        if (size == 11) {
            clearInterval(id);
            document.getElementById("slotresult").innerHTML = document.getElementById("slot" + endnum).innerHTML;
            let lastnumber = document.getElementById("slot" + endnum).innerHTML;
            walleta = +walleta + +lastnumber;
            document.getElementById("wallet").innerHTML = walleta;
            localStorage.setItem("Wallet", walleta);

        } else {
            size++;
            let nsize = 1 + size / 100;
            elem.style.transform = "scale(" + nsize + ", " + nsize + ")";
        }
    }
}

function resetit() {
    clearInterval(id);
    document.getElementById("slots-int").innerHTML = "";
    document.getElementById("slotresult").innerHTML = "0";
    document.getElementById("slots-int").style.transition = "0s";
    document.getElementById("slots-int").style.transform = "translateX(0px)";
    setTimeout(function() { document.getElementById("slots-int").style.transition = "10s" }, 1);
    createboxes();
    getwidth();
    document.getElementById("animatebtn").style.display = "block";
    document.getElementById("resetbtn").style.display = "none";
}