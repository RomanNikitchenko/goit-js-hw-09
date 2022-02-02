// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const inputdatetimePicker = document.querySelector("#datetime-picker");
const btnDataStart = document.querySelector('[data-start]');

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

flatpickr(inputdatetimePicker, options);

