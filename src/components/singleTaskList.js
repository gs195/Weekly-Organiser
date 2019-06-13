import generateID from "./id-generator";
import React from "react";
import { Item } from "./functions-group-a";
// import App from "./App";

function SingleTaskList({tasks, onDragStartHandler, handleStrikethrough, spanClickHandler}) {
  console.log("tasks is", tasks);
  return (
    <ul>
      {tasks.map(task => (
        <Item
          id={task.id}
          key={generateID()}
          description={task.text}
          onClick={handleStrikethrough}
          className={task.isDone ? "done" : "toDo"}
          draggable="true"
          onDragStart={(event) => {onDragStartHandler(event, task.id);}}
          onClickSpan={event => {spanClickHandler(event, task.id);}}
        />
      ))}
    </ul>
  );
}

export default SingleTaskList;
