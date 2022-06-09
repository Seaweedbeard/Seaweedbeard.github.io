function time() {
    let secondhand = document.getElementById("seconds");
    let minutehand = document.getElementById("minutes");
    let hourhand = document.getElementById("hours");
    const today = new Date();
    let seconds = today.getSeconds();
    let minutes = today.getMinutes();
    let hours = today.getHours();
    let secrotate = 360 / 60 * seconds;
    let minrotate = 360 / 60 * minutes + 180;
    let hourrotate = 360 / 12 * (hours) + 180;
    secondhand.style.transform = "rotate(" + secrotate + "deg)";
    minutehand.style.transform = "rotate(" + minrotate + "deg)";
    hourhand.style.transform = "rotate(" + hourrotate + "deg)";
    setTimeout(time), 10;
}