const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

startBtn.addEventListener('click', onChangeFontColor);

function onChangeFontColor() {
  timerId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
  startBtn.classList.add('isNotActive');
}

stopBtn.addEventListener('click', onStopChangeFontColor);

function onStopChangeFontColor() {
  clearInterval(timerId);
  startBtn.disabled = false;
  startBtn.classList.remove('isNotActive');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
