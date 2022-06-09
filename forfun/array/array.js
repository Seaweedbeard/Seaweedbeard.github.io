/*
const filmer = [
    { navn: "Twilight", score: "1" },
    { navn: "Avengers", score: "10" },
    { navn: "The nightmare before christmas", score: "10" },
    { navn: "Book club", score: "10" },
    { navn: "Footloose", score: "8" },
    { navn: "Salt", score: "10" },
    { navn: "Dirty dancing", score: "7" },
    { navn: "Air bud", score: "7" },
    { navn: "American murder", score: "8" },
    { navn: "Dune", score: "7" }
];

function arraything() {
    for (var film of filmer) {
        console.log(film["navn"]);
    }
}
*/
let game = "";
let button = "";

function pickgame(clicked_id) {
    if (game != "") {
        document.getElementById(game).style.display = "none";
        document.getElementById(button).style.backgroundColor = "#FFFFFF00";
    }
    let x = clicked_id;
    document.getElementById("info").style.display = "none";
    document.getElementById(x).style.backgroundColor = "#FFFFFF32";
    button = x;
    x = x.substring(0, 3);
    document.getElementById(x).style.display = "block";
    document.getElementById(x).style.display = "block";
    game = x;
    if (clicked_id == "tttictactoe") {
        document.title = "Tre på rad";
    } else if (clicked_id == "hangman") {
        document.title = "Hangman";
    } else if (clicked_id == "clicker") {
        document.title = "Clicker";
    } else if (clicked_id == "western") {
        document.title = "Western";
    }
}

//TIC TAC TOE
let turn = "X";
let pastturn = "O";
let currentbox = "";
const align = new Set();

function reset() {
    document.getElementById("reset").innerHTML = "RESET";
    document.getElementById("winner").innerHTML = "";
    document.getElementById("reset").style.display = "none";
    for (var i of align) {
        let x = i.substring(2);
        document.getElementById(x).innerHTML = "";
    }
    align.clear();
    turn = "X";
    pastturn = "O";
    document.getElementById("XOturn").innerHTML = turn;
    document.getElementById("loglist").innerHTML = "";
}

function symbol(clicked_id) {
    if (document.getElementById("winner").innerHTML != "") { return false }

    currentbox = clicked_id;
    let box = document.getElementById(clicked_id).innerHTML;

    if (box == "") {
        if (turn == "X") {
            document.getElementById(clicked_id).style.color = "red";
        } else if (turn == "O") {
            document.getElementById(clicked_id).style.color = "blue";
        }
        document.getElementById(clicked_id).innerHTML = turn;

        align.add(turn + " " + clicked_id);

        document.getElementById("loglist").innerHTML = "";
        for (var move of align) {
            let nmove = move.replace("ttt", "plasserte på rute ")
            document.getElementById("loglist").innerHTML += "<li>" + nmove + "</li>";
        }
    } else {
        return false;
    };

    if (turn == "X") { turn = "O" } else if (turn == "O") { turn = "X" };
    if (pastturn == "X") { pastturn = "O" } else if (pastturn == "O") { pastturn = "X" };

    document.getElementById("XOturn").innerHTML = turn
    setTimeout(win, 1);
}

