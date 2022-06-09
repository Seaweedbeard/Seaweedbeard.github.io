let winningdoor;
let losingdoor = 1;
let opendoor = 1;

function randomdoor() {
    winningdoor = Math.floor(Math.random() * 3) + 1;
    document.getElementById("d" + winningdoor).innerHTML = "Car";
    console.log(winningdoor);
    document.getElementById("confirmationbtnrestart").style.display = "none";
}

let pickeddoor;
let doorname;

function pickdoor(clicked_id) {
    let dcolor = document.getElementById(clicked_id).style.backgroundColor;

    if (dcolor == "" || dcolor == "rgb(18, 18, 18)") {
        document.getElementById(clicked_id).style.backgroundColor = "gray";
        document.getElementById("confirmationtext").innerHTML = 
        "Er du sikker på at du vil velge dør " + clicked_id.substring(4);
        document.getElementById("confirmationbtnyes").style.display = "initial";
        document.getElementById("confirmationbtnno").style.display = "initial";
        document.getElementById("confirmationbtnyesyes").style.display = "none";
        document.getElementById("confirmationbtnnono").style.display = "none";
        pickeddoor = clicked_id.substring(4);
        doorname = pickeddoor;
        if (pickeddoor == "1"){
            document.getElementById("door2").style.backgroundColor = "#121212";
            document.getElementById("door3").style.backgroundColor = "#121212";
        }
        else if(pickeddoor == "2") {
            document.getElementById("door1").style.backgroundColor = "#121212";
            document.getElementById("door3").style.backgroundColor = "#121212";
        }
        else {
            document.getElementById("door1").style.backgroundColor = "#121212";
            document.getElementById("door2").style.backgroundColor = "#121212";
        }
    } else if (dcolor == "gray") {
        if (pickeddoor == doorname) {
            document.getElementById(clicked_id).style.backgroundColor = "#121212";
            document.getElementById("confirmationtext").innerHTML = "Velg en dør";
            btngone()
        } else {
            document.getElementById("confirmationtext").innerHTML = "Vennligst avbryt dør " + doorname + " først";
        }
    }
}

function choosedoor(clicked_id) {
    disabledoor()
    let pickeddoorvalue = "dør " + pickeddoor;
    if(clicked_id == "confirmationbtnno") {
        document.getElementById("door" + pickeddoor).style.backgroundColor = "#121212";
        document.getElementById("confirmationtext").innerHTML = "Velg en dør";
        btngone()
        enabledoor()
    }  
    else if(clicked_id == "confirmationbtnyes") {
            while(losingdoor == winningdoor || losingdoor == pickeddoor) {
                losingdoor = Math.floor(Math.random()*3)+1;
            }
            while(opendoor == losingdoor || opendoor == pickeddoor) {
                opendoor = Math.floor(Math.random()*3)+1;
            }
        var el = document.getElementById("door" + losingdoor);
        el.value = "Goat";
            document.getElementById("confirmationtext").innerHTML = "Vil du bytte til dør " + opendoor;
            document.getElementById("confirmationbtnyes").style.display = "none";
            document.getElementById("confirmationbtnno").style.display = "none";
            document.getElementById("confirmationbtnyesyes").style.display = "initial";
            document.getElementById("confirmationbtnnono").style.display = "initial";
    } 
    else if(clicked_id == "confirmationbtnyesyes") {
            if ("dør " + opendoor == "dør " + winningdoor) {
                document.getElementById("confirmationtext").innerHTML = "DU VANT!!!";
                var yy = document.getElementById("door" + winningdoor);
                yy.value = "Car";
                var yyl = document.getElementById("door" + losingdoor);
                yyl.value = "Goat";
            }
            else if ("dør " + opendoor != "dør " + winningdoor) {
                document.getElementById("confirmationtext").innerHTML = "Du byttet til dør " + opendoor + " og tapte, hehe";
                var yyl = document.getElementById("door" + losingdoor);
                yyl.value = "Goat";
                var yy = document.getElementById("door" + winningdoor);
                yy.value = "Car";
            }
        btngone()
        document.getElementById("confirmationbtnrestart").style.display = "initial";
    }
    else if(clicked_id == "confirmationbtnnono") {
            if (pickeddoorvalue == "dør " + winningdoor) {
                document.getElementById("confirmationtext").innerHTML = "DU VANT!!!";
                var yy = document.getElementById("door" + winningdoor);
                yy.value = "Car";
                var yyl = document.getElementById("door" + pickeddoor);
                yyl.value = "Goat";
            }
            else if (pickeddoorvalue != "dør " + winningdoor) {
                document.getElementById("confirmationtext").innerHTML = "Du byttet ikke til dør " + winningdoor + " så du tapte, hehe";
                var yyl = document.getElementById("door" + pickeddoor);
                yyl.value = "Goat";
                var yy = document.getElementById("door" + winningdoor);
                yy.value = "Car";
            }
        btngone()
        document.getElementById("confirmationbtnrestart").style.display = "initial";
    }  
}

function restart() {
        randomdoor();
        enabledoor();
        losingdoor = 1;
        opendoor = 1;
    document.getElementById("confirmationtext").innerHTML = "Velg en dør";
    for(i = 1; i<=3; i++) {
        document.getElementById("door" + i).value = "Dør " + i;
        document.getElementById("door" + i).style.backgroundColor = "#121212";
    }
}

function btngone() {
    document.getElementById("confirmationbtnyes").style.display = "none";
    document.getElementById("confirmationbtnno").style.display = "none";
    document.getElementById("confirmationbtnyesyes").style.display = "none";
    document.getElementById("confirmationbtnnono").style.display = "none";
}

function disabledoor() {
    for(i=1;i<=3; i++) {
        document.getElementById("door" + i).disabled = true;
    }
}

function enabledoor() {
    for(i=1;i<=3; i++) {
        document.getElementById("door" + i).disabled = false;
    }
}