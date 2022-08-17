const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const colorBody = document.querySelector('body');


startBtn.addEventListener('click', changeColor);
stopBtn.addEventListener('click', onBtnStop);
stopBtn.setAttribute('disabled', true);

let isActive = false;
let timerId = null;


function changeColor(e){
    if (isActive){
        return;
    }

    isActive = true;

    colorBody.style.backgroundColor = getRandomHexColor();
    startBtn.setAttribute('disabled', true);
    stopBtn.removeAttribute('disabled', true);
    timerId = setInterval(() => {
        colorBody.style.backgroundColor = getRandomHexColor();
        startBtn.setAttribute('disabled', true);
    }, 1000);
}

function onBtnStop(e){
    isActive = false;
    startBtn.removeAttribute('disabled', true);
    stopBtn.setAttribute('disabled', true);
    clearInterval(timerId);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}