function win() {
    let one = document.getElementById("ttt1").innerHTML;
    let two = document.getElementById("ttt2").innerHTML;
    let three = document.getElementById("ttt3").innerHTML;
    let four = document.getElementById("ttt4").innerHTML;
    let five = document.getElementById("ttt5").innerHTML;
    let six = document.getElementById("ttt6").innerHTML;
    let seven = document.getElementById("ttt7").innerHTML;
    let eight = document.getElementById("ttt8").innerHTML;
    let nine = document.getElementById("ttt9").innerHTML;
    let sone = document.getElementById("ttt1").style;
    let stwo = document.getElementById("ttt2").style;
    let sthree = document.getElementById("ttt3").style;
    let sfour = document.getElementById("ttt4").style;
    let sfive = document.getElementById("ttt5").style;
    let ssix = document.getElementById("ttt6").style;
    let sseven = document.getElementById("ttt7").style;
    let seight = document.getElementById("ttt8").style;
    let snine = document.getElementById("ttt9").style;

    if (one == "X" && two == "X" && three == "X") {
        document.getElementById("winner").innerHTML = "X VINNER";
        document.getElementById("reset").style.display = "initial";
        sone.color = "green";
        stwo.color = "green";
        sthree.color = "green";
    } else if (one == "O" && two == "O" && three == "O") {
        document.getElementById("winner").innerHTML = "O  VINNER";
        document.getElementById("reset").style.display = "initial";
        sone.color = "green";
        stwo.color = "green";
        sthree.color = "green";
    } else if (four == "X" && five == "X" && six == "X") {
        document.getElementById("winner").innerHTML = "X  VINNER";
        document.getElementById("reset").style.display = "initial";
        sfour.color = "green";
        sfive.color = "green";
        ssix.color = "green";
    } else if (four == "O" && five == "O" && six == "O") {
        document.getElementById("winner").innerHTML = "O  VINNER";
        document.getElementById("reset").style.display = "initial";
        sfour.color = "green";
        sfive.color = "green";
        ssix.color = "green";
    } else if (seven == "X" && eight == "X" && nine == "X") {
        document.getElementById("winner").innerHTML = "X  VINNER";
        document.getElementById("reset").style.display = "initial";
        sseven.color = "green";
        seight.color = "green";
        snine.color = "green";
    } else if (seven == "O" && eight == "O" && nine == "O") {
        document.getElementById("winner").innerHTML = "O  VINNER";
        document.getElementById("reset").style.display = "initial";
        sseven.color = "green";
        seight.color = "green";
        snine.color = "green";
    } else if (one == "X" && four == "X" && seven == "X") {
        document.getElementById("winner").innerHTML = "X  VINNER";
        document.getElementById("reset").style.display = "initial";
        sone.color = "green";
        sfour.color = "green";
        sseven.color = "green";
    } else if (one == "O" && four == "O" && seven == "O") {
        document.getElementById("winner").innerHTML = "O  VINNER";
        document.getElementById("reset").style.display = "initial";
        sone.color = "green";
        sfour.color = "green";
        sseven.color = "green";
    } else if (two == "X" && five == "X" && eight == "X") {
        document.getElementById("winner").innerHTML = "X  VINNER";
        document.getElementById("reset").style.display = "initial";
        stwo.color = "green";
        sfive.color = "green";
        seight.color = "green";
    } else if (two == "O" && five == "O" && eight == "O") {
        document.getElementById("winner").innerHTML = "O  VINNER";
        document.getElementById("reset").style.display = "initial";
        stwo.color = "green";
        sfive.color = "green";
        seight.color = "green";
    } else if (three == "X" && six == "X" && nine == "X") {
        document.getElementById("winner").innerHTML = "X  VINNER";
        document.getElementById("reset").style.display = "initial";
        sthree.color = "green";
        ssix.color = "green";
        snine.color = "green";
    } else if (three == "O" && six == "O" && nine == "O") {
        document.getElementById("winner").innerHTML = "O  VINNER";
        document.getElementById("reset").style.display = "initial";
        sthree.color = "green";
        ssix.color = "green";
        snine.color = "green";
    } else if (one == "X" && five == "X" && nine == "X") {
        document.getElementById("winner").innerHTML = "X  VINNER";
        document.getElementById("reset").style.display = "initial";
        sone.color = "green";
        sfive.color = "green";
        snine.color = "green";
    } else if (one == "O" && five == "O" && nine == "O") {
        document.getElementById("winner").innerHTML = "O  VINNER";
        document.getElementById("reset").style.display = "initial";
        sone.color = "green";
        sfive.color = "green";
        snine.color = "green";
    } else if (three == "X" && five == "X" && seven == "X") {
        document.getElementById("winner").innerHTML = "X  VINNER";
        document.getElementById("reset").style.display = "initial";
        sthree.color = "green";
        sfive.color = "green";
        sseven.color = "green";
    } else if (three == "O" && five == "O" && seven == "O") {
        document.getElementById("winner").innerHTML = "O  VINNER";
        document.getElementById("reset").style.display = "initial";
        sthree.color = "green";
        sfive.color = "green";
        sseven.color = "green";
    } else if (align.size == 9) {
        document.getElementById("winner").innerHTML = "Uavgjort";
        document.getElementById("reset").style.display = "initial";
    };
}

