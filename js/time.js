function current() {
    //get formatted time
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    let meridiem = hours >= 12 ? "PM" : "AM";
    let formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    let formattedMinutes = minutes.toString().padStart(2, "0");
    let formattedSeconds = seconds.toString().padStart(2, "0");
    let timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  
    //set formatted date
    const currentTimeElement = document.getElementById("mainTime");
    currentTimeElement.innerHTML = `${timeString}<span>${meridiem}</span>`;
    document.title = "Time Now "+timeString+" "+meridiem+"🕑"
    //get fomatted date
    const currentDate = new Date();
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const weekday = weekdays[currentDate.getDay()];
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const dateString = `${weekday} - ${month} ${day}, ${year}`;
  
    //set formatted date
    const currentDateElement = document.getElementById("mainDate");
    currentDateElement.innerHTML = dateString;
  }
const addBtn = document.getElementById("addBtn")
const cancelBtn = document.getElementById("cancelBtn")
const addContainer = document.getElementById("addContainer")
const body = document.getElementById("body")
addBtn.addEventListener("click",()=>{
  addContainer.classList.remove("d-none")
  body.classList.add("stop-scroll")
})
cancelBtn.addEventListener("click",()=>{
  addContainer.classList.add("d-none")
  body.classList.remove("stop-scroll")
})


let allCountries = Object.values(ct.getAllCountries());
let suggestions = [];
allCountries.forEach((country) => {
  suggestions.push(country["name"] + "-" + country["id"]);
});

const countrySelectEle = document.getElementById("country");
const timezoneSelector = document.getElementById("timezone");
suggestions.forEach((ele) => {
  let countryOption = document.createElement("option");
  countryOption.innerHTML = ele;
  countrySelectEle.appendChild(countryOption);
});
countrySelectEle.addEventListener("change", (e) => {
  let selected = e.target.value;
  let countryCode = selected.substring(selected.length - 2, selected.length);
  let timezones = ct.getTimezonesForCountry(countryCode);
  while (timezoneSelector.firstChild) {
    timezoneSelector.removeChild(timezoneSelector.firstChild);
  }
  timezones.forEach((timezone) => {
    let newSelector = document.createElement("option");
    newSelector.innerHTML = timezone["name"];
    timezoneSelector.appendChild(newSelector);
  });
});

function getTime(timezone) {
  const currentTime = new Date();
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;


  // Convert the current time to the desired country's time zone
  let options = {
    timeZone: timezone.name,
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  let formattedTime = currentTime.toLocaleString("en-US", options);
let userUtcOffsetMinutes = currentTime.getTimezoneOffset();
  let targetUtcOffsetMinutes = timezone.utcOffset;

  let hourDifference = Math.floor((userUtcOffsetMinutes - targetUtcOffsetMinutes) / 60);
  let minuteDifference = Math.abs((userUtcOffsetMinutes - targetUtcOffsetMinutes) % 60);

  let timeDifference =
    (hourDifference >= 0 ? "+" : "-") +
    Math.abs(hourDifference).toString().padStart(2, "0") +
    ":" +
    minuteDifference.toString().padStart(2, "0");
  return {
    currentTime: formattedTime,
    timeDifference: timeDifference,
  };
}

const countryHead = document.getElementById("countryHead");
const timezoneslist = document.getElementById("timezones");



const addTimezoneBtn = document.getElementById("addTimezoneBtn");
addTimezoneBtn.addEventListener("click", () => {
  if (timezoneSelector.value) {
    const timezoneSelector = document.getElementById("timezone");
    let worldClockList = JSON.parse(localStorage.getItem("worldClock"));
    if (!worldClockList) {
      worldClockList = [];
    }
    if (worldClockList.includes(timezoneSelector.value)) {
      alert("already Added");
    } else {
      worldClockList.push(timezoneSelector.value);
      localStorage.setItem("worldClock", JSON.stringify(worldClockList));
    }
    addContainer.classList.add("d-none")
    body.classList.remove("stop-scroll")
  }
});
function initial() {
  let parentContainer = document.getElementById("timezoneContainer");
  while (parentContainer.firstChild) {
    parentContainer.removeChild(parentContainer.firstChild);
  }
  const timezoneItem = document.getElementById("timezoneItem");
  let worldClockList = JSON.parse(localStorage.getItem("worldClock"));
  if (worldClockList && Array.isArray(worldClockList)) {
    worldClockList.forEach((ele) => {
      let clone = timezoneItem.cloneNode(true);
      let id = ele.replace("/", "_");
      clone.setAttribute("id", id);
      clone.classList.remove("d-none");
      const headText = clone.querySelector("#timezoneHead #headText");
      const timezoneTime = clone.querySelector("#timezoneMain #timezoneTime");
      const timezoneDiff = clone.querySelector("#timezoneMain #timezoneDiff");
      const delBtn = clone.querySelector(".deleteBtn")
      headText.innerHTML = ele;
      delBtn.setAttribute("id",id)
      setInterval(() => {
        let result = getTime(ct.getTimezone(ele));
        timezoneTime.innerHTML = result.currentTime;
        timezoneDiff.innerHTML = result.timeDifference;

      }, 1000);
      parentContainer.appendChild(clone);
    });
  }
}

function detectLocalStorageChanges() {
  var currentState = JSON.stringify(localStorage);

  setInterval(function () {
    var updatedState = JSON.stringify(localStorage);

    if (currentState !== updatedState) {
      let parentContainer = document.getElementById("timezoneContainer");
      while (parentContainer.firstChild) {
        parentContainer.removeChild(parentContainer.firstChild);
      }
      const timezoneItem = document.getElementById("timezoneItem");
      let worldClockList = JSON.parse(localStorage.getItem("worldClock"));
      worldClockList.forEach((ele) => {
        let clone = timezoneItem.cloneNode(true);
        let id = ele.replace("/", "_");
        clone.setAttribute("id", id);
        clone.classList.remove("d-none");
        const headText = clone.querySelector("#timezoneHead #headText");
        const delBtn = clone.querySelector(".deleteBtn")
        const timezoneTime = clone.querySelector("#timezoneMain #timezoneTime");
        const timezoneDiff = clone.querySelector("#timezoneMain #timezoneDiff");
        headText.innerHTML = ele;
        delBtn.setAttribute("id",id)
        setInterval(() => {
          let result = getTime(ct.getTimezone(ele));
          timezoneTime.innerHTML = result.currentTime;
          timezoneDiff.innerHTML = result.timeDifference;
        }, 1000);
        parentContainer.appendChild(clone);
      });
      currentState = updatedState;
    }
  }, 1000);
}

document.addEventListener("DOMContentLoaded", function() {
  const deleteBtns = document.getElementsByClassName("deleteBtn");
  
  Array.from(deleteBtns).forEach(button => {
    button.addEventListener("click", function() {
      let oldData = JSON.parse(localStorage.getItem("worldClock"))
      let id = button.id.replace("_","/")
      let newData = oldData.filter(item => item !== id)
      localStorage.setItem("worldClock",JSON.stringify(newData))
    });
  });
});


detectLocalStorageChanges();
initial()
  function main() {
    current();
  }
  
  setInterval(main, 1000);
  
