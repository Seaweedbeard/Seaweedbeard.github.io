function showshoe() {
    let lshoe = document.getElementById("hovertext");
    if (lshoe.style.display == "none" || lshoe.style.display == "") {
        lshoe.style.display = "block";
    } else if (lshoe.style.display == "block") {
        lshoe.style.display = "none";
    }
}

function showvideo() {
    let video = document.getElementById("video");
    let button = document.getElementById("videobutton");
    if (video.style.display == "none" || video.style.display == "") {
        video.style.display = "initial";
    } else if (video.style.display == "initial") {
        video.style.display = "none";
    }
}

let pris;
let gamlepris = "0";
let finalpris;

function buy(clicked_id) {
    let fid = clicked_id;
    let id = "crocs" + clicked_id + "card";
    let handlekurv = document.getElementById("handlekurv");
    let nid = document.getElementById(id);
    let ret = nid.innerHTML.replace('<button id="' + fid + '" onclick="buy(this.id)">Legg til i handlevognen</button>','');
        handlekurv.innerHTML += ret;

    let option = document.getElementById("monet").value;
    if(option == "NOK") {
        document.getElementById("money").innerHTML = " nok";
    } else if(option == "SEK") {
        document.getElementById("money").innerHTML = " sek";
    } else if(option == "DKK") {
        document.getElementById("money").innerHTML = " dkk";
    } else if(option == "ISK") {
        document.getElementById("money").innerHTML = " isk";
    }  

    pris = document.getElementById("pris" + fid).innerHTML;
    let nypris = +pris + +gamlepris;
    gamlepris = nypris;
    let finalprice = +nypris + 149;
    if(option == "NOK") {
        finalpris = finalprice;
    } else if(option == "SEK") {
        finalpris = finalprice / 99 * 100;
    } else if(option == "DKK") {
        finalpris = finalprice / 140 * 100;
    } else if(option == "ISK") {
        finalpris = finalprice / 7 * 100;
    }  
        document.getElementById("price").innerHTML = finalpris;


}

function changemonet() {
    console.log(document.getElementsByClassName("valuta")[1].innerHTML)
    let option = document.getElementById("monet").value;

    for(i=1; i<=100; i++) {
        if(option == "NOK") {
            document.getElementsByClassName("valuta")[i].innerHTML = " nok";
        } else if(option == "SEK") {
            document.getElementsByClassName("valuta")[i].innerHTML = " sek";
        } else if(option == "DKK") {
            document.getElementsByClassName("valuta")[i].innerHTML = " dkk";
        } else if(option == "ISK") {
            document.getElementsByClassName("valuta")[i].innerHTML = " isk";
        }  
    }

    if(option == "NOK") {
        document.getElementById("money").innerHTML = " nok";
    } else if(option == "SEK") {
        document.getElementById("money").innerHTML = " sek";
    } else if(option == "DKK") {
        document.getElementById("money").innerHTML = " dkk";
    } else if(option == "ISK") {
        document.getElementById("money").innerHTML = " isk";
    }   
}