// /TIC TAC TOE

//HANGMAN

const words = ['admiral', 'aften', 'akt', 'al', 'altan', 'ammalgam',
    'anorakk', 'aroma', 'arr', 'asjett', 'asparges', 'aspik', 'asyl', 'atlas',
    'atom', 'avl', 'avløp', 'åk', 'åker', 'ånd', 'ånde', 'åpning', 'åre', 'balje',
    'balkong', 'ball', 'ballett', 'balsam', 'bamse', 'banan', 'banjo', 'bark',
    'barm', 'barsel', 'bart', 'basseng', 'bast', 'bataljon', 'batteri', 'baug',
    'bavian', 'båt', 'bær', 'beger', 'bekken', 'belg', 'betennelse', 'bibel',
    'bidé', 'bihule', 'bind', 'binne', 'bissel', 'bjelke', 'bjelle', 'blære',
    'blei', 'bleie', 'blekk', 'blemme', 'blest', 'blink', 'blod', 'blødme',
    'bluse', 'blyant', 'boble', 'bog', 'boms', 'bonus', 'bor', 'borg', 'bøddel',
    'bølge', 'bøtte', 'bøye', 'bram', 'brask', 'bråte', 'brem', 'bresj',
    'brett', 'brille', 'brissel', 'brodd', 'brokk', 'brunst', 'brus', 'brusk',
    'bryl', 'bryter', 'buk', 'bukk', 'bukt', 'bul', 'bunn', 'burka', 'buse',
    'byll', 'bysse', 'daddel', 'dam', 'dåre', 'dåse', 'degge', 'deig', 'dekken',
    'diadem', 'dill', 'dilla', 'diplom', 'diplomat', 'disippel', 'divan',
    'dobb', 'dolp', 'dont', 'dor', 'dorg', 'dørk', 'drage', 'drakt', 'drenasje',
    'dreng', 'dresin', 'dressing', 'drops', 'drøs', 'drøvel', 'drue', 'drunse',
    'dryss', 'due', 'duft', 'dugg', 'dunst', 'dur', 'dus', 'dusj', 'dyne',
    'dynge', 'dyse', 'egg', 'eir', 'eksem', 'emalje', 'emblem', 'entré', 'eske',
    'etappe', 'etui', 'farse', 'farsott', 'faster', 'fatle', 'fe', 'feber',
    'fedme', 'fele', 'felg', 'ferge', 'fett', 'fiken', 'filipens', 'fille',
    'filt', 'finger', 'finne', 'fjes', 'fjon', 'fjøl', 'flak', 'flanell', 'flapp',
    'flåte', 'flekk', 'flenge', 'flens', 'flesk', 'flod', 'flor', 'flørt', 'fløte',
    'flue', 'flukt', 'flygel', 'fold', 'fonn', 'fontene', 'forelegg', 'forheng',
    'foster', 'fot', 'fødsel', 'frityr', 'fromasj', 'frø', 'frøken', 'frue',
    'furu', 'futteral', 'galle', 'gamasje', 'gamp', 'gane', 'garasje', 'garnityr',
    'gasje', 'gebiss', 'gelender', 'gelé', 'gemytt', 'genser', 'gesims', 'geskjeft',
    'gikt', 'gips', 'gissel', 'gjedde', 'gjørme', 'glans', 'glasur', 'glis', 'glitter',
    'glor', 'glorie', 'gluten', 'grabb', 'granat', 'graps', 'grav', 'grevling', 'grind',
    'gro', 'grop', 'grotte', 'grøft', 'grønske', 'grøss', 'grøt', 'grums', 'grut',
    'gryn', 'gryte', 'gubbe', 'gulasj', 'gulp', 'gunst', 'gusj', 'gylf', 'gymnastikk',
    'hake', 'hale', 'ham', 'hanske', 'harpe', 'harpiks', 'hassel', 'havn', 'hår',
    'hæl', 'hekk', 'hems', 'herpes', 'hette', 'hinne', 'hjerne', 'hjul', 'hode',
    'hoff', 'holk', 'host', 'hud', 'humle', 'hump', 'hvelv', 'hvete', 'hylle',
    'hylse', 'hyse', 'igle', 'iglo', 'innside', 'isjas', 'jakke', 'jakt', 'jolle',
    'jord', 'jorde', 'jøde', 'jur', 'jus', 'juv', 'kabal', 'kabel', 'kahytt',
    'kajakk', 'kakkel', 'kakkerlakk', 'kalas', 'kalkyle', 'kalosj', 'kalott',
    'kalv', 'kammer', 'kanal', 'kanne', 'kanon', 'kant', 'kaos', 'kapers', 'kapsel',
    'kar', 'karaffel', 'karamell', 'karm', 'kart', 'kartong', 'kasserolle',
    'katamaran', 'kateter', 'katt', 'kaviar', 'kål', 'kefir', 'kitt', 'kjegle',
    'kjekkas', 'kjelke', 'kjepp', 'kjerne', 'kjertel', 'kjetting', 'kjole',
    'kjortel', 'kjos', 'kjøkken', 'kjøl', 'kjønn', 'kladd', 'klang', 'klase',
    'klatt', 'kli', 'klimaks', 'klink', 'kliss', 'klogg', 'klor', 'klov',
    'klovn', 'kløe', 'kløne', 'klump', 'klut', 'klype', 'klyse', 'knagg',
    'knaus', 'kne', 'knekt', 'knep', 'knokkel', 'knopp', 'knute', 'knyst',
    'kobbel', 'koffert', 'komma', 'kompott', 'kongle', 'konstabel', 'kopp',
    'kork', 'kors', 'korsett', 'kos', 'kost', 'krage', 'krås', 'kreft',
    'krem', 'krill', 'krim', 'kringle', 'krom', 'krone', 'krukke', 'krutong',
    'krydder', 'kube', 'kull', 'kultur', 'kum', 'kumle', 'kumpan', 'kupp',
    'kuppel', 'kurtasje', 'kurv', 'kurve', 'kusine', 'kusk', 'kusma',
    'kuvøse', 'kvalme', 'kveg', 'kveil', 'kvige', 'kvise', 'kyse', 'kyss',
    'lake', 'lakei', 'laken', 'lakk', 'lam', 'lampe', 'lampett', 'lanse',
    'lanterne', 'lapp', 'lapskaus', 'lår', 'ledning', 'lefse', 'legeme',
    'legg', 'lekkasje', 'lekter', 'lektor', 'lem', 'leppe', 'lerke', 'lerret',
    'lesk', 'lest', 'liane', 'liga', 'linjal', 'lisse', 'list', 'lo', 'lomme',
    'los', 'løve', 'lugar', 'lugg', 'lukt', 'lunge', 'lunte', 'lupe', 'lur',
    'lykt', 'lymfe', 'magi', 'magma', 'mais', 'majones', 'manesj', 'mappe',
    'marg', 'marinade', 'marmelade', 'maske', 'massasje', 'masse', 'mast',
    'matiné', 'matros', 'mæle', 'megge', 'melk', 'membran', 'midd', 'milt',
    'molo', 'moms', 'monokkel', 'monter', 'morfin', 'mormon', 'mort', 'mos',
    'moster', 'møne', 'mørtel', 'mudder', 'mule', 'munk', 'muskedunder', 'muslim',
    'mynt', 'navle', 'nebb', 'negl', 'nek', 'nektar', 'nepe', 'nerve', 'nese',
    'nestle', 'neve', 'nips', 'nisje', 'nisse', 'niste', 'nomade', 'nøkkel',
    'nøtt', 'nupp', 'nylon', 'nymf', 'nyp', 'nype', 'nyre', 'nys', 'nytelse',
    'oberst', 'omhu', 'omkrets', 'onkel', 'opium', 'organ', 'orgel', 'orm',
    'ovn', 'ødem', 'økt', 'øre', 'østrogen', 'pai', 'palass', 'palme', 'panne',
    'pant', 'paprika', 'paralyse', 'pasta', 'paté', 'patt', 'påle', 'pedal',
    'pelikan', 'pels', 'pendel', 'penn', 'pennal', 'pensel', 'perle', 'perm',
    'perrong', 'pest', 'pike', 'piknik', 'pil', 'pilk', 'pilot', 'pinne',
    'pir', 'pirat', 'plagg', 'plakk', 'planet', 'planke', 'plaster', 'plate',
    'pledd', 'plett', 'plog', 'plomme', 'pløs', 'plugg', 'plysj', 'pokal',
    'pomade', 'pomp', 'pore', 'port', 'portemoné', 'pose', 'post', 'postei',
    'potet', 'potte', 'pøbel', 'pølse', 'prakt', 'prest', 'prim', 'prolaps', 'propp',
    'pryd', 'pudder', 'pudding', 'pukkel', 'pult', 'pulver', 'puma', 'pumpe', 'purke',
    'puss', 'pute', 'pynt', 'rabarbra', 'radar', 'ramme', 'rand', 'ransel', 'ras',
    'ratt', 'ravn', 'råne', 'regatta', 'reir', 'reke', 'rektor', 'rem', 'remulade',
    'revy', 'ridder', 'rim', 'ring', 'rive', 'rogn', 'rombe', 'rosin', 'rot', 'rømme',
    'rønne', 'rør', 'røre', 'røver', 'rug', 'ruke', 'rulett', 'rus', 'sabel', 'saft',
    'sal', 'salme', 'salt', 'salve', 'same', 'sarkofag', 'sauna', 'saus', 'savanne',
    'såpe', 'seddel', 'sekk', 'seminar', 'sennep', 'sepe', 'serum', 'serviett', 'sete',
    'seter', 'sevje', 'sigd', 'sikkel', 'sil', 'silo', 'siv', 'sjakt', 'sjark', 'sjarm',
    'sjy', 'skabb', 'skaft', 'skalk', 'skalle', 'skammel', 'skandale', 'skål', 'skinn',
    'skipper', 'skje', 'skjerm', 'sklerose', 'sklie', 'skodde', 'skonnert', 'skorpe',
    'skorstein', 'skøy', 'skralle', 'skrål', 'skrin', 'skritt', 'skrog', 'skrott', 'skum',
    'skurk', 'skute', 'skvett', 'skvulp', 'slam', 'slange', 'slarv', 'slegge', 'slim',
    'slintre', 'slott', 'slør', 'sløyd', 'slurk', 'sluse', 'smak', 'smekk', 'sminke',
    'smitte', 'smør', 'smøring', 'smørje', 'smug', 'smule', 'smult', 'smuss', 'snabb',
    'snabel', 'snerk', 'snert', 'snile', 'snor', 'snorkel', 'snøre', 'snørr', 'snue',
    'snus', 'sokk', 'sokkel', 'sorbet', 'sødme', 'søle', 'sørpe', 'søyle', 'spade', 'spake',
    'spann', 'sparkel', 'speil', 'spekk', 'spelt', 'spenne', 'spiker', 'spinat', 'spindel',
    'spion', 'spiral', 'spire', 'sport', 'sprekk', 'sprøyt', 'spytt', 'stabbur', 'stake',
    'stamme', 'stamp', 'stang', 'stappe', 'stativ', 'staude', 'staur', 'stav', 'stift',
    'stim', 'sting', 'stjert', 'stokk', 'stol', 'stolpe', 'støpsel', 'støvel', 'stråle',
    'streptokokk', 'strikk', 'strømpe', 'strøssel', 'struma', 'struts', 'stuing', 'sukett',
    'sule', 'suppe', 'sus', 'svie', 'svinn', 'sviske', 'svor', 'svulst', 'sydvest', 'sykdom',
    'syklus', 'syl', 'sylte', 'taffel', 'talg', 'tallerken', 'talong', 'tang', 'tann',
    'tante', 'tapet', 'tapir', 'tapp', 'tarm', 'taske', 'tast', 'tater', 'tavle', 'tå',
    'tår', 'te', 'teater', 'teft', 'tentakkel', 'teppe', 'terreng', 'terskel', 'tine',
    'tinning', 'tivoli', 'toddy', 'tomat', 'tommel', 'tøddel', 'tønne', 'tøs', 'tøyte',
    'trakt', 'traktor', 'trall', 'tram', 'trampett', 'trampoline', 'tran', 'trasé', 'trau',
    'traume', 'trav', 'trål', 'træl', 'trekk', 'trell', 'tresk', 'trommel', 'trompet',
    'trøffel', 'trubadur', 'trumf', 'truse', 'trut', 'tryne', 'tube', 'tunnel', 'tupp',
    'turn', 'tusj', 'tut', 'tvilling', 'tyv', 'urne', 'utslett', 'vagle', 'valke', 'vals',
    'vandel', 'vanilje', 'vask', 'væske', 'velling', 'ventrikkel', 'veranda', 'verk', 'veske',
    'vev', 'vigør', 'vimpel', 'vindu', 'vippe', 'vogn', 'voks', 'voll', 'vom', 'vorte',
    'vræl', 'vulkan', 'ymse', 'yngel', 'ynk', 'yoghurt'
];
let word;
let wordletters = [];
const guessed = [];
const wrongguessed = [];
let rightguessed = 0;
let guess;
let permahealth;
let health;

