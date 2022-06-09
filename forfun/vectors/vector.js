function norway() {
    a = document.getElementById("norwegianify").style.display;
    if(a == "none") {
        document.getElementById("norwegianify").style.display = "block";
        document.getElementById("land").innerHTML = "Norge:";
        console.log(document.getElementById("anthem").href)
    } else {
        document.getElementById("norwegianify").style.display = "none";
        document.getElementById("land").innerHTML = "Danmark:";
        console.log(document.getElementById("anthem").href)
    }
}

