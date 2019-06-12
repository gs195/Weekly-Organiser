import React from "react";

function Item({
  description,
  onClick,
  className,
  id,
  day,
  draggable,
  onDragStart,
  onDragOver,
  onDrop
}) {
  return (
    <li
      id={id}
      className={className}
      onClick={onClick}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      day={day}
    >
      {description}
    </li>
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

export { Item, Input, Button };
