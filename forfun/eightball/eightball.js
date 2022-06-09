//Legg til en knapp som gjør arrayen om til en terning: ["1", "2", "3", "4", "5", "6"]

const Arrays = [];
let currentstring;
let randostring;

function addinput() {
    let value = document.getElementById("input").value;
    document.getElementById("input").value = "";
    if (value == "") {
        alert("Ikke prøv å legg til tomme strenger her!!! >:(");
    } else {
        Arrays.push(value);
        document.getElementById("showhere").innerHTML = Arrays;
    }
}

function randomstring() {
    if (Arrays.length < 1) {
        alert(">:( Arrayen er tom, dummen");
    } else {
        let length = Math.floor(Math.random() * Arrays.length);
        document.getElementById("randomstring").innerHTML = Arrays[length];
        currentstring = Arrays[length];
        checkbox();
    }
}

function checkbox() {
    let cbox = document.getElementById("checkbox").checked;
    if(cbox == true) {
        
    } else if(cbox == false) {
        let Arrayss = Arrays.filter(eeh => eeh !== currentstring);
        Arrays.length = 0;
        Arrays.push.apply(Arrays, Arrayss);
        document.getElementById("showhere").innerHTML = Arrays;
    }
}

function resetarray() {
    if (Arrays.length < 1) {
        alert(">:( Arrayen er tom, dummen");
    } else {
        Arrays.length = [];
        document.getElementById("showhere").innerHTML = Arrays;
        document.getElementById("randomstring").innerHTML = "";
    }
}

function removestring() {
    if (Arrays.length < 1) {
        alert(">:( Det kan ikke være noe der, dummen");
    } else {
        document.getElementById("randomstring").innerHTML = "";
    }
}

function removestrings() {
    let value = document.getElementById("inputs").value;
    document.getElementById("inputs").value = "";
    if (Arrays.length < 1 && value == "") {
        alert(">:( Arrayen er tom, dummen! Og feltet er tomt uansett. Hva tror du at du gjør?");
    } else if (Arrays.length < 1) {
        alert(">:( Arrayen er tom, dummen!");
    } else if (value == "") {
        alert(">:( Du kan ikke slette blankt, dummen!");
    } else {
        let Arrayss = Arrays.filter(eeh => eeh !== value);
        Arrays.length = 0;
        Arrays.push.apply(Arrays, Arrayss);
        document.getElementById("showhere").innerHTML = Arrays;
    }
}

function eightball() {
    let Arrayss = ["Ja", "Det er sikkert", "Jeg har bestemt det slik", "Uten tvil", "Ja, definitivt", "Det kan du vedde på", "Som jeg ser det, ja",
        "Mest sannsynlig", "Det ser bra ut", "Tegnene tyder mot ja", "Svar usikkert, prøv igjen", "Spør igjen senere", "Jeg burde ikke fortelle deg nå",
        "Klarer ikke å se det for meg nå", "Konsentrer og spør igjen", "Ikke tro det", "Mitt svar er nei", "Kildene mine sier nei", "Det ser ikke lyst ut", "Veldig tvilsomt"
    ];
    Arrays.length = 0;
    Arrays.push.apply(Arrays, Arrayss);
    document.getElementById("showhere").innerHTML = Arrays;
}

function terning() {
    let Arrayss = ["1", "2", "3", "4", "5", "6"];
    Arrays.length = 0;
    Arrays.push.apply(Arrays, Arrayss);
    document.getElementById("showhere").innerHTML = Arrays;
}

function question() {
    let question = document.getElementById("qinput").value;
    let questions = question.toLowerCase();
    if (Arrays.length < 1) {
        alert(">:( Arrayen er tom, dummen");
    } else if (questions == "er anine perfekt" || questions == "er anine perfekt?") {
        document.getElementById("question").innerHTML = "<u>" + question + "</u>";
        document.getElementById("qinput").value = "";
        document.getElementById("randomstring").innerHTML = "Selvfølgelig er Anine perfekt";
    } else if (questions == "hvem er anine" || questions == "hvem er anine?") {
        document.getElementById("question").innerHTML = "<u>" + question + "</u>";
        document.getElementById("qinput").value = "";
        document.getElementById("randomstring").innerHTML = "Who knows..?";
    } else {
        document.getElementById("question").innerHTML = "<u>" + question + "</u>";
        document.getElementById("qinput").value = "";
        randomstring()
    }
}

function removequestion() {
    let question = document.getElementById("question").innerHTML;
    if (question == "") {
        alert(">:( Du har ikke spurt noe enda, dummen");
    } else {
        document.getElementById("question").innerHTML = "";
        document.getElementById("qinput").value = "";
    }
}

function bigundo() {
    let question = document.getElementById("question").innerHTML;
    let rndword = document.getElementById("randomstring").innerHTML;
    let input = document.getElementById("input").value;
    let inputs = document.getElementById("inputs").value;
    let qinput = document.getElementById("qinput").value;
    if (Arrays.length < 1 && question == "" && rndword == "" && qinput == "" && input == "" && inputs == "") {
        alert(">:( Det er faktisk ingenting å tilbakestille, dummen")
    } else {
        let si = confirm("Er du sikker på at du vil tilbakestille alt?");
        if (si == true) {
            load()
        } else {
            alert("k   :'(")
        }
    }
}

function load() {
    document.getElementById("randomstring").innerHTML = "";
    document.getElementById("question").innerHTML = "";
    Arrays.length = 0;
    document.getElementById("showhere").innerHTML = Arrays;
    document.getElementById("input").value = "";
    document.getElementById("inputs").value = "";
    document.getElementById("qinput").value = "";
    checkbox()
    showstrings()
    darkmode()
}

function showstrings() {
    let cbox = document.getElementById("showstrings").checked;
    if(cbox == true) {
        document.getElementById("currentstrings").style.display = "none";
        document.getElementById("showhere").style.display = "none";
    } else if(cbox == false) {
        document.getElementById("currentstrings").style.display = "block";
        document.getElementById("showhere").style.display = "block";
    }
}

function darkmode() {
    let cbox = document.getElementById("darkmode").checked;
    if(cbox == true) {
        var element = document.body;
        element.classList.remove("lightmode");
    } else if(cbox == false) {
        var element = document.body;
        element.classList.add("lightmode");
    }
}