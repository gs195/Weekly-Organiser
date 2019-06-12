import React from "react";
import "../styles/App.css";
import generateID from "./id-generator.js";
import { Item, Input, Button } from "./functions-group-a";
// import selectTaskList from "./task-list-selector";

class ToDoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastUpdated: "",
      value: "",
      tasksMon: [
        { id: 1, text: "buy milk", isDone: false, day: "Mon" },
        { id: 2, text: "eat dinner", isDone: false, day: "Mon" },
        { id: 3, text: "nail javascript", isDone: false, day: "Mon" },
        { id: 4, text: "give feedback", isDone: false, day: "Mon" },
        { id: 5, text: "find nemo", isDone: false, day: "Mon" }
      ],
      tasksTue: [{ id: 6, text: "find my keys", isDone: false, day: "Tue" }],
      tasksWed: [],
      tasksThur: [],
      tasksFri: [],
      tasksWknd: []
    };
    this.handleEnterPress = this.handleEnterPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleStrikethrough = this.handleStrikethrough.bind(this);
  }

  tasksPending = () => {
    const completedTasks = this.state.tasksMon.filter(t => {
      return t.isDone;
    });

    return this.state.tasksMon.length - completedTasks.length;
  };

  handleStrikethrough(event) {
    console.log("event.target.id is: ", event.target.id);
    const targetId = Number(event.target.id);

    this.setState(prevState => ({
      //synthetic event gets nullified in setState()
      tasksMon: prevState.tasksMon.map(obj =>
        obj.id === targetId
          ? Object.assign(
              obj,
              obj.isDone ? { isDone: false } : { isDone: true }
            )
          : obj
      )
    }));
  }

  handleNewInput = event => {
    this.setState({ value: event.target.value });
  };

  taskListUpdate = () => {
    // an onject literal is being directly appended to the tasksMon list
    //in this.state because setState is being called immeiatedly after.
    //Otherwise, the components would not be re-rendered and setState
    //would need to be called in appending the object literal, which would
    //be done by setting a new modified list to this.state.tasts.
    this.state.tasksMon.push({
      id: generateID(),
      text: this.state.value,
      isDone: false
    });
    this.setState({ value: "" });
  };

  getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
  };

  handleClick() {
    if (this.state.value === "") {
      return;
    }
    this.taskListUpdate();
  }

  handleEnterPress(event) {
    if (event.target.value === "") {
      return;
    }
    let enterKeyCode = 13;
    if (event.keyCode === enterKeyCode) {
      this.taskListUpdate();
    }
  }

  selectTaskList(listid) {
    console.log("input tasklist selector day is: ", listid);
    switch (listid) {
      case "Mon":
        console.log("returning this.state.tasksMon");
        return this.state.tasksMon;
      case "Tue":
        console.log("returning this.state.tasksTue");
        return this.state.tasksTue;
      default:
        throw new Error(
          "input parameter to selectTaskList function is not one of the days"
        );
    }
  }

  dragOverHandler = event => {
    event.preventDefault();
  };

  onDragStartHandler = (event, id, itemDay) => {
    console.log("id is ", id);
    // for (let key in this.state) {
    //   console.log("key is", key);
    //   for (let i = 0; i < this.state[key].length; i++) {
    //     console.log("this.state[key][i] and i are", this.state[key][i], i);
    //     if (this.state[key][i] === event.target.day) {
    //       var itemDay = this.state[key][i].day;
    //       break;
    //     }
    //   }
    // }
    console.log("itemDay is ", itemDay);
    this.itemBeingDragged = this.selectTaskList(itemDay).filter(t => {
      return t.id === Number(id);
    });
    console.log("object being dragged is ", this.itemBeingDragged);
    event.dataTransfer.setData("text/plain", event.target.key);
  };

  onDropHandler = (event, imposition, itemDay, id) => {
    //imposition is day of new list, itemDay is day of old list
    //identify the taskList depending on source item's day attribute
    let newList = this.selectTaskList(imposition);
    console.log("newList is ", newList);

    //replace the object's day attribute with the hard-coded one in Item TaskList
    let draggedObject = this.itemBeingDragged[0];
    draggedObject.day = imposition;
    console.log("draggedObject is ", draggedObject);

    //append dragged item to target taskList
    newList.push(draggedObject);
    console.log("The item dropped is -> ", newList);

    //delete dragged item from source taskLlist
    let sourceList = this.selectTaskList(itemDay).map(t => {
      return t.id !== Number(id);
    });

    //update state
    const myKeyTarget = this.getKeyByValue(
      this.state,
      this.selectTaskList(imposition)
    );
    // console.log("myKeyTarget is ", myKeyTarget);
    const myKeySource = this.getKeyByValue(
      this.state,
      this.selectTaskList(itemDay)
    );

    this.state.myKeyTarget = newList;
    this.state.myKeySource = sourceList;
    let timeNow = Date.now();
    this.setState({ lastUpdated: timeNow });
    // console.log("myKeySource is ", myKeySource);
    // this.setState({ myKeyTarget: newList });
    // this.setState({ myKeySource: sourceList });
  };

  render() {
    const TaskList = this.state.tasksMon.map(task => {
      // const dayVar = 1;
      return (
        <Item
          // day={dayVar}
          day={task.day}
          id={task.id}
          key={generateID()}
          description={task.text}
          onClick={this.handleStrikethrough}
          className={task.isDone ? "done" : "toDo"}
          draggable="true"
          onDragStart={event => {
            console.log("this is being called");
            this.onDragStartHandler(event, task.id, task.day);
          }}
          onDragOver={this.dragOverHandler}
          onDrop={event => this.onDropHandler(event, "Mon", task.day, task.id)}
        />
      );
    });

    const TaskList2 = this.state.tasksTue.map(task => {
      // const dayVar = 2;
      return (
        <Item
          // day={dayVar}
          day={task.day}
          id={task.id}
          key={generateID()}
          description={task.text}
          onClick={this.handleStrikethrough}
          className={task.isDone ? "done" : "toDo"}
          draggable="true"
          onDragStart={event => {
            console.log("tue is being called");
            this.onDragStartHandler(event, task.id, task.day);
          }}
          onDragOver={this.dragOverHandler}
          onDrop={event => this.onDropHandler(event, "Tue", task.day, task.id)}
        />
      );
    });

    //draggable -> to make the element in question a draggable component
    //onDrag -> an event listener that is triggered when the graggable element is
    //          being dragged
    //ondragstart -> same as onDrag except it is triggered when dragging first starts

    return (
      <div id="container">
        <div className="form">
          <Input
            type="text"
            value={this.state.value}
            onKeyDown={this.handleEnterPress}
            placeholder="Enter task here..."
            onChange={this.handleNewInput}
          />
          <Button type="Button" onClick={this.handleClick} />
        </div>
        <div>
          <p className="info">Tasks pending: {this.tasksPending()}</p>
        </div>
        <div className="dragStart">
          <ul>{TaskList}</ul>
        </div>
        <div className="dragEnd">
          <ul>{TaskList2}</ul>
        </div>
      </div>
    );
  }
}

function App() {
  return <ToDoList />;
}

export default App;
