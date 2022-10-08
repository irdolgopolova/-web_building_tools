import { diffDates, diffToHtml } from "./datecalc.js";
import { formatError } from "./utils.js";
import { startTime, stopTime } from "./timer.js";
import { openTab } from "./tabs.js";
import './../css/style.css';
import chunk from "lodash/chunk";

console.log(chunk(["a", "b", "c", "d"]), 2);

const dateCalcForm = document.getElementById("datecalc");
const dateCalcResult = document.getElementById("datecalc__result");

dateCalcForm.addEventListener("submit", handleCalcDates);

function handleCalcDates(event) {
    dateCalcResult.innerHTML = "";
    event.preventDefault();

    let { firstDate, secondDate } = event.target.elements;
    firstDate = firstDate.value, secondDate = secondDate.value;

    if (firstDate && secondDate) {
        const diff = diffDates(firstDate, secondDate);
        dateCalcResult.innerHTML = diffToHtml(diff);
    }
    else dateCalcResult.innerHTML = formatError("Для расчета промежутка необходимо заполнить оба поля");
}

const timerForm = document.getElementById("timer_form");
let timerId = 0;

timerForm.addEventListener("submit", handleStartTimer);
timerForm.addEventListener("reset", handleEndTimer);

function handleStartTimer(event) {
    event.preventDefault();

    timerId = startTime();
}

function handleEndTimer(event) {
    event.preventDefault();
    stopTime(timerId);
}


const tabsBtn = document.getElementsByClassName("tablinks");
for (let btn of tabsBtn) {
    btn.addEventListener("click", (event) => {
        openTab(event, event.target.dataset.tab)
    });
}
