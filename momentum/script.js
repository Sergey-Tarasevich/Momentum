// DOM Elements
const time = document.querySelector('.time'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus');
btn = document.querySelector('.btn');

// Options
const showAmPm = false;

// Show Time
function showTime() {
    // let today = new Date(2020, 10, 21, 16, 11, 00)
    let today = new Date()
    hour = today.getHours()
    min = today.getMinutes()
    sec = today.getSeconds()
    const options = { weekday: 'long', month: 'long', day: 'numeric' };

    // Set AM or PM
    // const amPm = hour >= 12 ? 'PM' : 'AM';

    // 12hr Format
    // hour = hour % 12 || 12;

    // 24hr Format
    hour = hour % 24 || 24;

    // Output Time
    document.querySelector('.time').innerHTML = `${today.toLocaleDateString('en-EN', options)}<br>${addZero(hour)}:${addZero(min)}:${addZero(sec)}`;
    setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(s) {
    return (parseInt(s, 10) < 10 ? '0' : '') + s;
}

// Set Background and Greeting
function setBgGreet() {

    // let today = new Date(2020, 10, 21, 16, 11, 00)
    let today = new Date(),
        hour = today.getHours();

    if (hour > 6 && hour < 12) {
        // Morning
        document.body.style.backgroundImage =
            "url('../momentum/assets/images/morning/01.jpg')";
        greeting.textContent = 'Good Morning, ';
        //document.body.style.color = 'orange';
        document.body.style.color = 'white';

    } else if (hour > 12 && hour < 18) {
        // Afternoon (day)
        document.body.style.backgroundImage =
            "url('../momentum/assets/images/day/01.jpg')";
        // console.log('document.body.style.backgroundImage')

        greeting.textContent = 'Good Afternoon, ';
        //document.body.style.color = 'green';

    } else if (hour > 18 && hour < 24) {
        // Evening
        document.body.style.backgroundImage =
            "url('../momentum/assets/images/evening/01.jpg')";
        greeting.textContent = 'Good Evening, ';
        //document.body.style.color = 'yellow';
    } else {
        // Night
        document.body.style.backgroundImage =
            "url('../momentum/assets/images/night/01.jpg')";
        greeting.textContent = 'Good Night, ';
        //document.body.style.color = 'grey';
    }

}

// Get Name
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = 'Enter Name';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// Set Name
function setName(e) {
    if (e.type === 'click') {
        name.innerText = '';
    }
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            if (name.textContent === '' || !(name.textContent).match(/[a-z]/)) {
                if (localStorage.getItem('name')) {
                    name.innerText = localStorage.getItem('name');
                } else {
                    name.innerText = "Enter Name";
                }
            } else {
                localStorage.setItem('name', e.target.innerText);
            }
            name.blur();
        }
    } else if (e.type === 'blur') {
        if (name.textContent === '' || !(name.textContent).match(/[a-z]/)) {
            if (localStorage.getItem('name')) {
                name.innerText = localStorage.getItem('name');
            } else {
                name.innerText = "Enter Name";
            }

        } else {
            localStorage.setItem('name', e.target.innerText);
        }
    }
}

// Get Focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = 'Please Enter Focus';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

// Set Focus
function setFocus(e) {
    if (e.type === 'click') {
        focus.innerText = '';
    }
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            if (focus.textContent === '' || !(focus.textContent).match(/[a-z]/)) {
                if (localStorage.getItem('focus')) {
                    focus.innerText = localStorage.getItem('focus');
                } else {
                    focus.innerText = "[Enter Focus]";
                }
            } else {
                localStorage.setItem('focus', e.target.innerText);
            }

            focus.blur();
        }
    } else if (e.type === 'blur') {
        if (focus.textContent === '' || !(focus.textContent).match(/[a-z]/)) {
            if (localStorage.getItem('focus')) {
                focus.innerText = localStorage.getItem('focus');
            } else {
                focus.innerText = "[Enter Focus]";
            }
        } else {
            focus.innerText = localStorage.getItem('focus');
        }
    }
}


// btn change pictures
const base = 'assets/images/';
//    'https://raw.githubusercontent.com/irinainina/ready-projects/momentum/momentum/assets/images/night/';

const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;

function viewBgImage(data) {
    const body = document.querySelector('body');
    const src = data;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
        body.style.backgroundImage = `url(${src})`;
    };
}

function getImage() {
    const index = i % images.length;
    let folder;
    if (hour > 6 && hour < 12) {
        folder = 'morning/'
    } else if (hour > 12 && hour < 18) {
        folder = 'day/'
    } else if (hour > 18 && hour < 24) {
        folder = 'evening/'
    } else {
        folder = 'night/'
    }
    const imageSrc = base + folder + images[index];
    viewBgImage(imageSrc);
    i++;
    btn.disabled = true;
    setTimeout(function() { btn.disabled = false }, 1300);

}

// change image every 1h
let refreshImg = setInterval(getImage, 3600000);



//QUOTES
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btnQ = document.querySelector('.btnQ');


async function getQuote() {
    const url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
    const res = await fetch(url);
    const data = await res.json();
    let i = Math.floor(Math.random() * 100);
    if (data.quotes[i].quote.length > 100) {
        getQuote();
    } else {
        blockquote.textContent = data.quotes[i].quote;
        figcaption.textContent = data.quotes[i].author;
    }
}


btn.addEventListener('click', getImage);

name.addEventListener('click', setName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

focus.addEventListener('click', setFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

document.addEventListener('DOMContentLoaded', getQuote);
btnQ.addEventListener('click', getQuote);



// Run
showTime();
getImage();
getName();
getFocus();
setBgGreet();
getQuote();