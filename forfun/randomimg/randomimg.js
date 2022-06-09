function randomimg() {
    let symb = [];
    let arraypick;
    const linksymbols = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q",
    "r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0"];
    const linksymb = [];
    let length = Math.floor(Math.random()*1) + 6;
        for(i=1; i<=length; i++) {
            arraypick = Math.floor(Math.random()*linksymbols.length); 
            symb = linksymbols[arraypick];
            linksymb.push(symb);

        }
    let links = linksymb.join("");
    location.href = "https://prnt.sc/" + links;
}