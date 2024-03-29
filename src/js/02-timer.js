import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import '../sass/timer.scss';
import moment from 'moment';

const dateTimePicker = document.querySelector('#datetime-picker');
const dataStart = document.querySelector('[data-start]');

const sdays = document.querySelector('[data-days]');
const shours = document.querySelector('[data-hours]');
const sminutes = document.querySelector('[data-minutes]');
const sseconds = document.querySelector('[data-seconds]');

let appointedTime;
let subtractTime;

const currentDate = moment().format('YYYY-MM-DD HH:mm');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: `${currentDate}`,
  minuteIncrement: 1,
  onClose() {
    if (subtractTime < 0) {
      window.alert('Please choose a date in the future');
      clearInterval(timerId);
      sdays.textContent = '00';
      shours.textContent = '00';
      sminutes.textContent = '00';
      sseconds.textContent = '00';
    }
  },
};

flatpickr(dateTimePicker, options);

let timerId = null;

dataStart.setAttribute('disabled', 'disabled');

dateTimePicker.addEventListener('input', e => {
  const { value } = e.currentTarget;
  appointedTime = moment(value, 'YYYY-MM-DD HH:mm:ss');
  subtractTime = moment(appointedTime).diff(moment(), 'milliseconds');

  if (subtractTime < 0) {
    dataStart.setAttribute('disabled', 'disabled');
    return;
  }

  dataStart.removeAttribute('disabled');
});

dataStart.addEventListener('click', () => {
  dataStart.setAttribute('disabled', 'disabled');

  clearInterval(timerId);

  const appointedTime = moment(dateTimePicker.value, 'YYYY-MM-DD HH:mm:ss');

  timerId = setInterval(() => {
    const subtractTime = moment(appointedTime).diff(moment(), 'milliseconds');

    if (subtractTime <= 0) {
      clearInterval(timerId);
      return;
    }

    const time = convertMs(subtractTime);

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
}

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
}
