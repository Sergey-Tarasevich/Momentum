const body = document.querySelector("body");

const IMG_NUMBER = 4;

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `https://github.com/rolling-scopes-school/sergey-tarasevich-JS2020Q3/momentum/momentum/momentum/assets/images${imgNumber + 1}.jpg`
    image.classList.add("bgImage");
    body.prepend(image);
}

function genRandom() {
    const number = Math.floor(Math.random() * 4);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}
init();