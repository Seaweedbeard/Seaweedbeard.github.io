function borders() {
    //Changes the radius of each of the four borders
    const corner = [];
    const cornertype = [];
    const type = ["%", "ch", "cm", "em", "ex", "fr", "in", "mm", "pc", "pt", "px", "rem", "vh", "vw"];
    const bordercorner = [];
    for (var i = 0; i < 4; i++) {
        corner[i] = Math.floor(Math.random() * 500) + 1;
        cornertype[i] = Math.floor(Math.random() * type.length);
        bordercorner[i] = corner[i] + type[cornertype[i]];
    }
    document.getElementById("border").style.borderRadius = bordercorner[0] + " " + bordercorner[1] + " " + bordercorner[2] + " " + bordercorner[3];

    //Changes the color of said border
    const fcolor = [];
    const color = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    for (var x = 1; x <= 6; x++) {
        let rand = Math.floor(Math.random() * color.length);
        console.log(color.length)
        fcolor[x] = color[rand];
    }
    let bordercolor = fcolor[1] + fcolor[2] + fcolor[3] + fcolor[4] + fcolor[5] + fcolor[6];
    document.getElementById("border").style.borderColor = "#" + bordercolor;

    //changes font color
    const fontfcolor = [];
    const fontcolor = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    for (var y = 1; y <= 6; y++) {
        let fontrand = Math.floor(Math.random() * fontcolor.length);
        fontfcolor[y] = fontcolor[fontrand];
    }
    let fontfontcolor = fontfcolor[1] + fontfcolor[2] + fontfcolor[3] + fontfcolor[4] + fontfcolor[5] + fontfcolor[6];
    document.getElementById("border").style.color = "#" + fontfontcolor;

    //Changes the border type
    const borderstyles = ["dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"];
    let borderpick = Math.floor(Math.random() * borderstyles.length);
    let borderstyle = borderstyles[borderpick];
    document.getElementById("border").style.borderStyle = borderstyle;
    //document.getElementById("border").style.borderStyle = "groove" + " " + "ridge" + " " + "ridge" + " " + "groove";

}