const time = document.querySelector('.timer');
const mainButton = document.querySelector('#main-button');
const clearButton = document.querySelector('#clear-button');
const pauseButton = document.querySelector('#stop-button');
const breakButtton = document.querySelector('#break-button');
const LngbreakButton = document.querySelector('#lngbreak-button');
const elem = document.getElementById("progress");
const toggleImgIcon = document.querySelector('.img-icon');
const toggleSwitch = document.querySelector('input[type="checkbox"]');

const notifyOptions = document.querySelector('.notify-opt');

const currentTheme = localStorage.getItem('theme');

const timer = { elapsedTime: 0 };

let alertSound = new Audio('./alerts/gong.mp3');
let alerNane = 'gong';




const img = "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg";
const text = "Take a look at this brand new t-shirt!";
const title = "New Product Available";
const options = {
    body: text,
    icon: "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg",
    vibrate: [200, 100, 200],
    tag: "new-product",
    image: img,
    badge: "https://spyna.it/icons/android-icon-192x192.png",
    actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
 };

navigator.serviceWorker.ready.then(function(serviceWorker) {
  serviceWorker.showNotification(title, options);
});




// Disable buttons onload, since Firefox sometimes chaches previous button state
// see -> https://bugzilla.mozilla.org/show_bug.cgi?id=654072 
window.addEventListener('load', () => {
  buttonsState(false, true, true, true, true);
})

const initialInterval = 1;
const shortBreak = 2;
const lonngBreak = 3;

let pomodoroMinutes = initialInterval;
let isStarted = false;
let state = 'study';
let width = 100;

const s = 1000;
let m = 1000 * 60;
let h = m * 60;

let seconds = 0;
let minutes = 0;
let elapsedTime = 0;


// reset timer function
function resetTimes() {
  isStarted = false;
  timer.elapsedTime = 0;
  let ddate = new Date();
  ddate.setMinutes(ddate.getMinutes() + pomodoroMinutes);
  timer.startTime = ddate
}

function calcMinsSeconds() {
  elapsedTime = timer.startTime - Date.now() - timer.elapsedTime
  seconds = Math.floor((elapsedTime % m) / s);
  minutes = Math.floor((elapsedTime % h) / m);
  localStorage.setItem("seconds", seconds); 
  localStorage.setItem("minutes", minutes); 
  displayTime(minutes, seconds);
}

function setDateMinutes() {
  ddate.setMinutes(ddate.getMinutes() + pomodoroMinutes);
}

// set button disabled/enebled states
function buttonsState(start_state, pause_state, reset_state, shortbrk_state, longbrk_state) {
  mainButton.disabled = start_state;
  pauseButton.disabled = pause_state;
  clearButton.disabled = reset_state;
  breakButtton.disabled = shortbrk_state;
  LngbreakButton.disabled = longbrk_state;
}


// Pick an alert
notifyOptions.addEventListener('click', (e) => {
  alertName = e.target.textContent;
  alert = new Audio(`./alerts/${alertName}.mp3`);

  const elems = document.querySelectorAll(".active");
  elems.forEach((e) => {
    e.classList.remove('active');
  })
  e.target.classList.add('active')
});

mainButton.addEventListener('click', () => {
  buttonsState(true, false, false, true, true);
  if (mainButton.textContent === 'Start') {
    starttimer();
  }
})

pauseButton.addEventListener('click', () => {
  buttonsState(false, true, false, true, true);
  isStarted = true;
  timer.elapsedTime += Date.now() - timer.startTime
  clearInterval(timer.intervalId)
})


//  Short and Long breaks
breakButtton.addEventListener('click', () => {
  pomodoroMinutes = shortBreak;
  state = 'break';
  buttonsState(true, false, false, true, true);
  resetTimes();
  starttimer();

})

LngbreakButton.addEventListener('click', () => {
  pomodoroMinutes = lonngBreak;
  state = 'break';
  buttonsState(true, false, false, true, true);
  resetTimes();
  starttimer();
})

// Reset timer
clearButton.addEventListener('click', () => {
  isStarted = false;
  timer.elapsedTime = 0;
  let ddate = new Date();
  ddate.setMinutes(ddate.getMinutes() + pomodoroMinutes);
  timer.startTime = ddate
  width = 100;
  elem.style.width = width + "%";
  calcMinsSeconds();
})

function starttimer() {
  // Create a new date element and add the pomodoro interval
  let ddate = new Date();
  ddate.setMinutes(ddate.getMinutes() + pomodoroMinutes);
  timer.startTime = ddate;

  if (isStarted === true) {
    let ddate = new Date();
    ddate.setMinutes(ddate.getMinutes());
    timer.startTime = ddate;
  }

  timer.intervalId = setInterval(() => {
    calcMinsSeconds();
    width = (minutes * 60000 + seconds * 1000) / (pomodoroMinutes * 600);
    elem.style.width = width + "%";
    console.log(width);

let lseconds = localStorage.getItem('seconds');
let lminutes = localStorage.getItem('minutes');

    if (lseconds == 0 && lminutes == 0 && state === 'study') {
      alert("TIME'S UP");
      width = 100;
      elem.style.width = width + "%";
      ddate.setMinutes(ddate.getMinutes() + pomodoroMinutes);
      clearInterval(timer.intervalId)
      buttonsState(true, true, true, false, false);
      alertSound.play();
    }

    // Reset timer to initial interval
    else if (seconds == 0 && minutes == 0 && state === 'break') {
      clearInterval(timer.intervalId)
      buttonsState(false, true, true, true, true);
      pomodoroMinutes = initialInterval;
      state = 'study';
      alertSound.play();
      clearButton.disabled = true;
      resetTimes();

    }

  }, 10);
}

function displayTime(minutes, seconds) {
  const leadZeroTime = [minutes, seconds].map(time => time < 10 ? `0${time}` : time)
  time.textContent = leadZeroTime.join(':')
}

// Light and Dark Theme

toggleSwitch.addEventListener('change', switchTheme);


if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
    toggleDarkLightMode(true);
  }

}

function toggleDarkLightMode(isDark) {
  isDark ? toggleImgIcon.setAttribute('src', './img/moon.png') :
    toggleImgIcon.setAttribute('src', './img/sun.png')
}


function switchTheme(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    toggleDarkLightMode(true);
  } else {
    document.documentElement.setAttribute('data-theme', 'light')
    localStorage.setItem('theme', 'light');
    toggleDarkLightMode(false)
  }
}


