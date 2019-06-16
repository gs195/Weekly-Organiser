import React from "react";

function Item({
  description,
  onClick,
  className,
  id,
  draggable,
  onDragStart,
  onDragOver,
  onDrop,
  onClickSpan
}) {
  return (
    <div className="wrapper">
      <li
        id={id}
        className={className}
        onClick={onClick}
        draggable={draggable}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {description}
        <span onClick={onClickSpan}>X</span>
      </li>
    </div>
  );
}

function Input({ type, value, onKeyDown, placeholder, onChange }) {
  return (
    <input
      type={type}
      value={value}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

function Button({ type, onClick }) {
  return (
    <button type={type} onClick={onClick}>
      Add Task
    </button>
  );
}

function getTodaysDay(theDay) {
  const today = new Date();
  let todayString;
  switch (Number(today.getDay())) {
    case 1:
      todayString = "Monday";
      break;
    case 2:
      todayString = "Tuesday";
      break;
    case 3:
      todayString = "Wednesday";
      break;
    case 4:
      todayString = "Thursday";
      break;
    case 5:
      todayString = "Friday";
      break;
    default:
      todayString = "taskList";
  }
  return todayString === theDay ? "today" : "taskList";
}

function getDateStamp() {
  const today = new Date();
  let dayToday;
  let monthToday;
  let dateToday = today.getDate();
  switch (Number(today.getDay())) {
    case 0:
      dayToday = "Sunday";
      break;
    case 1:
      dayToday = "Monday";
      break;
    case 2:
      dayToday = "Tuesday";
      break;
    case 3:
      dayToday = "Wednesday";
      break;
    case 4:
      dayToday = "Thursday";
      break;
    case 5:
      dayToday = "Friday";
      break;
    case 6:
      dayToday = "Saturday";
      break;
    default:
      dayToday = "Error";
  }

  switch (Number(today.getMonth())) {
    case 0:
      monthToday = "January";
      break;
    case 1:
      monthToday = "February";
      break;
    case 2:
      monthToday = "March";
      break;
    case 3:
      monthToday = "April";
      break;
    case 4:
      monthToday = "May";
      break;
    case 5:
      monthToday = "June";
      break;
    case 6:
      monthToday = "July";
      break;
    case 7:
      monthToday = "August";
      break;
    case 8:
      monthToday = "September";
      break;
    case 9:
      monthToday = "October";
      break;
    case 10:
      monthToday = "November";
      break;
    case 11:
      monthToday = "December";
      break;
    default:
      monthToday = "Error";
  }

  return `${dayToday}, ${dateToday} ${monthToday}`;
}

export { Item, Input, Button, getTodaysDay, getDateStamp };
