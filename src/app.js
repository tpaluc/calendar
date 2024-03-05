// import * as calendarAPI from './calendarAPI.js';

const calendar = document.querySelector(".calendar");
const date = document.querySelector(".date");
const daysContainer = document.querySelector(".days");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const prevDayBtn = document.querySelector(".prev__day");
const nextDayBtn = document.querySelector(".next__day");
const todayBtn = document.querySelector(".date__btn--today");
const gotoBtn = document.querySelector(".date__btn");
const dateInput = document.querySelector(".date__input");
const dateDay = document.querySelector(".date__day");
const addEventBtn = document.querySelector(".addEventBtn");



let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

//function to add days 
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  //update top date
  date.innerHTML = months[month] + " " + year;

  //add days
  let days = "";

  //previous month days
for (let x = day; x > 0; x--) {
  days += `<div class="day prev-date" data-day="${prevDays - x + 1}">${prevDays - x + 1}</div>`;
}

//actual month days
for (let i = 1; i <= lastDate; i++) {
  if (
    i === new Date().getDate() &&
    year === new Date().getFullYear() &&
    month === new Date().getMonth()
  ) {
    days += `<div class="day today" data-day="${i}">${i}
    <div class="simpleEvent">10-11 Alergolog</div>
    </div>`;
  } else {
    days += `<div class="day" data-day="${i}">${i}
    <div class="simpleEvent">10-11 Alergolog</div>
    </div>`;
  }
}

//next month days
for (let j = 1; j <= nextDays; j++) {
  days += `<div class="day next-date" data-day="${j}">${j}</div>`;
}
  daysContainer.innerHTML = days;
  addListner();
}

//function to add month and year on prev and next button
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

//function to add active on day

function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      // Wewnątrz obsługi kliknięcia na dzień:
    activeDay = Number(e.target.getAttribute('data-day'));

      const clickedDate = `${e.target.innerHTML} ${months[month]} ${year}`;
      dateDay.textContent = clickedDate;

//remove active

      days.forEach((day) => {
        day.classList.remove("active");
      });

//if clicked prev-date or next-date switch to that month

      if (e.target.classList.contains("prev-date")) {
        prevMonth();

//add active to clicked day afte month is change


          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();

        
//add active to clicked day afte month is changed

          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  console.log("here");
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Invalid Date");
}

//function get active day 

function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
}

//change days in day calendar

function changeDay(step) {
  let selectedDate = activeDay ? new Date(year, month, activeDay) : new Date();
  selectedDate.setDate(selectedDate.getDate() + step);
  
  today = selectedDate;
  activeDay = selectedDate.getDate();
  month = selectedDate.getMonth();
  year = selectedDate.getFullYear();

  initCalendar();
  highlightDay();
}

function highlightDay() {
  document.querySelectorAll(".day").forEach(day => day.classList.remove("active"));
  const dayToHighlight = document.querySelector(`.day[data-day="${activeDay}"]`);
  if(dayToHighlight) {
    dayToHighlight.classList.add("active");
    dateDay.textContent = `${activeDay} ${months[month]}`;
  }
}

prevDayBtn.addEventListener("click", () => changeDay(-1));
nextDayBtn.addEventListener("click", () => changeDay(1));

addEventBtn.addEventListener("click", () => {
  console.log("add event");
});
