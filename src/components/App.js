import React from "react";
import "../styles/App.css";
import generateID from "./id-generator";
// import { Button } from "./functions-group-a";
import SingleTaskList from "./singleTaskList";

const days = {
  None: "None",
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
  Weekend: "Weekend"
};

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastUpdated: "",
      value: "",
      fieldValue: [
        { value: "", day: days.Monday },
        { value: "", day: days.Tuesday },
        { value: "", day: days.Wednesday },
        { value: "", day: days.Thursday },
        { value: "", day: days.Friday }
      ],
      tasks: [
        { id: 1, text: "buy milk", isDone: false, day: days.Monday },
        { id: 2, text: "eat dinner", isDone: false, day: days.Monday },
        { id: 3, text: "nail javascript", isDone: false, day: days.Monday },
        { id: 4, text: "give feedback", isDone: false, day: days.Monday },
        { id: 5, text: "find nemo", isDone: false, day: days.Monday },
        { id: 6, text: "find my keys", isDone: false, day: days.Tuesday }
      ]
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

  handleNewInput = (event, theDay) => {
    let newArray = this.state.fieldValue.map(obj => {
      if (obj.day === theDay) {
        obj.value = event.target.value;
      }
      return obj;
    });
    console.log("handleNewInput newArray is: ", newArray);
    this.setState({ fieldValue: newArray });
  };

  taskListUpdate = (theText, theDay) => {
    let newArray = [...this.state.tasks];
    newArray.push({
      id: generateID(),
      text: theText,
      isDone: false,
      day: theDay
    });
    this.setState({ tasks: newArray });
  };

  spanClickHandler = (event, id) => {
    let confirmation = window.confirm(
      "Are you sure you want to delete this task? You cannot undo this action."
    );
    if (!confirmation) {
      return;
    }
    let newArray = this.state.tasks.filter(task => {
      if (task.id === id) {
        task.isDone = true;
        task.day = days.None;
      }
      return task;
    });

    this.setState({
      ...this.state,
      newArray
    });
  };

  handleClick(event, theDay) {
    if (event.target.value === "") return;
    let theText;
    let newFieldValueArray = this.state.fieldValue.map(obj => {
      if (obj.day === theDay) {
        theText = obj.value;
        obj.value = "";
      }
      return obj;
    });
    this.taskListUpdate(theText, theDay);
    this.setState({ fieldValue: newFieldValueArray });
  }

  handleEnterPress(event, theDay) {
    let enterKeyCode = 13;
    if (event.keyCode !== enterKeyCode || event.target.value === "") return;
    let theText;
    let newFieldValueArray = this.state.fieldValue.map(obj => {
      if (obj.day === theDay) {
        theText = obj.value;
        obj.value = "";
      }
      return obj;
    });
    this.taskListUpdate(theText, theDay);
    this.setState({ fieldValue: newFieldValueArray });
  }

  dragOverHandler = event => {
    event.preventDefault();
  };

  onDragStartHandler = (event, id) => {
    event.dataTransfer.setData("text/plain", id);
  };

  onDropHandler = (event, imposition) => {
    let idty = Number(event.dataTransfer.getData("text"));

    let newArray = this.state.tasks.filter(task => {
      if (task.id === idty) {
        task.day = imposition;
      }
      return task;
    });

    this.setState({
      ...this.state,
      newArray
    });
  };

  handleInputField = theDay => {
    let newFieldValueArray = this.state.fieldValue.filter(
      obj => obj.day === theDay
    );
    console.log("new field value array is: ", newFieldValueArray);
    return newFieldValueArray[0].value;
  };

  render() {
    const getTasksOfDay = listDay =>
      this.state.tasks.filter(task => task.day === listDay);

      
    const getTasksofEachDay = () => {
      const filtered = Object.keys(days).filter(
        key => days[key] !== "None" && days[key] !== "Weekend"
      );
      console.log(
        "type of handleEnterPress (app.js) is ",
        typeof this.handleEnterPress
      );
      return filtered.map((key, idx) => {
        return (
          <SingleTaskList
            key={idx}
            tasks={getTasksOfDay(days[key])}
            onDragStartHandler={this.onDragStartHandler}
            handleStrikethrough={this.handleStrikethrough}
            spanClickHandler={this.spanClickHandler}
            onDropHandler={this.onDropHandler}
            dragOverHandler={this.dragOverHandler}
            handleInputField={this.handleInputField}
            theDay={days[key]}
            handleEnterPress={this.handleEnterPress}
            handleNewInput={this.handleNewInput}
          />
        );
      });
    };

    return (
      <div id="container">
        {/* <div className="form">
          <Button
            type="Button"
            onClick={event => this.handleClick(event, days.Monday)}
          />
        </div> */}
        <div className="info">
          <p className="info">Tasks pending: {this.tasksPending()}</p>
        </div>
        <div className="organiser-container">{getTasksofEachDay()}</div>
      </div>
    );
  }
}

function App() {
  return <ToDoList />;
}

export default App;
