function a() {
    document.getElementById("a").innerHTML = "This statement is true";
}
function edit() {
    var editto = document.getElementById('editto').value;
    document.getElementById("a").innerHTML = editto;
}
function math(x, y) {
    var x = document.getElementById('x').value;
    var y = document.getElementById('y').value;
    let sum = +x + +y;
    document.getElementById('math').innerHTML = sum;
}
function warning() {
    alert("Idiot, teksten oppdaterer seg automatisk");
}
function confirma() {
    confirm("Hei på deg");
}
function colora() {
    let color = document.getElementById("colora").value;
    document.getElementById("colorc").style.backgroundColor = color;
}
function glider() {
    const opacity = document.getElementById(glider).value;
    console.log(opacity);
}
function image() {
    
    var pic = document.getElementById('setimage').value;
    document.getElementById('image').src = pic;
}
function imagegone() {
    document.getElementById('image').src = "";
}
function prompta() {
let text;
    let person = prompt("Please enter your name", "");
if (person == null || person == "") {
  text = "User cancelled the prompt.";
} else {
  text = "Hello " + person + "! How are you today?";
  console.log(text);
}
document.getElementById("promptest").innerHTML = text;
}
function dice() {
    let diceroll = Math.floor(Math.random() * 6) + 1;
    console.log(diceroll);
    document.getElementById('diceres').innerHTML = diceroll;
}
function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML =  h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
}
  
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function cchange(clicked_id) {
    document.body.style.cursor = document.getElementById(clicked_id).value;
}

function clicker() {
    let clicks = document.getElementById(clicker).value;
    console.log(clicks)
    let click = +clicks + +1
    document.getElementById(clicker).innerHTML = click;
    console.log(click);
}