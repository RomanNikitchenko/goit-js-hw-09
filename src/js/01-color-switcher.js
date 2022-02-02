const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector("body");

let timerId = null;
let disabled = false;

btnStart.addEventListener("click", onRandomBackgroundColor);

function onRandomBackgroundColor() {
  if (disabled) {
    return;
  };

  disabled = true;
  btnStart.setAttribute("disabled", "disabled");

  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

btnStop.addEventListener("click", offRandomBackgroundColor);

function offRandomBackgroundColor() {
  btnStart.removeAttribute("disabled");
  disabled = false;
  clearInterval(timerId);
};
