"use strict";

let $ = (id) => {
  return document.getElementById(id);
};

//access dom elements

let upBtns = document.querySelectorAll(".up");
let downBtns = document.querySelectorAll(".down");
let day_container_tens = document.querySelectorAll("#day-container div p")[0];
let day_container_unit = document.querySelectorAll("#day-container div p")[1];
let hour_container_tens = document.querySelectorAll("#hour-container div p")[0];
let hour_container_unit = document.querySelectorAll("#hour-container div p")[1];
let minute_container_tens = document.querySelectorAll(
  "#minute-container div p"
)[0];
let minute_container_unit = document.querySelectorAll(
  "#minute-container div p"
)[1];
let seconds_container_tens = document.querySelectorAll(
  "#seconds-container div p"
)[0];
let seconds_container_unit = document.querySelectorAll(
  "#seconds-container div p"
)[1];
let tens = document.querySelectorAll(".sub-container div p")[0];
let units = document.querySelectorAll(".sub-container div")[1];
let resetBtn = $("reset");
let startBtn = $("start");
let count = new Array(4).fill(0);
let count1 = new Array(4).fill(0);
const now = new Date();
// console.log(now.getUTCMonth());

upBtns.forEach((upBtn, index) => {
  upBtn.addEventListener("click", (evt) => {
    Increment(
      upBtn.parentElement.parentElement.parentElement.getAttribute("id")
    );
  });
});

downBtns.forEach((downBtn, index) => {
  downBtn.addEventListener("click", (evt) => {
    Decrement(
      downBtn.parentElement.parentElement.parentElement.getAttribute("id")
    );
  });
});

resetBtn.addEventListener("click", () => {
  Reset();
  count.fill(0);
  count1.fill(0);
});

startBtn.addEventListener("click", () => {
  let targetDaySet = Number(
    day_container_tens.innerText + day_container_unit.innerText
  );
  let targetHourSet = Number(
    hour_container_tens.innerText + hour_container_unit.innerText
  );
  let targetMinuteSet = Number(
    minute_container_tens.innerText + minute_container_unit.innerText
  );
  let targetSecondsSet = Number(
    seconds_container_tens.innerText + seconds_container_unit.innerText
  );
  let timeDuration =
    targetDaySet * 24 * 60 * 60 +
    targetHourSet * 60 * 60 +
    targetMinuteSet * 60 +
    targetSecondsSet;

  // 2 12 28 50 convert to seconds = (2*24*60*60) + (12*3600) + (28*60) +50
  const intervalId = setInterval(startClock, 1000);

  setTimeout(() => {
    clearInterval(intervalId);
  }, 1000 * timeDuration);
});

let startClock = () => {
  if (
    count[0] == 0 &&
    count1[0] == 0 &&
    count[1] == 0 &&
    count1[1] == 0 &&
    count[2] == 0 &&
    count1[2] == 0 &&
    count[3] == 0 &&
    count1[3] == 0
  ) {
    return;
  }
  if (
    count1[2].toString() + count[2].toString() == 0 &&
    count1[1].toString() + count[1].toString() > 0
  ) {
    count1[2] = 5;
    count[2] = 9;
    minute_container_unit.innerText = count[2];
    minute_container_tens.innerText = count1[2];
    hour_container_unit.innerText = --count[1];
  }
  if (
    count1[1].toString() + count[1].toString() == 0 &&
    count1[0].toString() + count[0].toString() > 0
  ) {
    count1[1] = 2;
    count[1] = 4;
    hour_container_unit.innerText = count[1];
    hour_container_tens.innerText = count1[1];
    day_container_unit.innerText = --count[0];
  }

  if (
    count1[3].toString() + count[3].toString() == 0 &&
    count1[2].toString() + count[2].toString() > 0
  ) {
    count1[3] = 6;
    count[3] = 0;
    seconds_container_unit.innerText = count[3];
    seconds_container_tens.innerText = count1[3];
    minute_container_unit.innerText = --count[2];
  }
  if (count[3] == 0 && count1[3] > 0) {
    count[3] = 10;
    seconds_container_tens.innerText = --count1[3];
  }
  seconds_container_unit.innerText = --count[3];
};

let Reset = () => {
  day_container_tens.innerText = 0;
  day_container_unit.innerText = 0;
  hour_container_tens.innerText = 0;
  hour_container_unit.innerText = 0;
  minute_container_tens.innerText = 0;
  minute_container_unit.innerText = 0;
  seconds_container_tens.innerText = 0;
  seconds_container_unit.innerText = 0;
};

