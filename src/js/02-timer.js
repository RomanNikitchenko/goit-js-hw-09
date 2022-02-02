// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const dateTimePicker = document.querySelector("#datetime-picker");
const dataStart = document.querySelector('[data-start]');

const sdays = document.querySelector('[data-days]');
const shours = document.querySelector('[data-hours]');
const sminutes = document.querySelector('[data-minutes]');
const sseconds = document.querySelector('[data-seconds]');

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

dataStart.setAttribute("disabled", "disabled");

dateTimePicker.addEventListener('input', () => {
  const appointedTime = new Date(dateTimePicker.value);
  const subtractTime = appointedTime - new Date();

  if (subtractTime < 0) {
    window.alert("Please choose a date in the future")
    return
  }

  dataStart.removeAttribute("disabled");
});


let timerId = null;
let disabled = false;

dataStart.addEventListener('click', () => {

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

    console.log(convertMs(subtractTime));
  }, 1000);

});


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

