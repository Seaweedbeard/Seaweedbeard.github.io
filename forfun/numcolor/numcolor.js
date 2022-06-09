function color(clicked_className) {
    shape = clicked_className.animVal;
    thisshape = document.getElementsByClassName(shape);
    console.log(thisshape);
    thisshape.fill = "red";
}