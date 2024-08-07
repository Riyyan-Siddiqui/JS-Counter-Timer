"use strict";

let $ = (id) => {
  return document.getElementById(id);
};

//access dom elements

let upBtns = document.querySelectorAll("button i.up");
let downBtns = document.querySelectorAll("button i.down");
let allBtns = document.querySelectorAll("button i.up, i.down");
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
let resetBtn = $("reset");
let startBtn = $("start");
let unitsCount = new Array(4).fill(0);
let tensCount = new Array(4).fill(0);
const now = new Date();
let intervalId = null;
let buttonsWithUpClass = Array.from(upBtns).map((icon) => icon.parentElement);
let buttonsWithDownClass = Array.from(downBtns).map(
  (icon) => icon.parentElement
);
let allButtons = Array.from(allBtns).map((icon) => icon.parentElement);
// console.log(now.getUTCMonth());
let audio = new Audio("assets/wall-clock-ticks-quartz-clock-25480.mp3");
let alarm = new Audio("assets/bedside-clock-alarm-95792.mp3");

buttonsWithUpClass.forEach((upBtn, index) => {
  upBtn.addEventListener("click", (evt) => {
    Increment(upBtn.parentElement.parentElement.getAttribute("id"));
  });
});

buttonsWithDownClass.forEach((downBtn, index) => {
  downBtn.addEventListener("click", (evt) => {
    Decrement(downBtn.parentElement.parentElement.getAttribute("id"));
  });
});

resetBtn.addEventListener("click", () => {
  Reset();
  unitsCount.fill(0);
  tensCount.fill(0);

  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }

  allButtons.forEach((btn) => {
    btn.disabled = false;
  });
  audio.pause();
  alarm.pause();
});

startBtn.addEventListener("click", () => {
  allButtons.forEach((btn) => {
    btn.disabled = true;
  });
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
  intervalId = setInterval(startClock, 1000);

  setTimeout(() => {
    clearInterval(intervalId);
    intervalId = null;
    audio.pause();
    alarm.play();
  }, 1000 * timeDuration);
});

