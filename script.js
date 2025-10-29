let startTime, updatedTime, difference, timerInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function updateDisplay() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((difference / (1000 * 60)) % 60);
  let seconds = Math.floor((difference / 1000) % 60);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  display.innerHTML = `${hours}:${minutes}:${seconds}`;
}

startStopBtn.addEventListener('click', () => {
  if (!running) {
    running = true;
    startTime = new Date().getTime() - (difference || 0);
    timerInterval = setInterval(updateDisplay, 1000);
    startStopBtn.textContent = 'Pause';
  } else {
    running = false;
    clearInterval(timerInterval);
    startStopBtn.textContent = 'Start';
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  running = false;
  difference = 0;
  display.innerHTML = '00:00:00';
  startStopBtn.textContent = 'Start';
  laps = [];
  lapsList.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
  if (running) {
    laps.push(display.innerHTML);
    const li = document.createElement('li');
    li.textContent = `Lap ${laps.length}: ${display.innerHTML}`;
    lapsList.appendChild(li);
  }
});