function choosehealth(clicked_id) {
    let lives = clicked_id;
    if (lives == "Let") {
        health = 15;
    } else if (lives == "Med") {
        health = 11;
    } else if (lives == "Van") {
        health = 6;
    }
    permahealth = health;
    document.getElementById("hmhealth").innerHTML = health + " liv igjen";
    document.getElementById("hmp").style.display = "initial";
}

function hmreset() {
    word = "";
    wordletters = [];
    guessed.length = 0;
    wrongguessed.length = 0;
    rightguessed = 0;
    guess = "";
    health = permahealth;
    fill();
    document.getElementById("hmguess").innerHTML = "";
    document.getElementById("hmguessed").innerHTML = "";
    layout();
    document.getElementById("hmhealth").innerHTML = health + " liv igjen";
    document.getElementById("hminputaround").innerHTML = '<input class="hminput" id="hminput" oninput="checklength()" placeholder="Klikk her så skriver du inn bokstavene">';
    document.getElementById("hmreset").style.display = "none";
    document.getElementById("hminput").style.display = "initial";
}

function fill() {
    let amount = words.length;
    let num1 = Math.floor(Math.random() * amount);
    let num2 = Math.floor(Math.random() * amount);
    word = words[num1] + words[num2];
    wordletters = word.toUpperCase().split("");
}
window.onload = fill();

