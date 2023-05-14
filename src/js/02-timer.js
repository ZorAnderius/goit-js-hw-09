import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { notifyInit } from './notify-options';

let timerTime = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkTime(selectedDates[0]);
  },
};

Report.info(
  "Vitaly Klitschko's timer",
  '"Today, not everyone can see tomorrow,<br/>Rather, everything can be seen, but not everything can be seen."<br/><br/> V. Klitschko',
  'Okey'
);

flatpickr('#datetime-picker', options);

const ref = {
  dateInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minEl: document.querySelector('span[data-minutes]'),
  secEl: document.querySelector('span[data-seconds]'),
};

let dateValue = ref.dateInput.value || null;

ref.dateInput.addEventListener('input', onSetDate);

function onSetDate(e) {
  dateValue = e.target.value;
  if (dateValue) {
    const selectDate = new Date(dateValue);
    const nowDate = Date.now();
    timerTime = selectDate - nowDate;
  } else {
    Notify.warning('Wrong date. Select available date, please', notifyInit);
  }
}

function checkTime(timerTime) {
  if (timerTime > 0) {
    setBtnStyles({
      disabled: false,
      addClass: 'start-btn',
      removeClass: 'isNotActive',
    });
  } else {
    Notify.failure('Select date from future, please', notifyInit);
    setBtnStyles({
      disabled: true,
      addClass: 'isNotActive',
      removeClass: 'start-btn',
    });
  }
}

ref.startBtn.addEventListener('click', onStartTimer);

function onStartTimer() {
  let { days, hours, minutes, seconds } = convertMs(timerTime);
  setBtnStyles({
    disabled: true,
    addClass: 'isNotActive',
    removeClass: 'start-btn',
  });
  ref.dateInput.disabled = true;

  timerId = setInterval(() => {
    ref.daysEl.innerHTML = days > 99 ? days : addLeadingZero(days);
    ref.hoursEl.innerHTML = hours > 9 ? hours : addLeadingZero(hours);
    ref.minEl.innerHTML = minutes > 9 ? minutes : addLeadingZero(minutes);
    ref.secEl.innerHTML = seconds > 9 ? seconds : addLeadingZero(seconds);

    if (!days && !hours && !minutes && !seconds) {
      clearInterval(timerId);
      ref.dateInput.disabled = false;
      Report.info(
        'The countdown is complete.',
        'You can start a new countdown by selecting a new date.',
        'Have a nice day!!!'
      );
      return;
    }
    if (seconds > 0) {
      seconds -= 1;
    } else if (!seconds) {
      seconds = 59;
      if (minutes > 0) {
        minutes -= 1;
      } else if (!minutes) {
        minutes = 59;
        if (hours > 0) {
          hours -= 1;
        } else if (!hours) {
          hours = 23;
          if (days > 0) {
            days -= 1;
          } else if (!days) {
          }
        }
      }
    }
  }, 1000);
}

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
  return `${value}`.padStart(2, '0');
}

function setBtnStyles({ disabled, addClass, removeClass }) {
  ref.startBtn.disabled = disabled;
  ref.startBtn.classList.add(addClass);
  ref.startBtn.classList.remove(removeClass);
}
