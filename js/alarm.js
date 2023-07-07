//vibrate
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
//vibrate end

var analogDiv = document.getElementById("analog");
var sound1 = document.getElementById("sound-01");
var sound2 = document.getElementById("sound-02");

var timeElement = document.getElementById("timedisplay");
var toggleSwitch = document.getElementById("toggSwitch");
var stopButton = document.getElementById("stop");
const toastLiveExample = document.getElementById("liveToast");

var audio = new Audio("alarm.mp3");
audio.loop = true;

const Initiate = document.getElementById("Initiate");
Initiate.addEventListener("click", () => {
  audio = new Audio("alarm.mp3");
  audio.loop = true;
  // setTimeout(() => { audio.play() }, 1000);
  Initiate.disabled = true;
});
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var toggleAmPm = localStorage.getItem("AMPMToggle") || "false";
if (toggleAmPm == "true") {
  console.log("togg", toggleAmPm);
  toggleSwitch.checked = true;
}
const toggle = () => {
  console.log(toggleSwitch.value);
  if (toggleAmPm == "false") {
    toggleAmPm = "true";
    localStorage.setItem("AMPMToggle", "true");
  } else {
    toggleAmPm = "false";
    localStorage.setItem("AMPMToggle", "false");
  }
};

setInterval(() => {
  var time = new Date();
  function r(el, deg) {
    el.setAttribute("transform", "rotate(" + deg + " 500 500)");
  }
  r(sec, 6 * time.getSeconds());
  r(min, 6 * time.getMinutes());
  r(hour, 30 * (time.getHours() % 12) + time.getMinutes() / 2);

  if (toggleAmPm == "false") {
    timeElement.innerHTML = `${time.getHours()} : ${time.getMinutes()} : ${time.getSeconds()}<br>
    <p class="clock-date text-center fw-bolder text-secondary">
      ${week[time.getDay()]} - ${
      months[time.getMonth()]
    } ${time.getDate()} ${time.getFullYear()}
        </p>
  `;
      document.title = `Time Now: ${time.getHours()} : ${time.getMinutes()} : ${time.getSeconds()} 🕑`;

  } else {
    timeElement.innerHTML = `${formatAMPM(time)}<br>
    <p class="clock-date text-center fw-bolder text-secondary">
      ${week[time.getDay()]} - ${
      months[time.getMonth()]
    } ${time.getDate()} ${time.getFullYear()}
        </p>`;
    document.title = `Time Now: ${formatAMPM(time)} 🕑`;

  }
}, 1000);

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime =
    hours +
    " : " +
    minutes +
    " : " +
    date.getSeconds() +
    " <span>" +
    ampm +
    "</span>";
  return strTime;
}

var error = document.getElementById("error");
var alarmObj = document.getElementById("alarm");
alarmObj.loop = true;
var loadArray = JSON.parse(localStorage.getItem("timeArray")) || [];
var timeArray = loadArray.map(function (item) {
  var firstTwoDigits = item.substring(0, 2);
  var remainingDigits = item.substring(2);
  return firstTwoDigits + ":" + remainingDigits;
});
var saveButton = document.getElementById("save");
var tbody = document.getElementById("tbody");
var timeInput = document.getElementById("timeInput");
const timedisplay = document.getElementById("remaintime");

window.addEventListener("load", function () {
  timeArray.sort();
  loadArray.sort();
  timeArray.forEach(function (time) {
    insertRow(time);
  });
});

function insertRow(time) {
  tbody.innerHTML += `
      <tr>
        <td>${time}</td>
        <td><button class="btn btn-danger btn-sm" onclick="removeTime('${time}')"><i class="fas fa-trash-alt"></i></button></td>
      </tr>`;
}

function removeTime(time) {
  const index = timeArray.indexOf(time);
  if (index !== -1) {
    timeArray.splice(index, 1);
    loadArray.splice(index, 1);
    localStorage.setItem("timeArray", JSON.stringify(loadArray));
    tbody.innerHTML = "";
    timeArray.forEach(function (time) {
      insertRow(time);
    });
  }
}