function layout() {
    let area = document.getElementById("hmguess");
    for (let i = 0; i < word.length; i++) {
        area.innerHTML += "<div class='hmletter' id='hm" + i + "'></div>";
    }
}

function checklength() {
    let input = document.getElementById("hminput");
    input.maxLength = "1";
    if (input.value > 1) {
        return false
    }
    hangmanguess();
}

function hangmanguess() {
    let input = document.getElementById("hminput");
    guess = input.value;
    guess = guess.replace(/[^a-åA-ÅøæØÆ]/, '');
    if(guess == '') {
        input.value = "";
        console.log(guess);
        return false;
    }
    guess = guess.toUpperCase();
    if (guessed.includes(guess)) {
        alert("Already guessed");
        input.value = "";
        return false;
    }
    guessed.push(guess);
    input.value = "";
    checkguess();
}

function checkguess() {
    for (var i = 0; i < word.length; i++) {
        if (wordletters[i] == guess) {
            document.getElementById("hm" + i).innerHTML = guess;
            rightguessed++;
        }
    }
    if (rightguessed == wordletters.length) {
        document.getElementById("hminput").style.display = "none";
        document.getElementById("hminputaround").innerHTML = "<span class='hmfinisher' style='font-size: 4.35vw; color: green;'>DU VANT</span>";
        document.getElementById("hmreset").style.display = "initial";
        for (let i = 0; i < wordletters.length; i++) {
            document.getElementById("hm" + i).style.borderColor = "green";
            document.getElementById("hm" + i).style.color = "green";
        }
    }
    if (wordletters.includes(guess) == false) {
        wrongguessed.push(guess);
        document.getElementById("hmguessed").innerHTML = "";
        for (let i = 0; i < wrongguessed.length; i++) {
            document.getElementById("hmguessed").innerHTML += wrongguessed[i] + ", ";
        }
        health--;
        document.getElementById("hmhealth").innerHTML = health + " liv igjen";
        if (health == 0) {
            document.getElementById("hminput").style.display = "none";
            document.getElementById("hminputaround").innerHTML = "<span class='hmfinisher' style='font-size: 4.35vw; color: red;'>DU TAPTE</span>";
            document.getElementById("hmreset").style.display = "initial";

            for (let i = 0; i < wordletters.length; i++) {
                document.getElementById("hm" + i).style.borderColor = "red";
                if (document.getElementById("hm" + i).innerHTML == "") {
                    document.getElementById("hm" + i).style.color = "red";
                    document.getElementById("hm" + i).innerHTML = wordletters[i];
                }
            }
        }
    }
}

