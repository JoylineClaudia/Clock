//timer object
const timer = {
  title: "",
  totalSeconds: 0,
  remSeconds: 0,
  runFlag: false,
};

function vibrate(options = { duration: 100, interval: 100, count: 1 }) {
  if (!window) {
    return;
  }

  if (!window.navigator) {
    return;
  }

  if (!window.navigator.vibrate) {
    return;
  }

  const pattern = [];

  for (let index = 0; index < options.count; index++) {
    pattern.push(options.duration);
    pattern.push(options.interval);
  }

  window.navigator.vibrate(pattern);
}

const windowtitle = document.querySelector("title");

//display timer element
const timer__displayTitle = document.querySelector("#timer__displayTitle");
const timer__clock = document.querySelector("#timer__clock");
const timer__progress = document.querySelector("#timer__progess");

const timer__totalSeconds = document.querySelector("#timer__totalSeconds");
const timer__dialogTitle = document.querySelector("#timer__dialogTitle");

//buttons elememt
const timer__startBtn = document.querySelector("#timer__startBtn");
const timer__stopBtn = document.querySelector("#timer__stopBtn");
const timer__resetBtn = document.querySelector("#timer__resetBtn");
const timer__editTimerBtn = document.querySelector("#timer__editTimerBtn");
const timer__alertBtn = document.querySelector("#timer__alertBtn");

//form element
const timer__inputForm = document.querySelector("#timer__inputForm");
const timer__inputHH = document.querySelector("#timer__inputHH");
const timer__inputMM = document.querySelector("#timer__inputMM");
const timer__inputSS = document.querySelector("#timer__inputSS");
const timer__inputTitle = document.querySelector("#timer__inputTitle");

//alert audio
const timer__alert = document.querySelector("#timer__alert");
timer__alert.loop = true;

//format the output
const timer__formatOutput = (totalSeconds) => {
  const HH = Math.floor(totalSeconds / 3600);
  const MM = Math.floor((totalSeconds % 3600) / 60);
  const SS = Math.floor(totalSeconds % 60);

  const formattedHH = String(HH).padStart(2, "0");
  const formattedMM = String(MM).padStart(2, "0");
  const formattedSS = String(SS).padStart(2, "0");
  return `${formattedHH}:${formattedMM}:${formattedSS}`;
};

//diable /enable start stop buttons
const timer__setBtn = (start, stop) => {
  timer__startBtn.disabled = start ? true : false;
  timer__stopBtn.disabled = stop ? true : false;

  timer__startBtn.style.display = start ? "none" : "block";
  timer__stopBtn.style.display = stop ? "none" : "block";
};

//set title
const timer__setTitle = (title) => {
  timer__displayTitle.innerText = title ? title : "---";
};

//set time
const timer__setTime = (seconds) => {
  const formatedtime = timer__formatOutput(seconds);
  timer__clock.innerText = formatedtime;
  windowtitle.innerText = `${formatedtime} - timer`;

  let progress = (100 * timer.remSeconds) / timer.totalSeconds;
  timer__progress.style.width = `${progress}%`;

  if (progress >= 0 && progress <= 10)
    timer__progress.style.backgroundColor = "#d50000";
  else if (progress > 10 && progress <= 35)
    timer__progress.style.backgroundColor = "#cccc01";
  else timer__progress.style.backgroundColor = "#13ab00";

  timer__storeTimer();
};

//start the timer
let timer__interval;
let timer__timeout;
const timer__startTimer = () => {
  if (timer.remSeconds <= 0) timer__initTimer();
  else {
    let timeout = timer.remSeconds;
    timer__setBtn(true, false);

    timer__interval = setInterval(() => {
      timer.runFlag = true;
      timer.remSeconds -= 1;

      timer__setTime(timer.remSeconds);
    }, 1000);

    timer__timeout = setTimeout(() => {
      timer__initTimer();
      timer__setTime(0);
      timer__totalSeconds.innerText = timer__formatOutput(timer.totalSeconds);
      timer__dialogTitle.innerText = timer.title ? timer.title : "---";
      timer__alertBtn.click();
      windowtitle.innerText = `*** ${timer__formatOutput(
        timer.totalSeconds
      )} ***`;
      vibrate({ duration: 1000, interval: 2000, count: 5 });
      timer__alert.play();
    }, timeout * 1000);
  }
};
timer__startBtn.addEventListener("click", timer__startTimer);

const timer__initTimer = () => {
  clearInterval(timer__interval);
  clearTimeout(timer__timeout);
  timer.runFlag = false;
  timer__setBtn(true, false);
};

//stop timer
const timer__stopTimer = () => {
  timer__initTimer();
  timer.runFlag = false;
  timer__setBtn(false, true);
  timer__setTime(timer.remSeconds);
};
timer__stopBtn.addEventListener("click", timer__stopTimer);

//reset timer
const timer__resetTimer = () => {
  timer__initTimer();
  timer.remSeconds = timer.totalSeconds;
  timer.runFlag = false;
  if (timer.totalSeconds == 0) timer__setBtn(true, true);
  else timer__setBtn(false, true);
  timer__setTime(timer.totalSeconds);
};
timer__resetBtn.addEventListener("click", timer__resetTimer);

const timer__stopAlert = (restart) => {
  timer__alert.pause();
  timer__setBtn(false, true);
  timer__resetTimer();
  if (restart) timer__startTimer();
  timer.runFlag = false;
  window.navigator.vibrate(0);
  return;
};
//get form input
const timer__getFormInput = (event) => {
  event.preventDefault();

  const HH = Number(timer__inputHH.value);
  const MM = Number(timer__inputMM.value);
  const SS = Number(timer__inputSS.value);

  //calculate totalseconds
  const totalSeconds = HH * 3600 + MM * 60 + SS;

  //store in a local vaiable
  timer.totalSeconds = totalSeconds;
  timer.title = timer__inputTitle.value;
  timer.remSeconds = totalSeconds;
  //store the timer
  timer__storeTimer();

  //display & start timer
  timer__resetTimer();
  timer__setTitle(timer.title);
  timer__setTime(timer.totalSeconds);
  if (timer.totalSeconds == 0) timer__setBtn(true, true);
  else timer__startTimer();
};

const newTimer = (newTime) => {
  let totalSeconds =
    newTime.time.hh * 3600 + newTime.time.mm * 60 + newTime.time.ss;
  timer.totalSeconds = totalSeconds;
  timer.title = newTime.title;
  timer.remSeconds = totalSeconds;
  //store the timer
  timer__storeTimer();

  //display & start timer
  timer__resetTimer();
  timer__setTitle(timer.title);
  timer__setTime(timer.totalSeconds);
  if (timer.totalSeconds == 0) timer__setBtn(true, true);
  else timer__startTimer();
};

const timer__storeTimer = () => {
  localStorage.setItem("timer", JSON.stringify(timer));
};

//get previous timer from local storage
const timer__reloadTimer = () => {
  const localTimer = JSON.parse(localStorage.getItem("timer"));

  Object.assign(timer, localTimer);
  if (timer.runFlag) {
    timer__startTimer();
  } else {
    timer__setBtn(false, true);
    if (timer.remSeconds == 0) {
      timer__resetTimer();
      timer__setBtn(true, false);
    }
  }
};

//initalization
(function init() {
  timer__reloadTimer();
  if (timer.totalSeconds == 0) timer__setBtn(true, true);
  timer__setTitle(timer.title);
  timer__setTime(timer.remSeconds);
})();
