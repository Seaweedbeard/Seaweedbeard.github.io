function changeicon(clicked_id) {
    let id = clicked_id;
    console.log(id);
    if (id == "ph") {
        document.getElementById('favicon').setAttribute('href', 'icons/PH_icon.png');
    } else if (id == "yt") {
        document.getElementById('favicon').setAttribute('href', 'icons/youtube_icon.ico');
    } else if (id == "sw") {
        document.getElementById('favicon').setAttribute('href', 'icons/Seaweedbeard.png');
    }
}

/*
let frame = 1;
        animation();

        function animation() {
            let picture = "../../Bilder/Sprite/BatSprite/sprite_0" + frame + " - Copy.png";
            document.getElementById('favicon').setAttribute('href', picture);
            frame++;
            if (frame == 5) { frame = 1; }
            setTimeout(animation, 200);
        }

        */