(function() {
    var hours = Number('00');
    var minutes = Number('00');
    var seconds = Number('00');
    var tens = Number('00');
    var aHours = document.getElementById("hours");
    var aMinutes = document.getElementById("minutes");
    var aSeconds = document.getElementById("seconds");
    var aTens = document.getElementById("tens");
    var Start = document.getElementById("start");
    var Stop = document.getElementById("stop");
    var reset = document.getElementById("reset");
    var clear = document.getElementById("clear");
    var content = document.getElementById("content");
    var Interval;
    var totalTaps = document.getElementById('totalTaps');
    var Lap = document.getElementById("lap");
    var Laps = document.getElementById("laps");
    var lapCount = 1;
    var lapsContent = document.getElementById("laps").innerHTML;
    var lastLap = { hours: 0, minutes: 0, tens: 0, seconds: 0 };
    var totalLap = { thours: 0, tminutes: 0, ttens: 0, tseconds: 0 };
    var boolReset = boolStop = boolStart = false;
    var items = false;
    var value = {'hours':'00', 'minutes':'00', 'seconds':'00', 'tens':'00'};
    var oneArray = [];
    var userLaps = {};
    var userLapsKey ="";
    var displayLaps = {};
    var lapdetails= document.getElementById('lapdetails');
    var historykeys= document.getElementById('historykeys');
    var addShowBtn = document.getElementById('addShowBtn');
    var modalbody = document.getElementById('modalbody');
    var history = document.getElementById('history')
    var closeBtns = document.getElementsByClassName('closeBtn')
    var sount = 1;
  
    function leftPad(value) {
      return value < 10  ? "0" + value : value;
    }

    function callRs() {
      displayLaps = JSON.parse(localStorage.getItem('userLaps'));
      while(historykeys.firstChild) {
        historykeys.removeChild(historykeys.firstChild);
      }
    Object.keys(displayLaps).forEach((key) => {
      
      if (key != "") {
        
        let newOption = document.createElement('option');
        newOption.innerHTML = key
        historykeys.appendChild(newOption);
      }
    })
    }
    
    Array.from(closeBtns).forEach((btn) => {
      btn.addEventListener('click', () => {
        while(history.firstChild) {
          history.removeChild(history.firstChild);
        }
      })
    })

    addShowBtn.addEventListener('click', () => {
      console.log('clicked')
      let result = historykeys.value;
      // console.log('ress', result);
      if (result != 'Select Date' && result != null) {
        while(history.firstChild) {
          history.removeChild(history.firstChild);
        }
        console.log('res', result);
        let resultdata = JSON.parse(localStorage.getItem('userLaps'))
        console.log(resultdata);
        resultdata[result].forEach((ele) => {
          var items = document.createElement('li');
          items.innerHTML = ele;
          history.appendChild(items);
        })
        // var items = document.createElement('p');
        // items.innerHTML = resultdata;
        // modalbody.appendChild(items)
      }
    })
    // lapdetails.onclick = function() {

    // }
  
    Start.onclick = function() {
      boolStart = true;
      clearInterval(Interval);
      Interval = setInterval(startTimer, 10);
      
      Stop.style.display = "block";
      Start.style.display = "none";
      reset.style.display = "none";
      Lap.style.display = "block";
    };
  
    Stop.onclick = function() {
      boolStop = true;
      clearInterval(Interval);
      value = {'hours':hours, 'minutes':minutes, 'seconds':seconds, 'tens':tens};
      console.log(value)
      localStorage.setItem('mainTimer', JSON.stringify(value))
      Start.style.display = "block";
      Stop.style.display = "none";
      Lap.style.display = "none";
      reset.style.display = "block";
    };
  
    reset.onclick = function() {
      boolReset = true;
      console.log(oneArray, userLaps)
      var ss = JSON.parse(localStorage.getItem('userLaps'));
      // oneArray = [];
      ss[userLapsKey] = oneArray;
      oneArray = [];
      localStorage.setItem( 'userLaps', JSON.stringify(ss));
      callRs();
      clearInterval(Interval);
      localStorage.removeItem('mainTimer')
      hours = "00";
      minutes = "00";
      seconds = "00";
      tens = "00";
      aHours.innerHTML = hours;
      aMinutes.innerHTML = minutes;
      aSeconds.innerHTML = seconds;
      aTens.innerHTML = tens;
      Laps.innerHTML = "";
      totalTaps.innerHTML = "";
      localStorage.removeItem("laps");
      localStorage.removeItem("totalLaps");
      localStorage.setItem("lapsLength", 1);
      content.classList.add("d-none");
      lapCount = 1;
      sount = 1;
      document.title = `${minutes}:${seconds} stop watch ⏱`;
    };
  
    function startTimer() {
      tens++;
  
      if (tens < 9) {
        aTens.innerHTML = "0" + tens;
      }
  
      if (tens > 9) {
        aTens.innerHTML = tens;
      }
  
      if (tens > 99) {
        seconds++;
        aSeconds.innerHTML = "0" + seconds;
        tens = 0;
        aTens.innerHTML = "0" + 0;
      }
  
      if (seconds > 9) {
        aSeconds.innerHTML = seconds;
      }
  
      if (seconds > 59) {
        minutes++;
        aMinutes.innerHTML = "0" + minutes;
        // document.title = "0" + minutes
        seconds = 0;
        aSeconds.innerHTML = "0" + 0;
        tens = 0;
        aTens.innerHTML = "0" + 0;
      }
  
      if (minutes > 9) {
        aMinutes.innerHTML = minutes;
      }
  
      if (minutes > 59) {
        hours++;
        aHours.innerHTML = "0" + hours;
        minutes = 0;
        aMinutes.innerHTML = "0" + 0;
        seconds = 0;
        aSeconds.innerHTML = "0" + 0;
        tens = 0;
        aTens.innerHTML = "0" + 0;
      }
  
      if (hours > 9) {
        aHours.innerHTML = hours;
      }
      var value = {'hours':hours, 'minutes':(minutes), 'seconds':leftPad(seconds), 'tens':tens};
      // console.log(value);
      // if(value.minutes.length == 1) {
      //   value.minutes = "0" + value.minutes;
      // }
      document.title = `${value.minutes}:${value.seconds} stop watch ⏱`;
      localStorage.setItem('mainTimer', JSON.stringify(value))
    }
    
    var totalHours = 0;
    var totalMinutes = 0;
    var totalSeconds = 0;
    var totalTens = 0;
    var lapHours = 0;
    var lapMinutes = 0;
    var lapSeconds = 0;
    var lapTens = 0;
    Lap.onclick = function() {
      content.classList.remove("d-none");
       totalHours = hours;
       totalMinutes = minutes;
       totalSeconds = seconds;
       totalTens = tens;
      //  console.log('total', totalHours, totalMinutes, totalSeconds)
      // console.log(lapHours, lapMinutes, lapSeconds, lapTens)
      console.log('lastlap', lastLap.hours, lastLap.minutes, lastLap.seconds, lastLap.tens);
       lapHours = hours - lastLap.hours;
       lapMinutes = minutes - lastLap.minutes;
      
      if (lapMinutes < 0) {
        lapMinutes = minutes - lastLap.minutes + 60;
      }
       lapSeconds = seconds - lastLap.seconds;
      if (lapSeconds < 0) {
        lapSeconds = seconds - lastLap.seconds + 60;
      }
      if (lastLap.minutes == 0 && minutes == 1) {
        lapMinutes = 0;
      }
       lapTens = tens - lastLap.tens;
      if (lapTens < 0) {
        lapTens = tens - lastLap.tens + 100;
      }
      if(minutes == 0 && lastLap.seconds == 0) {
        lapSeconds = 0;
      }
      console.log('here', hours, minutes, seconds, tens)
      lastLap = {
        tens: tens,
        seconds: seconds,
        minutes: minutes,
        hours: hours
      };

      console.log('lastlap1', lastLap.tens, lastLap.seconds, lastLap.minutes, lastLap.hours)
      if(boolReset) {
        console.log('comesbool')
        lapHours = lastLap.hours;
        lapMinutes = lastLap.minutes;
        lapSeconds = lastLap.seconds;
        lapTens = lastLap.tens;
        boolReset = false;
      }
      if(items) {
        console.log('lastlap', lastLap.tens, lastLap.seconds, lastLap.minutes, lastLap.hours)
        console.log('hi', lapHours,lapMinutes, lapSeconds, lapTens)
        console.log('previous total', totalLap.thours, totalLap.tminutes, totalLap.tseconds, totalLap.ttens);
        lapHours = lastLap.hours - (+totalLap.thours);
        lapMinutes = lastLap.minutes - (+totalLap.tminutes);
        lapSeconds = lastLap.seconds - (+totalLap.tseconds);
        if (lapSeconds < 0) {
          lapSeconds = 0;
        }
        if (+totalLap.ttens > lastLap.tens) {
            lapTens = (+totalLap.ttens) - lastLap.tens;
        } else {
            lapTens = lastLap.tens - (+totalLap.ttens);
        }
        console.log('SMH', lapHours, lapMinutes, lapSeconds, lapTens);
        items = false;
      }
      
      
      
      if (localStorage.getItem("lapsLength") !== null) {
        lapCount = localStorage.getItem("lapsLength");
      }
      
      creatingLis();
        
        var len = Laps.getElementsByTagName('li').length;
        localStorage.setItem("lapsLength", len + 1);
    };

    function creatingLis() {
        var lapItem = document.createElement("li");
        console.log('lap', lapCount);
        console.log('laptimes', lapHours, lapMinutes, lapSeconds, lapTens)
        lapItem.innerHTML =
        "Lap " +
        lapCount++ +
        " – " +
        leftDads(lapHours) +
        ":" +
        leftDads(lapMinutes) +
        ":" +
        leftDads(lapSeconds) +
        "." +
        leftDads(lapTens);

        var lapsStore = 
        "Lap " +
        sount +
        " – " +
        leftDads(lapHours) +
        ":" +
        leftDads(lapMinutes) +
        ":" +
        leftDads(lapSeconds) +
        "." +
        leftDads(lapTens);
        sount++;
        const now = new Date();
        const hoursl = now.getHours();
        const minutesl = now.getMinutes();
        const secondsl = now.getSeconds();
        userLapsKey = new Date();
        console.log(hoursl+":" + minutesl + ":" + secondsl );
        console.log(oneArray);
        oneArray.push(lapsStore);
        

        // localStorage.setItem( userLaps, oneArray);
        
        console.log('ts',totalHours, totalMinutes, totalSeconds)
        totalLap.thours = totalHours;
        totalLap.tminutes = totalMinutes;
        totalLap.tseconds = totalSeconds;
        totalLap.ttens = totalTens;
        console.log('next', totalLap.thours, totalLap.tminutes, totalLap.tseconds, totalLap.ttens);
        var totalTimes = document.createElement('li');
        totalTimes.innerHTML = leftDads(totalHours) + ":" + leftDads(totalMinutes) + ":" + leftDads(totalSeconds) + ":" + leftDads(totalTens)
        Laps.insertBefore(lapItem, Laps.firstChild);
        totalTaps.insertBefore(totalTimes, totalTaps.firstChild);
        localStorage.setItem("laps", Laps.innerHTML);
        localStorage.setItem("totalLaps", totalTaps.innerHTML);  
    }
    
    function leftDads(value) {
      console.log('th', value);
      if (value == 0 && value.length >= 1) {
        return "00";
      }
      if(value.length > 1) {
        return value;
      }
      return value < 10  ? "0" + value : value;
    }
   
    // clear.onclick = function() {
    //   Laps.innerHTML = "";
    //   totalTaps.innerHTML = "";
    //   localStorage.removeItem("laps");
    //   localStorage.removeItem("totalLaps");
    //   localStorage.setItem("lapsLength", 1);
    //   content.classList.add("d-none");
    //   lapCount = 1;
    // };

    
    
    window.addEventListener("DOMContentLoaded", function() {
      callRs();
        if(localStorage.getItem('totalLaps') !== null) {
            let rs = localStorage.getItem('totalLaps').substring(4, 15)
            console.log('r', rs)
            let t = rs.split(':')
            // console.log(t);
            totalLap.thours = t[0];
            totalLap.tminutes = t[1];
            totalLap.tseconds = t[2];
            totalLap.ttens = t[3];
            // console.log('next', totalLap.thours, totalLap.tminutes, totalLap.tseconds, totalLap.ttens);
        }
        
        if (localStorage.getItem("laps")) {
          Laps.innerHTML = localStorage.getItem("laps");
          // console.log('len', localStorage.getItem("laps").length)
          totalTaps.innerHTML = localStorage.getItem("totalLaps");
          
          if (localStorage.getItem("lapsLength").length == 0) {
              // console.log('li','0')
          }
          items = true;
        } 
        if(localStorage.getItem('mainTimer') === null) {
             value = {'hours':leftDads(hours), 'minutes':leftDads(minutes), 'seconds':seconds, 'tens':tens};
            // console.log(value)
            localStorage.setItem('mainTimer', JSON.stringify(value))
        }
        


        if (localStorage.getItem('mainTimer') !== null) {
          var s = localStorage.getItem('mainTimer');
          var t = JSON.parse(s);
          // console.log('ts',typeof t.hours)
          // console.log('k',(t.hours.toString()).length);
          if ((t.hours.toString()).length == 1 && t.hours.toString() == "0") {
            t.hours = "00";
          }
          if ((t.minutes.toString()).length == 1 && t.minutes.toString() == "0") {
            t.minutes = "00";
          }
          if ((t.minutes.toString()).length == 1) {
            t.minutes = "0" + t.minutes;
          }
          console.log('local', t.minutes, t.seconds)
          document.title = `${t.minutes}:${leftDads(t.seconds)} stop watch ⏱`;
          hours = t.hours
          minutes = leftDads(t.minutes);
          seconds = leftDads(t.seconds);
          tens = (t.tens);
          aHours.innerHTML = hours;
          aMinutes.innerHTML = minutes;
          aSeconds.innerHTML = seconds;
          aTens.innerHTML = tens;
        }

        if (localStorage.getItem("laps") !== null && localStorage.getItem("laps").length > 0) {
          content.classList.remove("d-none");
        } else {
          content.classList.add("d-none");
        }
    });
})();
