function generate() {
    const adj = ["Rød", "Stor", "Svart", "Slem", "Flau", "Romantisk", "Kul", "Blå", "Interessant", "Liten", "Snill", "Pen", "Praktfull", "Stolt", "Redd", "Musikalsk", "Grisete", "Opprørsk"];
    const sub = ["Gutt", "Lærer", "Elev", "Datamaskin", "Konto", "Prøve", "Telefon", "Bok", "Lommebok", "Karakter", "Kule", "Venn", "Kimono", "Frykt", "Jente", "Mann", "Dame", "Gris", "Hest", "Jakke"];

    let x = Math.floor(Math.random() * adj.length);
    let y = Math.floor(Math.random() * sub.length);
    setTimeout(() => { document.getElementById('passord').innerHTML = "Ditt passord er <u>" + adj[x] + " " + sub[y] + "</u>"; }, 0000);
    setTimeout(() => { document.getElementById('genbtn').style.display = "none"; }, 0000);
    setTimeout(() => { document.getElementById('timeout').innerHTML = "Timeout etter 9 sekund" }, 1000);
    setTimeout(() => { document.getElementById('timeout').innerHTML = "Timeout etter 8 sekund" }, 2000);
    setTimeout(() => { document.getElementById('timeout').innerHTML = "Timeout etter 7 sekund" }, 3000);
    setTimeout(() => { document.getElementById('timeout').innerHTML = "Timeout etter 6 sekund" }, 4000);
    setTimeout(() => { document.getElementById('timeout').innerHTML = "Timeout etter 5 sekund" }, 5000);
    setTimeout(() => { document.getElementById('timeout').innerHTML = "Timeout etter 4 sekund" }, 6000);
    setTimeout(() => { document.getElementById('timeout').innerHTML = "Timeout etter 3 sekund" }, 7000);
    setTimeout(() => { document.getElementById('timeout').innerHTML = "Timeout etter 2 sekund" }, 8000);
    setTimeout(() => { document.getElementById('timeout').innerHTML = "Timeout etter 1 sekund" }, 9000);
    setTimeout(() => { document.getElementById('timeout').innerHTML = "Timeout etter 0 sekund" }, 10000);
    setTimeout(() => { document.getElementById('timeout').innerHTML = "Timeout. Vennligst bestill nytt passord" }, 10100);
    setTimeout(() => {
        document.getElementById('genbtn').style.display = "Initial";
        document.getElementById('passord').innerHTML = "";
    }, 10100);
}