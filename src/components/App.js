import React from "react";
import "../styles/App.css";
import generateID from "./id-generator";
// import { Button } from "./functions-group-a";
import SingleTaskList from "./singleTaskList";
import { getDateStamp } from "./functions-group-a";

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
        {
          id: 1,
          text: "Complete CSS styling for react-app assignment",
          isDone: false,
          day: days.Monday
        },
        {
          id: 2,
          text:
            "Carry out research on how to make responsive websites for touch screen smartphones",
          isDone: false,
          day: days.Monday
        },
        {
          id: 3,
          text:
            "Figure out how to do question 59 of Section 3 of the 2017 GMAT prep book (do we use game theory?)",
          isDone: false,
          day: days.Tuesday
        },
        {
          id: 4,
          text: "Apply for finance class before 5pm dealine on Friday",
          isDone: false,
          day: days.Wednesday
        },
        { id: 5, text: "find nemo", isDone: false, day: days.Monday },
        {
          id: 6,
          text:
            "Get a new bed from IKEA or furniture42 (check selection of both)",
          isDone: false,
          day: days.Friday
        }
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

  onDragStartHandler = (event, text, id) => {
    // let jsonData = { description: text, identity: id };
    event.dataTransfer.setData("text/plain", text);
    this.idOfTransferredData = id;
  };

  onDropHandler = (event, imposition) => {
    // let idty = JSON.parse(event.dataTransfer.getData("text")); //this is the first parameter in dataTransfer.setData() above
    let idty = event.dataTransfer.getData("text");
    let newArray = this.state.tasks.filter(task => {
      if (task.text === idty && task.id === this.idOfTransferredData) {
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
    return newFieldValueArray[0].value;
  };

  render() {
    const getTasksOfDay = listDay =>
      this.state.tasks.filter(task => task.day === listDay);

    const getTasksofEachDay = () => {
      const filtered = Object.keys(days).filter(
        key => days[key] !== "None" && days[key] !== "Weekend"
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
          <p className="date">{getDateStamp()}</p>
          <p className="quote">Mongabay Rainforest, Brazil</p>
        </div>
        <div className="organiser-container">{getTasksofEachDay()}</div>
        <div className="news-container">
          <div id="newsBoxA">
            <a
              href="https://news.google.com/__i/rss/rd/articles/CBMiigFodHRwczovL3d3dy5jaGFubmVsbmV3c2FzaWEuY29tL25ld3Mvd29ybGQvZ290LWFuLWFudGliaW90aWMtcHJlc2NyaXB0aW9uLWZyb20teW91ci1kZW50aXN0LS1jaGFuY2VzLWFyZS0taXQtbWlnaHQtYmUtdW5uZWNlc3NhcnktMTE2Mjg2OTjSAQA?oc=5"
              target="_blank"
              rel="noopener noreferrer"
            >
              (Reuters Health) - More than three-quarters of antibiotic
              prescriptions...
            </a>
          </div>
          <div id="newsBoxB">
            <a
              href="https://news.google.com/__i/rss/rd/articles/CBMiXWh0dHBzOi8vYmdyLmNvbS8yMDE5LzA2LzE0L2dhbGF4eS1mb2xkLXJlbGVhc2UtZGF0ZS1kZWxheWVkLWZvcmV2ZXItZ2l2ZS11cC1idXktYS1nYWxheHktczEwL9IBYWh0dHBzOi8vYmdyLmNvbS8yMDE5LzA2LzE0L2dhbGF4eS1mb2xkLXJlbGVhc2UtZGF0ZS1kZWxheWVkLWZvcmV2ZXItZ2l2ZS11cC1idXktYS1nYWxheHktczEwL2FtcC8?oc=5"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sorry, Galaxy Fold fans, but I have to say it: I told you so -
              BGR...
            </a>
          </div>
          <div id="newsBoxC" />
          <div id="newsBoxD" />
        </div>
        <textarea
          id="instructions"
          className="notes"
          placeholder="Write down your notes here..."
        />
      </div>
    );
  }
}

function App() {
  return <ToDoList />;
}

export default App;
