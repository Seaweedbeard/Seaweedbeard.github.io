function kml() {
    let a = document.getElementById("a").value;
    let b = document.getElementById("b").value;
    let c = (b / a) * 10 ;
    c = Math.round(c);
    document.getElementById("answer").innerHTML = "Bilen din kan kjøre " + c + "km på en full tank";
}

function cartable() {
    let car = document.getElementById("select").value;
    if(car == "0") {
        document.getElementById("td1").innerHTML = "Fiat 500";
        document.getElementById("td2").innerHTML = "35 l";
        document.getElementById("td3").innerHTML = "0.51 l/mil";
    } else if(car == "1") {
        document.getElementById("td1").innerHTML = "Porsche 911";
        document.getElementById("td2").innerHTML = "64 l";
        document.getElementById("td3").innerHTML = "0.95 l/mil";
    } else if(car == "2") {
        document.getElementById("td1").innerHTML = "Toyota Prius";
        document.getElementById("td2").innerHTML = "45 l";
        document.getElementById("td3").innerHTML = "0.39 l/mil";
    }
}

function font() {
    let font1 = document.getElementsByTagName("td")[0];
    let font2 = document.getElementsByTagName("td")[1];
    let font3 = document.getElementsByTagName("td")[2]; 
    let fonts = window.getComputedStyle(font1).getPropertyValue("font-Family");

    if (fonts == '"Open sans"') {
        font1.style.fontFamily = "verdana";
        font2.style.fontFamily = "verdana";
        font3.style.fontFamily = "verdana";
    } else if (fonts == 'verdana') {
        font1.style.fontFamily = 'Open sans';
        font2.style.fontFamily = 'Open sans';
        font3.style.fontFamily = 'Open sans';
    }
}
function hint() {
    let p = document.getElementById("hint").innerHTML;
    if(p == "") {
        document.getElementById("hint").innerHTML = "Endrer skrifttype til bilinformasjonen"
    } else if(p != "") {
        document.getElementById("hint").innerHTML = "";
    }
}
function mouse() {
    let mouse = document.getElementById("mouse");
    mouse.style.display = "block";
    mouse.style.left = event.pageX-2 + 'px';
    mouse.style.top = event.pageY-2 + 'px';
    let x = event.pageX-2;
    let y = event.pageY-2;
}