let startClock = () => {
  allBtns.forEach((btn) => {
    btn.disabled = true;
  });

  //Play audio
  audio.onerror = function () {
    console.error("Failed to load audio file.");
  };
  audio.play().catch((error) => {
    console.error("Failed to play audio: ", error);
  });
  //link between day and hour
  if (
    tensCount[1].toString() + unitsCount[1].toString() == 0 &&
    tensCount[0].toString() + unitsCount[0].toString() > 0
  ) {
    tensCount[1] = 2;
    unitsCount[1] = 4;
    hour_container_unit.innerText = unitsCount[1];
    hour_container_tens.innerText = tensCount[1];
    day_container_unit.innerText = --unitsCount[0];
  }
  if (unitsCount[1] == 0 && tensCount[1] > 0) {
    unitsCount[1] = 10;
    hour_container_tens.innerText = --tensCount[1];
  }

  //link between hour and minute
  if (
    tensCount[2].toString() + unitsCount[2].toString() == 0 &&
    tensCount[1].toString() + unitsCount[1].toString() > 0
  ) {
    tensCount[2] = 6;
    unitsCount[2] = 0;
    minute_container_unit.innerText = unitsCount[2];
    minute_container_tens.innerText = tensCount[2];
    hour_container_unit.innerText = --unitsCount[1];
  }
  if (unitsCount[2] == 0 && tensCount[2] > 0) {
    unitsCount[2] = 10;
    minute_container_tens.innerText = --tensCount[2];
  }

  //link between minute and second
  if (
    tensCount[3].toString() + unitsCount[3].toString() == 0 &&
    tensCount[2].toString() + unitsCount[2].toString() > 0
  ) {
    tensCount[3] = 6;
    unitsCount[3] = 0;
    seconds_container_unit.innerText = unitsCount[3];
    seconds_container_tens.innerText = tensCount[3];
    minute_container_unit.innerText = --unitsCount[2];
  }
  if (unitsCount[3] == 0 && tensCount[3] > 0) {
    unitsCount[3] = 10;
    seconds_container_tens.innerText = --tensCount[3];
  }

  seconds_container_unit.innerText = --unitsCount[3];
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
    day_container_unit.innerText = ++unitsCount[0];
    if (unitsCount[0] === 10) {
      unitsCount[0] = 0;
      day_container_unit.innerText = unitsCount[0];
      day_container_tens.innerText = ++tensCount[0];
    }
    if (tensCount[0] == 9 && unitsCount[0] == 9) {
      console.log("modify");
      tensCount[0] = 0;
      unitsCount[0] = 0;
      day_container_unit.innerText = unitsCount[0];
      day_container_tens.innerText = tensCount[0];
    }
  } else if (el === "hour-container") {
    hour_container_unit.innerText = ++unitsCount[1];
    if (unitsCount[1] === 10) {
      unitsCount[1] = 0;
      hour_container_unit.innerText = unitsCount[1];
      hour_container_tens.innerText = ++tensCount[1];
    }
    if (tensCount[1] == 2 && unitsCount[1] == 4) {
      console.log("modify");
      tensCount[1] = 0;
      unitsCount[1] = 0;
      hour_container_unit.innerText = unitsCount[1];
      hour_container_tens.innerText = tensCount[1];
    }
  } else if (el === "minute-container") {
    minute_container_unit.innerText = ++unitsCount[2];
    if (unitsCount[2] === 10) {
      unitsCount[2] = 0;
      minute_container_unit.innerText = unitsCount[2];
      minute_container_tens.innerText = ++tensCount[2];
    }
    if (tensCount[2] == 6 && unitsCount[2] == 0) {
      console.log("modify");
      tensCount[2] = 0;
      unitsCount[2] = 0;
      minute_container_unit.innerText = unitsCount[2];
      minute_container_tens.innerText = tensCount[2];
    }
  } else {
    seconds_container_unit.innerText = ++unitsCount[3];
    if (unitsCount[3] === 10) {
      unitsCount[3] = 0;
      seconds_container_unit.innerText = unitsCount[3];
      seconds_container_tens.innerText = ++tensCount[3];
    }
    if (tensCount[3] == 6 && unitsCount[3] == 0) {
      console.log("modify");
      tensCount[3] = 0;
      unitsCount[3] = 0;
      seconds_container_unit.innerText = unitsCount[3];
      seconds_container_tens.innerText = tensCount[3];
    }
  }
};

let Decrement = (el) => {
  if (el === "day-container") {
    if (unitsCount[0] === 0 && tensCount[0] === 0) {
      return;
    }
    if (unitsCount[0] === 0 && tensCount[0] > 0) {
      unitsCount[0] = 10;
      day_container_tens.innerText = --tensCount[0];
      return;
    }
    day_container_unit.innerText = --unitsCount[0];
  } else if (el === "hour-container") {
    if (unitsCount[1] == 0 && tensCount[1] == 0) {
      return;
    }
    if (unitsCount[1] === 0 && tensCount[1] > 0) {
      unitsCount[1] = 10;
      hour_container_tens.innerText = --tensCount[1];
      return;
    }

    hour_container_unit.innerText = --unitsCount[1];
  } else if (el === "minute-container") {
    if (unitsCount[2] === 0 && tensCount[2] === 0) {
      return;
    }
    if (unitsCount[2] === 0 && tensCount[2] > 0) {
      unitsCount[2] = 10;
      minute_container_tens.innerText = --tensCount[2];
      return;
    }

    minute_container_unit.innerText = --unitsCount[2];
  } else {
    if (unitsCount[3] == 0 && tensCount[3] == 0) {
      return;
    }
    if (unitsCount[3] === 0 && tensCount[3] > 0) {
      unitsCount[3] = 10;
      seconds_container_tens.innerText = --tensCount[3];
      return;
    }
    seconds_container_unit.innerText = --unitsCount[3];
  }
};
