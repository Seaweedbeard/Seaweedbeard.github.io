let country1 = "norge";
let country2 = "Norge";
let currency1 = "nok";
let currency2 = "nok";
function pickflag1(clicked_id) {
    country1 = clicked_id;
    document.getElementById('country1').innerHTML = country1;
    if(country1 == "norge") {
        currency1 = "nok";
    } else if(country1 == "sverige") {
        currency1 = "sek";
    } else if(country1 == "danmark") {
        currency1 = "dkk";
    } else if(country1 == "island") {
        currency1 = "isk";
    }
}
function pickflag2(clicked_id) {
    country2 = clicked_id;
    document.getElementById('country2').innerHTML = country2;
    if(country2 == "Norge") {
        currency2 = "nok";
    } else if(country2 == "Sverige") {
        currency2 = "sek";
    } else if(country2 == "Danmark") {
        currency2 = "dkk";
    } else if(country2 == "Island") {
        currency2 = "isk";
    }
}

function convert() {
    let value = document.getElementById('field1').value;
    let prevalue = value;

    if(value == "123456789") {

        document.write("<h1>Hvis jeg hadde funnet ut av hvorfor jeg ikke fikk knappene til å fylle ut hele høyden til flaggene jeg tegnet, hadde jeg fått en fin hemmelighet her, men neida. Flaggene ville ikke være på min side</h1>")

    }

        if(currency1 == "nok") {
            value = value
        } else if(currency1 == "sek") {
            value = value * 99 / 100;
        } else if(currency1 == "dkk") {
            value = value * 140 / 100;
        } else if(currency1 == "isk") {
            value = value * 7 / 100;
        }

        if(country2 == "Norge") {
            document.getElementById("field1res").innerHTML = prevalue + " " + currency1;
            document.getElementById("field2").innerHTML = value + " " + currency2;
        } else if(country2 == "Sverige") {
            document.getElementById("field1res").innerHTML = prevalue + " " + currency1;
            document.getElementById("field2").innerHTML = value / 99 * 100 + " " + currency2;
        } else if(country2 == "Danmark") {
            document.getElementById("field1res").innerHTML = prevalue + " " + currency1;
            document.getElementById("field2").innerHTML = value / 140 * 100 + " " + currency2;
        } else if(country2 == "Island") {
            document.getElementById("field1res").innerHTML = prevalue + " " + currency1;
            document.getElementById("field2").innerHTML = value / 7 * 100 + " " + currency2;
        }
    
}