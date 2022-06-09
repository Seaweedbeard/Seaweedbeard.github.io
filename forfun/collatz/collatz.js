let x;
let y;
timer = false;
let history = [];
let ongoing = false;
let continuing = false;
let timing = 200;

function submit() {
    x = Number(document.getElementById("inpnumber").value);
    y = x;
    /*if (x < 1000) { timing = 200 }
    if (x >= 1000) { timing = 100 }
    if (x >= 10000) { timing = 50 }
    if (x >= 100000) { timing = 25 }*/
    timing = 10;
    history = [];
    document.getElementById("process").innerHTML = "";
    document.getElementById("output").innerHTML = "";
    ongoing = true;
}

function CollatzIt() {
    if (ongoing) {
        history.push(x);
        if (x % 2 == 0) {
            x = x / 2;
        } else {
            x = x * 3 + 1;
        }
        document.getElementById("process").innerHTML += history[history.length - 1] + "," + "<br>";
        var elem = document.getElementById('process');
        elem.scrollTop = elem.scrollHeight;
        checklength();
    }
    setTimeout(CollatzIt, timing);
}

function checklength() {
    if (
        history[history.length - 9] == 4 &&
        history[history.length - 8] == 2 &&
        history[history.length - 7] == 1
    ) {
        ongoing = false;
        document.getElementById("output").innerHTML = y + " ender fortsatt med 4, 2, 1 - løkka<br>" +
            "Det tok " + (history.length - 9) + " steg før man når 4, 2, 1";
        if (continuing) {
            y++;
            document.getElementById("inpnumber").value = y;
            submit();
        }
    }
}

function changeContinuing() {
    if (continuing == false) {
        continuing = true;
        document.getElementById("result").innerHTML = "Tester tall";
    } else {
        continuing = false;
        document.getElementById("result").innerHTML = "Tester bare det ene tallet";
    }
}