function terningkast() {
    var amount = prompt("Hvor mange kast vil du gjøre?");
    const summ = [];

        for (i = 0; i < amount; i++ ) {
            let x = Math.floor(Math.random() * 6) + 1;
            let y = Math.floor(Math.random() * 6) + 1;
            var sum = +x + +y;
            summ.push(sum++)
        }
    
    const counts = {};
    
        for (const num of summ) {
            counts[num] = counts[num] ? counts[num] + 1 : 1;
        }

    document.getElementById('sums').innerHTML = 
        "Sum: 2 Antall: " + counts[2] +"<br>" +
        "Sum: 3 Antall: " + counts[3] +"<br>" +
        "Sum: 4 Antall: " + counts[4] +"<br>" +
        "Sum: 5 Antall: " + counts[5] +"<br>" +
        "Sum: 6 Antall: " + counts[6] +"<br>" +
        "Sum: 7 Antall: " + counts[7] +"<br>" +
        "Sum: 8 Antall: " + counts[8] +"<br>" +
        "Sum: 9 Antall: " + counts[9] +"<br>" +
        "Sum: 10 Antall: " + counts[10] +"<br>" +
        "Sum: 11 Antall: " + counts[11] +"<br>" +
        "Sum: 12 Antall: " + counts[12];
}