// /HANGMAN

// CLICKER

let cp = 0;
let crautoprice = [15, 1000, 110500, 11600030, 1100995200, 140505050505, 20203401100607, 349867111111234];
const crautobaseprice = [15, 1000, 110500, 11600030, 1100995200, 140505050505, 20203401100607, 349867111111234];
let crautoamount = [0, 0, 0, 0, 0, 0, 0, 0];
const crautobaseamount = [0, 0, 0, 0, 0, 0, 0, 0];
let scp = localStorage.getItem("points");
let sap = localStorage.getItem("price");
let saa = localStorage.getItem("bought");

function setup() {
    if (scp != null) {
        cp = Number(scp);
        crautoprice = sap.split(",");
        crautoamount = saa.split(",");
    } else {
        crautoprice = crautobaseprice.slice(0);
        crautoamount = crautobaseamount.slice(0);
    }
    for (let i = 0; i < crautoprice.length; i++) {
        document.getElementById("crauto" + i + "price").innerHTML = crautoprice[i];
        document.getElementById("crauto" + i + "bought").innerHTML = crautoamount[i];
        document.getElementById("crauto" + i + "boughtthing").style.opacity = "20%";
        if (crautoamount[i] != 0) {
            document.getElementById("crauto" + i + "boughtthing").style.opacity = "100%";
        } else {
            document.getElementById("crauto" + i + "boughtthing").style.opacity = "20%";
        }
    }
    document.getElementById("crbtn").innerHTML = cp;
    checkshop();
}

