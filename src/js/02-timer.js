import "flatpickr/dist/themes/dark.css";
import flatpickr from "flatpickr";
import Notiflix from 'notiflix';

const refs = {
    dataTime: document.querySelector('input#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    dataDays: document.querySelector('[data-days]'),
    dataHours: document.querySelector('[data-hours]'),
    dataMinutes: document.querySelector('[data-minutes]'),
    dataSeconds: document.querySelector('[data-seconds]'),
}

refs.startBtn.setAttribute('disabled', true)

let valueTime = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentTime = Date.now();

        const pastTime= selectedDates[0].getTime() - currentTime;

        if (pastTime < 0) {
            refs.startBtn.setAttribute('disabled', true)
            Notiflix.Notify.failure("Please choose a date in the future");
        } else {

            valueTime = selectedDates[0].getTime();
            refs.startBtn.removeAttribute('disabled', true)
        }
    },
};



flatpickr(refs.dataTime, options);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    // return result = value.toString().length === 1 ? `0${value}` : `${value}`
    return value.toString().padStart(2, '0')
}

function updateTimerValues({ days, hours, minutes, seconds }) {
    refs.dataDays.textContent = addLeadingZero(days);
    refs.dataHours.textContent = addLeadingZero(hours)
    refs.dataMinutes.textContent = addLeadingZero(minutes)
    refs.dataSeconds.textContent = addLeadingZero(seconds)

}

refs.startBtn.addEventListener('click', () => {
    let pastTime = Math.ceil((valueTime - Date.now()) / 1000) * 1000

    const timerId = setInterval(() => {
        updateTimerValues(convertMs(pastTime));
        pastTime -= 1000;

    }, 1000)

    setTimeout(() => {
        clearInterval(timerId)
    }, pastTime + 1000)
})