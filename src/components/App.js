import React from "react";
import "../styles/App.css";
import generateID from "./id-generator.js";

class ToDoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      tasks: [
        { id: 1, text: "buy milk", isDone: false },
        { id: 2, text: "eat dinner", isDone: false },
        { id: 3, text: "nail javascript", isDone: false },
        { id: 4, text: "give feedback", isDone: false },
        { id: 5, text: "find nemo", isDone: false }
      ],
      tasksTue: [{ id: 6, text: "get a lyf", isDone: false }],
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
    const completedTasks = this.state.tasks.filter(t => {
      return t.isDone;
    });

    return this.state.tasks.length - completedTasks.length;
  };

  handleStrikethrough(event) {
    console.log("event.target.id is: ", event.target.id);
    const targetId = Number(event.target.id);

    this.setState(prevState => ({
      //synthetic event gets nullified in setState()
      tasks: prevState.tasks.map(obj =>
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
    // an onject literal is being directly appended to the tasks list
    //in this.state because setState is being called immeiatedly after.
    //Otherwise, the components would not be re-rendered and setState
    //would need to be called in appending the object literal, which would
    //be done by setting a new modified list to this.state.tasts.
    this.state.tasks.push({
      id: generateID(),
      text: this.state.value,
      isDone: false
    });
    this.setState({ value: "" });
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

  dragOverHandler = event => {
    event.preventDefault();
  };

  onDragStartHandler = event => {
    this.itemBeingDragged = this.state.tasks.filter(t => {
      return t.id === Number(event.target.id);
    });
    console.log("object being dragged is ", this.itemBeingDragged);
    event.dataTransfer.setData("text/plain", event.target.id);
  };

  onDropHandler = () => {
    // event.preventDefault();

    let newList = this.state.tasksTue;
    newList.push(this.itemBeingDragged[0]);
    console.log("The item dropped is -> ", newList);
    this.setState({ tasksTue: newList });
    console.log("new tasksTue = ", this.state.tasksTue);
  };

  render() {
    const TaskList = this.state.tasks.map(task => {
      return (
        <Item
          id={task.id}
          key={generateID()}
          description={task.text}
          onClick={this.handleStrikethrough}
          className={task.isDone ? "done" : "toDo"}
          draggable="true"
          onDragStart={this.onDragStartHandler}
          onDragOver={this.dragOverHandler}
          onDragEnd={this.onDropHandler}
        />
      );
    });

    const TaskList2 = this.state.tasksTue.map(task => {
      return (
        <Item
          id={task.id}
          key={generateID()}
          description={task.text}
          onClick={this.handleStrikethrough}
          className={task.isDone ? "done" : "toDo"}
          draggable="true"
          onDragStart={this.onDragStartHandler}
          onDragOver={this.dragOverHandler}
          onDragEnd={this.onDropHandler}
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

function Item({
  description,
  onClick,
  className,
  id,
  draggable,
  onDragStart,
  onDragOver,
  onDragEnd
}) {
  return (
    <li
      id={id}
      className={className}
      onClick={onClick}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
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

function App() {
  return <ToDoList />;
}

export default App;