function klikk() {
    for (let i = 0; i < crautoamount.length; i++) {
        cp = cp + crautoamount[i] * 10 ** i;
    }
    cp = cp + 1;
    document.getElementById("crbtn").innerHTML = cp;
    checkshop();
}

function checkshop() {
    for (let i = 0; i < crautoamount.length; i++) {
        if (cp >= crautoprice[i]) {
            document.getElementById("crauto" + i).style.opacity = "100%";
            document.getElementById("crauto" + i + "btn").style.cursor = "pointer";
        } else {
            document.getElementById("crauto" + i).style.opacity = "20%";
            document.getElementById("crauto" + i + "btn").style.cursor = "not-allowed";
        }
    }
}

function shop(clicked_id) {
    let id = clicked_id;

    for (let i = 0; i < crautoprice.length; i++) {
        if (id == "crauto" + i + "btn") {
            if (cp >= crautoprice[i]) {
                crautoamount[i]++;
                document.getElementById("crauto" + i + "bought").innerHTML = crautoamount[i];
                document.getElementById("crauto" + i + "boughtthing").style.opacity = "100%";
                cp = cp - crautoprice[i];
                document.getElementById("crbtn").innerHTML = cp;
                crautoprice[i] = Math.floor(crautobaseprice[i] * 1.25 ** crautoamount[i]);
                document.getElementById("crauto" + i + "price").innerHTML = crautoprice[i];
            } else if (cp < crautoprice[i]) {
                return false;
            }
        }
    }
    checkshop();
}

function save() {
    localStorage.setItem("points", cp);
    localStorage.setItem("price", crautoprice);
    localStorage.setItem("bought", crautoamount);
    console.log("Progress saved");
}

function clearsave() {
    let reset = confirm("Sikker på at du vil starte på nytt?");
    if (reset == true) {
        //localStorage.clear();
        localStorage.removeItem("points");
        localStorage.removeItem("price");
        localStorage.removeItem("bought");
        scp = null;
        cp = 0;
        setup();
    } else if (reset == false) {
        return false;
    }
}

// /CLICKER