
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
        messageNotifySuccess(position, delay)
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        messageNotifyFailure(position, delay);
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
        messageNotifySuccess(position, delay);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        messageNotifyFailure(position, delay);
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
     
function messageNotifySuccess(position, delay) {
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {
    borderRadius: '20px',
    timeout: 5000,
    success: {
      background: '#64c22d',
    }
  });
};

function messageNotifyFailure(position, delay) {
  Notify.failure(`Rejected promise ${position} in ${delay}ms, click me`, {
    borderRadius: '5px',
    clickToClose: true,
    timeout: 60000,
    failure: {
      background: '#c22d5f',
    }
  });
};
