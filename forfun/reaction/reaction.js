window.onload = function() {

    var seconds = 00;
    var tens = 00;
    var appendTens = document.getElementById("tens");
    var appendSeconds = document.getElementById("seconds");
    var buttonStart = document.getElementById('hitme');
    var buttonStop = document.getElementById('button-stop');
    var buttonReset = document.getElementById('button-reset');
    var Interval;

    buttonStart.onclick = function() {

        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
    }

    buttonStop.onclick = function() {
        clearInterval(Interval);
    }

    buttonReset.onclick = function() {
        clearInterval(Interval);
        tens = "00";
        seconds = "00";
        appendTens.innerHTML = tens;
        appendSeconds.innerHTML = seconds;
    }

    function startTimer() {
        tens++;

        if (tens <= 9) {
            appendTens.innerHTML = "0" + tens;
        }

        if (tens > 9) {
            appendTens.innerHTML = tens;
        }

        if (tens > 99) {
            seconds++;
            appendSeconds.innerHTML = "0" + seconds;
            tens = 0;
            appendTens.innerHTML = "0";
        }

        if (seconds > 9) {
            appendSeconds.innerHTML = seconds;
        }

    }

}

document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        console.log('Space pressed')
    } else if (event.code === 'ArrowDown') {
        let height = document.getElementById("hitme").style.marginTop;
        let removevw = height.slice(0, height.length - 2);
        let newheight = +removevw + +1 + "vh";
        document.getElementById("hitme").style.marginTop = newheight;
    } else if (event.code === 'ArrowUp') {
        let height = document.getElementById("hitme").style.marginTop;
        let removevw = height.slice(0, height.length - 2);
        let newheight = +removevw - +1 + "vh";
        document.getElementById("hitme").style.marginTop = newheight;
    } else if (event.code === 'ArrowRight') {
        let height = document.getElementById("hitme").style.marginLeft;
        let removevw = height.slice(0, height.length - 2);
        let newheight = +removevw + +1 + "vw";
        document.getElementById("hitme").style.marginLeft = newheight;
    } else if (event.code === 'ArrowLeft') {
        let height = document.getElementById("hitme").style.marginLeft;
        let removevw = height.slice(0, height.length - 2);
        let newheight = +removevw - +1 + "vw";
        document.getElementById("hitme").style.marginLeft = newheight;
    }
})

function clickme() {
    console.log("yes");
    return "hit";
}

function missme() {
    console.log("no");
    console.log(smthing);
    smthing = "no";
}