function saveTime() {
  const timeValue = timeInput.value;
  if (timeValue == "") {
    error.innerHTML = `Input Correct Time`;
    return;
  }
  console.log(timeValue);
  const insertIndex = timeArray.findIndex((time) => time > timeValue);
  if (!loadArray.includes(timeValue.replace(":", ""))) {
    timeArray.splice(
      insertIndex !== -1 ? insertIndex : timeArray.length,
      0,
      timeValue
    );
    loadArray.splice(
      insertIndex !== -1 ? insertIndex : loadArray.length,
      0,
      timeValue.replace(":", "")
    );
    localStorage.setItem("timeArray", JSON.stringify(loadArray));
    console.log(timeArray, loadArray);
    error.innerHTML = "";
    timeInput.value = "";
    tbody.innerHTML = "";
    timeArray.forEach(function (time) {
      insertRow(time);
    });
    var myModalEl = document.getElementById("exampleModal");
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
  } else {
    error.innerHTML = `Time Already Exists!`;
  }
}
window.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    //checks whether the pressed key is "Enter"
    saveTime();
  }
  if (e.code === "Space") {
    //checks whether the pressed key is "Enter"
    snoozeButton();
  }
});
function playAlarm() {
  vibrate({ duration: 2000, interval: 2000, count: 3 });
  analogDiv.style.animation = "shake .1s ease-in-out infinite";
  sound1.style.animation = "sound .1s ease-in-out infinite";
  sound2.style.animation = "sound .1s ease-in-out infinite";
  sound1.style.opacity = "1";
  sound2.style.opacity = "1";
  const toast = new bootstrap.Toast(toastLiveExample);
  toast.show();
  stopButton.disabled = false;
  audio.play();
}
function snoozeButton() {
  analogDiv.style.animation = "";
  sound1.style.animation = "";
  sound2.style.animation = "";
  sound1.style.opacity = "0";
  sound2.style.opacity = "0";
  audio.pause();
  audio.currentTime = 0;
  stopButton.disabled = true;
}

function checkCurrentTime() {
  var currentTime = new Date();
  var currentHour = currentTime.getHours();
  var currentMinute = currentTime.getMinutes();
  var currentTimeInMinutes = currentHour * 60 + currentMinute;

  if (timeArray.length === 0) {
    timedisplay.innerHTML = "No Upcoming Alarms";
    return;
  }

  var closestTime = timeArray.reduce(function (closest, time) {
    var [closestHour, closestMinute] = closest.split(":").map(Number);
    var [timeHour, timeMinute] = time.split(":").map(Number);

    var closestTimeInMinutes = closestHour * 60 + closestMinute;
    var timeInMinutes = timeHour * 60 + timeMinute;

    var closestTimeDiff = closestTimeInMinutes - currentTimeInMinutes;
    var timeDiff = timeInMinutes - currentTimeInMinutes;

    if (closestTimeDiff < 0 && timeDiff >= 0) {
      console.log("time upp", time);
      return time;
    } else if (
      closestTimeDiff >= 0 &&
      timeDiff >= 0 &&
      timeDiff < closestTimeDiff
    ) {
      console.log("time", time);
      return time;
    } else {
      console.log("closest", closest);
      return closest;
    }
  });

  if (
    closestTime ===
    currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  ) {
    console.log("Alarm On!");
    playAlarm();
    var matchedIndex = timeArray.findIndex((time) => time === closestTime);
    timeArray.splice(matchedIndex, 1);
    loadArray.splice(matchedIndex, 1);
    localStorage.setItem("timeArray", JSON.stringify(loadArray));
    tbody.innerHTML = "";
    timeArray.forEach(function (time) {
      insertRow(time);
    });
  } else {
    var [closestHour, closestMinute] = closestTime.split(":").map(Number);

    var remainingHours, remainingMinutes;
    if (closestTime === "00:00") {
      remainingHours = 24 - currentHour;
      remainingMinutes = 60 - currentMinute;
    } else {
      var closestTimeInMinutes = closestHour * 60 + closestMinute;
      if (closestTimeInMinutes >= currentTimeInMinutes) {
        remainingHours = Math.floor(
          (closestTimeInMinutes - currentTimeInMinutes) / 60
        );
        remainingMinutes = (closestTimeInMinutes - currentTimeInMinutes) % 60;
      } else {
        remainingHours = Math.floor(
          (1440 - currentTimeInMinutes + closestTimeInMinutes) / 60
        );
        remainingMinutes =
          (1440 - currentTimeInMinutes + closestTimeInMinutes) % 60;
      }
    }

    timedisplay.innerHTML = `Next Alarm In ${remainingHours} Hr ${remainingMinutes} Min`;
  }
}

setInterval(checkCurrentTime, 1000);
