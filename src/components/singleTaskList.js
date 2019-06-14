// import generateID from "./id-generator";
import React from "react";
import { Input, Item } from "./functions-group-a";
// import App from "./App";

function SingleTaskList({
  tasks,
  onDragStartHandler,
  handleStrikethrough,
  spanClickHandler,
  onDropHandler,
  dragOverHandler,
  theDay,
  handleEnterPress,
  handleNewInput,
  handleInputField
}) {
  return (
    <div className="inputAndList-container">
      {/* <p>{theDay}</p> */}
      <Input
        type="text"
        value={handleInputField(theDay)}
        onKeyDown={event => handleEnterPress(event, theDay)}
        placeholder={String(theDay)}
        onChange={event => handleNewInput(event, theDay)}
      />
      <ul
        className="taskList"
        onDrop={event => onDropHandler(event, theDay)}
        onDragOver={dragOverHandler}
      >
        {tasks.map((task, index) => (
          <Item
            id={task.id}
            key={`${task.id}-${index}`}
            description={task.text}
            onClick={handleStrikethrough}
            className={task.isDone ? "done" : "toDo"}
            draggable="true"
            onDragStart={event => {
              onDragStartHandler(event, task.id);
            }}
            onClickSpan={event => {
              spanClickHandler(event, task.id);
            }}
          />
        ))}
      </ul>
    </div>
  );
}

export default SingleTaskList;