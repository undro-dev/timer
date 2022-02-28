//Buttons
const startBtn = document.querySelector(".play"),
  stopBtn = document.querySelector(".stop"),
  resetBtn = document.querySelector(".reset"),
  addOneBtn = document.querySelector("#one"),
  addFiveBtn = document.querySelector("#five"),
  addTenBtn = document.querySelector("#ten"),
  addFifteenBtn = document.querySelector("#fifteen"),
  setOneBtn = document.querySelector("#set-one"),
  setTwoBtn = document.querySelector("#set-two"),
  setFiveBtn = document.querySelector("#set-five"),
  setYenBtn = document.querySelector("#set-ten"),
  setFifteenBtn = document.querySelector("#set-fifteen");

class Timer {
  constructor(hours, minutes, seconds, milliseconds) {
    //Elements clock
    this.hoursEl = document.querySelector(hours);
    this.minutesEl = document.querySelector(minutes);
    this.secondsEl = document.querySelector(seconds);
    this.millisecondsEl = document.querySelector(milliseconds);

    this.interval = null;
    this.remainingMilliSeconds = 0;
    this.milliseconds = 99;
  }
  //Adding zeroes for values under 10
  addNullBeforeTime() {
    this.hoursEl.textContent = this.hoursEl.textContent.padStart(2, "0");
    this.minutesEl.textContent = this.minutesEl.textContent.padStart(2, "0");
    this.secondsEl.textContent = this.secondsEl.textContent.padStart(2, "0");
    this.millisecondsEl.textContent = this.millisecondsEl.textContent.padStart(
      2,
      "0"
    );
  }
  //Getting general time to get hours, minutes, seconds from it
  getMilliseconds() {
    const hours = +this.hoursEl.textContent,
      minutes = +this.minutesEl.textContent,
      seconds = +this.secondsEl.textContent,
      milliseconds = +this.millisecondsEl.textContent;

    this.remainingMilliSeconds =
      hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;

    return this.remainingMilliSeconds;
  }

  start() {
    if (this.getMilliseconds() === 0) return; //Checking that current time is greater than zero, otherwise timer won't be launched
    this.interval = setInterval(() => {
      this.remainingMilliSeconds -= 10; //Reducing general time with each millisecond

      //Getting of hours, minutes, seconds in terms of continual reducing of general time
      let hours = Math.floor(this.remainingMilliSeconds / 1000 / 60 / 60) % 24;
      let minutes = Math.floor(this.remainingMilliSeconds / 1000 / 60) % 60;
      let seconds = Math.floor(this.remainingMilliSeconds / 1000) % 60;

      if (this.milliseconds == 0) this.milliseconds = 99; //Avoiding of three-figure number
      this.milliseconds--;

      this.hoursEl.textContent = `${hours}`;
      this.minutesEl.textContent = `${minutes}`;
      this.secondsEl.textContent = `${seconds}`;
      this.millisecondsEl.textContent = `${this.milliseconds}`;
      this.addNullBeforeTime();

      if (this.remainingMilliSeconds === 0) this.reset(); //Stopping of timer when value is zero
      startBtn.disabled = true;
    }, 10);
  }

  reset() {
    startBtn.disabled = false;
    this.stop();
    this.hoursEl.textContent = "00";
    this.minutesEl.textContent = "00";
    this.secondsEl.textContent = "00";
    this.millisecondsEl.textContent = "00";
  }

  set(time) {
    this.reset();
    this.minutesEl.textContent = `${time}`;
    this.addNullBeforeTime();
  }

  addTime(time) {
    this.stop();
    let currentTime = +this.minutesEl.textContent + time;

    if (currentTime >= 60) {
      this.hoursEl.textContent++;
      this.hoursEl.textContent = `${this.hoursEl.textContent}`;
      currentTime = currentTime - 60;
    }

    this.minutesEl.textContent = `${currentTime}`;
    this.addNullBeforeTime();
  }

  stop() {
    startBtn.disabled = false;
    clearInterval(this.interval);
    this.interval = null;
  }
}

const timer = new Timer(
  ".clock-hours",
  ".clock-minutes",
  ".clock-seconds",
  ".clock-mlseconds"
);

// buttons controls

startBtn.addEventListener("click", () => timer.start());
stopBtn.addEventListener("click", () => timer.stop());
resetBtn.addEventListener("click", () => timer.reset());

//set timer
setOneBtn.addEventListener("click", () => timer.set(1));
setTwoBtn.addEventListener("click", () => timer.set(2));
setFiveBtn.addEventListener("click", () => timer.set(5));
setYenBtn.addEventListener("click", () => timer.set(10));
setFifteenBtn.addEventListener("click", () => timer.set(15));

//add time
addOneBtn.addEventListener("click", () => timer.addTime(1));
addFiveBtn.addEventListener("click", () => timer.addTime(5));
addTenBtn.addEventListener("click", () => timer.addTime(10));
addFifteenBtn.addEventListener("click", () => timer.addTime(15));
