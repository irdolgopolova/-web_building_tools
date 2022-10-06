const timerForm = document.getElementById("timer_form");

const hourBlock = document.getElementById("hour");
const minBlock = document.getElementById("min");
const secBlock = document.getElementById("sec");

const submitBtn = timerForm.querySelector("button[type=\"submit\"]");
const resetBtn = timerForm.querySelector("button[type=\"reset\"]");
resetBtn.disabled = true;

export function startTime() {

    let timeInSeconds = getSeconds();

    if (timeInSeconds == 0) {
        return;
    }

    inputDisabled(true);

    let timerId = setInterval(() => {
        timeInSeconds--;

        updateTimer(timeInSeconds);

        if (timeInSeconds == 0) {
            stopTime(timerId);
        }
    }, 1000);

    return timerId;
}

function inputDisabled(disabled = true) {
    hour.disabled = disabled;
    min.disabled = disabled;
    sec.disabled = disabled;

    if (disabled) {
        submitBtn.disabled = true;
        resetBtn.disabled = false;
    } else {
        submitBtn.disabled = false;
        resetBtn.disabled = true;
    }
}

function getValue(block, convertedValue = 1) {
    return Number(block.value) * convertedValue;
}

function getSeconds() {
    let hourInSec = getValue(hourBlock, 3600);
    let minInSec = getValue(minBlock, 60);
    let sec = getValue(secBlock);

    return hourInSec + minInSec + sec;
}

function updateTimerBlock(hour, minute, seconds) {
    hourBlock.value = hour;
    minBlock.value = minute;
    secBlock.value = seconds;
}

function updateTimer(currentTime) {
    let currentHour =  Math.floor(currentTime / 3600);
    let currentMinute = Math.floor((currentTime - (currentHour * 3600)) / 60);
    let currentSeconds = currentTime - (currentHour * 3600) - (currentMinute * 60);

    updateTimerBlock(currentHour, currentMinute, currentSeconds);
}

export function stopTime(timerId) {
    clearInterval(timerId);
    updateTimerBlock(0, 0, 0);
    inputDisabled(false);
    console.log('timer_form__audio');
    document.getElementById('timer_form__audio').play();
}