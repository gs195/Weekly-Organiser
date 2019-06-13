import generateID from "./id-generator";
import React from "react";
import { Item } from "./functions-group-a";
import App from "./App";

function createItem(objectsArray,) {
  objectsArray
    .map(task => {
      return (
        <Item
          id={task.id}
          key={generateID()}
          description={task.text}
          onClick={App.handleStrikethrough}
          className={task.isDone ? "done" : "toDo"}
          draggable="true"
          onDragStart={event => {
            this.onDragStartHandler(event, task.id);
          }}
        />
      );
    });
}

export default createItem;
