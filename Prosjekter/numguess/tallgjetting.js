function guess() {
    number();
    progressbar();
    tryes();
    progress()
}

function start() {
    document.getElementById('start').style.display = "none";
    document.getElementById('game').style.display = "none";
    setTimeout(() => { document.getElementById('countdown').innerHTML = "3" }, 0000);
    setTimeout(() => { document.getElementById('countdown').innerHTML = "2" }, 1000);
    setTimeout(() => { document.getElementById('countdown').innerHTML = "1" }, 2000);
    setTimeout(() => { document.getElementById('countdown').innerHTML = null }, 3000);
    setTimeout(() => { document.getElementById('game').style.display = "initial"; }, 3000);
}

function nnumber() {
    const tallet = Math.floor(Math.random() * 100) + 1;
    document.getElementById('number').innerHTML = tallet;
}

function number() {
    let tallet = document.getElementById('number').innerHTML;
    let ttallet = document.getElementById('gjett').value;
    let tries = document.getElementById('tries').innerHTML;
    if (+ttallet != +tallet) {
        resu = "Det er feil, du må gå ";
        res = null;
        if (+ttallet < +tallet) {
            resultat = "høyere"
        } else if (+ttallet > +tallet) {
            resultat = "lavere"
        }
    } else if (+ttallet == +tallet) {
        res = "0";
        resu = ""
        amount = +tries + +1;
        resultat = 'Du fikk det til etter ' + amount + ' forsøk!<br><button type="button" class="Resetbutton" onClick="window.location.reload();">Prøv igjen</button>'
    }
    document.getElementById('gjet').innerHTML = resu + resultat;
}
//window.location.reload();
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 36 || charCode > 41) && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function limit(val) {
    if (Number(val.value) > 100) {
        alert("Høyeste mulige tall er 100, ikke mer")
        val.value = 100
    }
}

function progressbar() {
    let x = document.getElementById('number').innerHTML;
    let y = document.getElementById('gjett').value;
    let per = Math.abs(+y - +x);
    let width = +100 - +per;
    document.getElementById('myBar').style.width = width + "%";
    let opacity = +100 - +per;
    document.getElementById('myBar').style.opacity = opacity + "%";
    if (width == 100) {
        document.getElementById('myBar').style.backgroundColor = "#018316";
    } else if (width > 50) {
        document.getElementById('myBar').style.backgroundColor = "#035e0f";
    } else if (width <= 50) {
        document.getElementById('myBar').style.backgroundColor = "#8f1111";
    }

}

function reset() {
    document.getElementById('gjett').value = "0";
    document.getElementById('myBar').style.width = "0%";
    document.getElementById('gjet').innerHTML = "";
    document.getElementById('tries').innerHTML = "0";
    nnumber()
    start()
}
var tries = 0;

function tryes() {
    tries = tries + 1;
    document.getElementById('tries').innerHTML = tries;
    let x = document.getElementById('number').innerHTML;
    let y = document.getElementById('gjett').value;
    if (x != y) {
        if (tries == 1) {
            console.log("Du er en dumming som ikke fikk det til på første forsøk");
        } else if (tries == 2) {
            console.log("Du sliter fortsatt etter " + tries + " forsøk");
        } else if (tries == 3) {
            console.log("Du må klare det nå, etter " + tries + " forsøk");
        } else if (tries == 4) {
            console.log("Jeg begynner å tro at det er noe fundamentalt galt med deg som ikke fant tallet innen " + tries + " forsøk");
        } else if (tries == 5) {
            console.log("Du er faktisk dum");
        } else if (tries >= 6) {
            console.log("Nei, jeg gir opp, du sliter etter " + tries + " gjett. Wow, dummen");
        }
    } else if (x == y) {
        console.log("Du brukte " + tries + " forsøk.");
        console.log("Du er dum.");
        document.getElementById('disablethis').style.pointerEvents = "none";
        document.getElementById('disablethis').style.cursor = "not-allowed";
        document.body.style.backgroundColor = "#121912";
    }

}

function progress() {
    per = document.getElementById('myBar').style.width;
    document.getElementById('progressbarnumber').innerHTML = per;
}