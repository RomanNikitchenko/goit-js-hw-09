// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import '../sass/timer.scss';

const dateTimePicker = document.querySelector("#datetime-picker");
const dataStart = document.querySelector('[data-start]');

const sdays = document.querySelector('[data-days]');
const shours = document.querySelector('[data-hours]');
const sminutes = document.querySelector('[data-minutes]');
const sseconds = document.querySelector('[data-seconds]');
const timer = document.querySelector('.timer');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr(dateTimePicker, options);

let timerId = null;
let disabled = false;

dataStart.setAttribute("disabled", "disabled");

dateTimePicker.addEventListener('input', () => {
  const appointedTime = new Date(dateTimePicker.value);
  const subtractTime = appointedTime - new Date();

  if (subtractTime < 0) {
    dataStart.setAttribute("disabled", "disabled");
    window.alert("Please choose a date in the future")
    return
  }

  dataStart.removeAttribute("disabled");
});


dataStart.addEventListener('click', () => {
  dataStart.setAttribute("disabled", "disabled");

  if (disabled) {
    return;
  };
  disabled = true;

  const appointedTime = new Date(dateTimePicker.value);

  timerId = setInterval(() => {
    const subtractTime = appointedTime - new Date();

    if (subtractTime <= 0) {
      clearInterval(timerId);
      disabled = false;
      return
    }

    const time = convertMs(subtractTime)

    timeDisplays(time);
  }, 1000);
});

function timeDisplays({ days, hours, minutes, seconds }) {
  sdays.textContent = `${days}`;
  shours.textContent = `${hours}`;
  sminutes.textContent = `${minutes}`;
  sseconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};


