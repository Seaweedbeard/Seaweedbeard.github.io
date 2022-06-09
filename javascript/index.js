function calls() {
    fetch("https://geolocation-db.com/json/d802faa0-10bd-11ec-b2fe-47a0872c6708")
        .then(resa => resa.json())
        .then(resa => {
            city = resa.city;
            lat = resa.latitude;
            long = resa.longitude;
            localStorage.setItem("lat", lat);
            localStorage.setItem("long", long);
            localStorage.setItem("city", city);
            console.log(lat + ", " + long)
        })

    setTimeout(weatherdata(), 100);

    function weatherdata() {
        let lat = localStorage.getItem("lat");
        let long = localStorage.getItem("long");
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&lang=no&exclude=minutely,hourly,daily&units=metric&appid=b1cfa49562686b0cb2c5972589572b56")
            .then(res => res.json())
            .then(res => {
                let oweather = res.current.weather[0].description;
                const str = oweather;
                const weather = str.charAt(0).toUpperCase() + str.slice(1);
                let temp = res.current.temp.toFixed(0);
                let feel = res.current.feels_like.toFixed(0);
                localStorage.setItem("temp", temp);
                localStorage.setItem("weather", weather);
                localStorage.setItem("feel", feel);
            });
    }

    document.getElementById("city").innerHTML = city;
    document.getElementById("weather").innerHTML = weather;
    document.getElementById("temp").innerHTML = temp + "°C";
    document.getElementById("tempfeel").innerHTML = "Føles som: " + feel + "°C";
}
let city = localStorage.getItem("city");
let temp = localStorage.getItem("temp");
let feel = localStorage.getItem("feel");
let weather = localStorage.getItem("weather");

//the clock when expanded will reveal the users city, current weather and temperature



function time() {
    let secondhand = document.getElementById("seconds");
    let minutehand = document.getElementById("minutes");
    let hourhand = document.getElementById("hours");
    let timeelem = document.getElementById("digital");
    const today = new Date();
    let hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    min = checkTime(min);
    sec = checkTime(sec);
    let secrotate = 360 / 60 * sec;
    let minrotate = 360 / 60 * min + 180;
    let hourrotate = 360 / 12 * (hour) + 180;

    timeelem.innerHTML = hour + ":" + min + ":" + sec;
    secondhand.style.transform = "rotate(" + secrotate + "deg)";
    minutehand.style.transform = "rotate(" + minrotate + "deg)";
    hourhand.style.transform = "rotate(" + hourrotate + "deg)";

    setTimeout(time), 10;
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };
    return i;
}

function iin() {
    let div = document.getElementById("info");
    div.style.opacity = "70%";
    document.getElementById("clock").style.height = "120px";
    document.getElementById("clock").style.width = "120px";
}

function iout() {
    let div = document.getElementById("info");
    div.style.opacity = "0%";
    document.getElementById("clock").style.height = "50px";
    document.getElementById("clock").style.width = "50px";
}

function tin() {
    let div = document.getElementById("tempfeel");
    div.style.marginRight = "0px";
    div.style.opacity = "65%";
}

function tout() {
    let div = document.getElementById("tempfeel");
    div.style.marginRight = "-100px";
    div.style.opacity = "0%";
}

let menustatus;

function btnreveal() {
    let cur = document.getElementById('ddarrow').style.transform;
    let btns = document.getElementById('btngroup');
    if (cur == "" || cur == "rotate(90deg)") {
        menustatus = "open";

        document.getElementById('ddarrow').style.transform = "rotate(180deg)";
        btns.style.maxHeight = "60vh";
        btns.style.borderBottomLeftRadius = "10px";
        btns.style.borderBottomRightRadius = "10px";
        setTimeout(() => { btns.style.overflow = "auto"; }, 300);
    } else {
        menustatus = "closed";

        document.getElementById('ddarrow').style.transform = "rotate(90deg)";
        btns.style.overflow = "hidden";
        btns.style.maxHeight = "0vh";
        btns.style.borderBottomLeftRadius = "0px";
        btns.style.borderBottomRightRadius = "0px";
    }
}

/*(function() {
    console.log('this page has been opened');
})();*/

document.addEventListener('mouseup', function(e) {
    let container = document.getElementById('btngroup1');
    let btns = document.getElementById('btngroup');
    if (document.getElementById("rmbmenu").style.display == "block") {
        document.getElementById("rmbmenu").style.opacity = "0%";
        document.getElementById("rmbmenu").style.display = "none";
    }
    if (!container.contains(e.target)) {
        menustatus = "closed";

        document.getElementById('ddarrow').style.transform = "rotate(90deg)";
        btns.style.overflow = "hidden";
        btns.style.maxHeight = "0vh";
        btns.style.borderBottomLeftRadius = "0px";
        btns.style.borderBottomRightRadius = "0px";
    }
});

function user() {
    let Un = localStorage.getItem("Username");
    if (Un == null) {
        let Name = prompt("Hva heter du?")
        localStorage.setItem("Username", Name);
    } else if (Un == "null") {
        document.getElementById("headertext").innerHTML = "Velkommen til Rubens index!";
    } else {
        document.getElementById("headertext").innerHTML = "Velkommen tilbake " + Un;
    }
}

function userremove() {
    localStorage.removeItem("Username");
    location.reload();
}


function menu(e) {
    event.preventDefault();
    const menu = document.getElementById("rmbmenu");
    menu.style.display = "block";
    menu.style.opacity = "100%";

    let x = e.clientX;
    let y = e.clientY;

    menu.style.left = x + "px";
    menu.style.top = y + "px";

    if (menu.offsetWidth < 115) {
        menu.style.left = x - 116 + "px";
    }
}

let clocktype = "digital";

function timeswitch() {
    if (clocktype == "digital") {
        clocktype = "analog";
        document.getElementById("digital").style.display = "none";
        document.getElementById("analog").style.display = "initial";
    } else if (clocktype == "analog") {
        clocktype = "digital";
        document.getElementById("digital").style.display = "initial";
        document.getElementById("analog").style.display = "none";
    }
}