let Increment = (el) => {
  if (el === "day-container") {
    day_container_unit.innerText = ++count[0];
    if (count[0] === 10) {
      count[0] = 0;
      day_container_unit.innerText = count[0];
      day_container_tens.innerText = ++count1[0];
    }
    if (count1[0] == 9 && count[0] == 9) {
      console.log("modify");
      count1[0] = 0;
      count[0] = 0;
      day_container_unit.innerText = count[0];
      day_container_tens.innerText = count1[0];
    }
  } else if (el === "hour-container") {
    hour_container_unit.innerText = ++count[1];
    if (count[1] === 10) {
      count[1] = 0;
      hour_container_unit.innerText = count[1];
      hour_container_tens.innerText = ++count1[1];
    }
    if (count1[1] == 2 && count[1] == 4) {
      console.log("modify");
      count1[1] = 0;
      count[1] = 0;
      hour_container_unit.innerText = count[1];
      hour_container_tens.innerText = count1[1];
    }
  } else if (el === "minute-container") {
    minute_container_unit.innerText = ++count[2];
    if (count[2] === 10) {
      count[2] = 0;
      minute_container_unit.innerText = count[2];
      minute_container_tens.innerText = ++count1[2];
    }
    if (count1[2] == 6 && count[2] == 0) {
      console.log("modify");
      count1[2] = 0;
      count[2] = 0;
      minute_container_unit.innerText = count[2];
      minute_container_tens.innerText = count1[2];
    }
  } else {
    seconds_container_unit.innerText = ++count[3];
    if (count[3] === 10) {
      count[3] = 0;
      seconds_container_unit.innerText = count[3];
      seconds_container_tens.innerText = ++count1[3];
    }
    if (count1[3] == 6 && count[3] == 0) {
      console.log("modify");
      count1[3] = 0;
      count[3] = 0;
      seconds_container_unit.innerText = count[3];
      seconds_container_tens.innerText = count1[3];
    }
  }
};

let Decrement = (el) => {
  if (el === "day-container") {
    if (count[0] === 0 && count1[0] === 0) {
      return;
    } else if (count[0] === 0 && count1[0] > 0) {
      count[0] = 10;
      day_container_tens.innerText = --count1[0];
    }
    day_container_unit.innerText = --count[0];
  } else if (el === "hour-container") {
    if (count[1] <= 0 && count1[1] <= 0 && count[0] <= 0) {
      return;
    }
    if (count[1] === 0 && count1[1] > 0) {
      count[1] = 10;
      hour_container_tens.innerText = --count1[1];
    }
    if (count[1] === 0 && count1[1] === 0 && count[0] > 0) {
      count1[1] = 2;
      count[1] = 4;
      hour_container_unit.innerText = count[1];
      hour_container_tens.innerText = count1[1];
      count[0]--;
      day_container_unit.innerText = count[0];
      return;
    }
    hour_container_unit.innerText = --count[0];
  } else if (el === "minute-container") {
    if (count[2] === 0 && count1[2] === 0 && count[1] === 0) {
      return;
    }
    if (count[2] === 0 && count1[2] > 0) {
      count[2] = 10;
      minute_container_tens.innerText = --count1[2];
    }
    if (count[2] === 0 && count1[2] === 0 && count[1] > 0) {
      count1[2] = 5;
      count[2] = 9;
      minute_container_unit.innerText = count[2];
      minute_container_tens.innerText = count1[2];
      count[1]--;
      hour_container_unit.innerText = count[1];
      return;
    }

    minute_container_unit.innerText = --count[2];
  } else {
    if (
      count[0] == 0 &&
      count1[0] == 0 &&
      count[1] == 0 &&
      count[2] == 0 &&
      count[3] == 0 &&
      count1[3] == 0
    ) {
      return;
    }
    if (count[3] === 0 && count1[3] > 0) {
      count[3] = 10;
      seconds_container_tens.innerText = --count1[3];
    }
    if (count[3] === 0 && count1[3] === 0 && count[2] > 0) {
      count1[3] = 5;
      count[3] = 9;
      seconds_container_unit.innerText = count[3];
      seconds_container_tens.innerText = count1[3];
      count[2]--;
      minute_container_unit.innerText = count[2];
      return;
    }
    seconds_container_unit.innerText = --count[3];
  }
};
