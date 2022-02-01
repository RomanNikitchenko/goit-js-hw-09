const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

console.log(btnStop);

console.log(getRandomHexColor());

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
