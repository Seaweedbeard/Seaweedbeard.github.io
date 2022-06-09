let list = [];

document.addEventListener('keypress', function(e) {
    if (e.key === "Enter") {
        additem();
    }
});

function additem() {
    let input = document.getElementById("listinput");
    if (input.value == "") {
        return false;
    }
    list.push(input.value);
    input.value = "";
    input.autoFocus;
    displaylist();
}

function displaylist() {
    document.getElementById("listarea").innerHTML = "";

    for (let i = 0; i < list.length; i++) {
        document.getElementById("listarea").innerHTML += '<div class="listpoint" id="listpoint' + i + '"><input type="checkbox"> ' + list[i] + '<button class="deletebutton" id="' + list[i] + '" onclick="deleteitem(this.id)">X</button></input></div>';
    }
}

function deleteitem(clicked_id) {
    let id = clicked_id;
    list = list.filter(v => v !== id);
    displaylist();
}