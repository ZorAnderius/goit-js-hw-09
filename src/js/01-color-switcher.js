const ref = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

let timerId = null;

ref.startBtn.addEventListener('click', onChangeFontColor);

function onChangeFontColor() {
  timerId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
  setBtnStyles({
    disabled: true,
    addClass: 'isNotActive',
    removeClass: 'start-btn',
  });
}

ref.stopBtn.addEventListener('click', onStopChangeFontColor);

function onStopChangeFontColor() {
  clearInterval(timerId);

  setBtnStyles({
    disabled: false,
    addClass: 'start-btn',
    removeClass: 'isNotActive',
  });
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function setBtnStyles({ disabled, addClass, removeClass }) {
  ref.startBtn.disabled = disabled;
  ref.startBtn.classList.add(addClass);
  ref.startBtn.classList.remove(removeClass);
}
