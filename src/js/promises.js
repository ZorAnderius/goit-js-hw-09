import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { notifyInit } from './notify-options';

const ref = {
  submitForm: document.querySelector('.form'),
  firstDelayInput: document.querySelector('input[name="delay"]'),
  delayStepInput: document.querySelector('input[name="step"]'),
  amountInput: document.querySelector('input[name="amount"]'),
};

ref.submitForm.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();
  const firstDelay = +ref.firstDelayInput.value;
  const delayStep = +ref.delayStepInput.value;
  const amount = +ref.amountInput.value;
  for (let position = 1; position <= amount; position++) {
    const delayTime = firstDelay + (position - 1) * delayStep;

    createPromise(position, delayTime)
      .then(({ position, delay }) => {
        Notify.success(
          `Fulfilled promise ${position} in ${delay}ms`,
          notifyInit
        );
      })
      .catch(({ position, delay }) => {
        Notify.failure(
          `Rejected promise ${position} in ${delay}ms`,
          notifyInit
        );
      });
  }
  e.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
