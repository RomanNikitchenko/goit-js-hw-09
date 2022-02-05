
const form = document.querySelector('.form');

form.addEventListener("submit", handleSubmit);

let isPressed = false;

function handleSubmit(event) {
  event.preventDefault();

  if (isPressed) {
    return
  }
  isPressed = true;

  const {
    elements: { delay, step, amount }
  } = event.currentTarget;
  
  let timerId = null;
  let number = 1;
  let numDelay = Number(delay.value);
  let numStep = Number(step.value);
  let numAmount = Number(amount.value);

  setTimeout(() => {
    createPromise(number, numDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    
    timerId = setInterval(() => {
      number += 1;

      if (number > numAmount) {
        clearInterval(timerId);
        isPressed = false;
        return;
      };
      
      numDelay += numStep
      
      createPromise(number, numDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    }, numStep);
  }, numDelay);
};

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      resolve({
        position: position,
        delay: delay,
      });
    } else {
      reject({
        position: position,
        delay: delay,
      });
    }  
  });
};
