// import React from "react";


function selectTaskList(listId) {
  switch (listId) {
    case 1:
      return this.state.tasks;
    case 2:
      return this.state.tasksTue;
      default:
           throw new Error("input parameter to selectTaskList function is one of the days");
  }
}

export default { selectTaskList };
