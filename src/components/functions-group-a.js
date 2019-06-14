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

export { Item, Input, Button, getTodaysDay };
