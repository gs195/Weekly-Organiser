import React from "react";
import "../styles/App.css";
import generateID from "./id-generator";
import Button from "./Button.js";
import SingleTaskList from "./singleTaskList";
import { getDateStamp } from "./Date.js";
import NewsReader from "./NewsReader";
import axios from "axios";

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
      fieldValue: [
        { value: "", day: days.Monday },
        { value: "", day: days.Tuesday },
        { value: "", day: days.Wednesday },
        { value: "", day: days.Thursday },
        { value: "", day: days.Friday }
      ],
      tasks: [],
      news: []
    };
    this.url =
      "https://newsapi.org/v2/top-headlines?country=sg&apiKey=fa07257270a44bd0951cf0efbb2e1bb7";
  }

  componentDidMount() {
    console.log("I am here");
    const gotItem = JSON.parse(localStorage.getItem("myTasks"));
    if (gotItem) {
      this.setState({ tasks: gotItem });
      console.log("tasks", this.state.tasks);
    }
    axios({
      method: "get",
      url: this.url
    })
      .then(response => {
        this.setState({ news: response.data.articles.splice(0, 4) });
        console.log(this.state.news);
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  tasksPending = () => {
    const completedTasks = this.state.tasks.filter(t => {
      return t.isDone;
    });
    return this.state.tasks.length - completedTasks.length;
  };

  handleStrikethrough = event => {
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
  };

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
    return newArray;
  };

  spanClickHandler = (event, id) => {
    let confirmation = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmation) {
      return;
    }
    let newArray = this.state.tasks.filter(task => {
      return task.id !== id;
    });
    this.setState({
      tasks: newArray
    });
    localStorage.setItem("myTasks", JSON.stringify(newArray));
  };

  handleEnterPress = (event, theDay) => {
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
    const result = this.taskListUpdate(theText, theDay);
    this.setState({ fieldValue: newFieldValueArray });
    localStorage.setItem("myTasks", JSON.stringify(result));
  };

  dragOverHandler = event => {
    event.preventDefault();
  };

  onDragStartHandler = (event, text, id) => {
    event.dataTransfer.setData("text/plain", text);
    this.idOfTransferredData = id;
  };

  onDropHandler = (event, imposition) => {
    let textOfTransferredData = event.dataTransfer.getData("text");
    let newArray = this.state.tasks.filter(task => {
      if (
        task.text === textOfTransferredData &&
        task.id === this.idOfTransferredData
      ) {
        task.day = imposition;
      }
      return task;
    });
    localStorage.setItem("myTasks", JSON.stringify(newArray));
    this.setState({
      tasks: newArray
    });
  };

  handleInputField = theDay => {
    let newFieldValueArray = this.state.fieldValue.filter(
      obj => obj.day === theDay
    );
    return newFieldValueArray[0].value;
  };

  clearAll = () => {
    let confirmation = window.confirm(
      "Are you sure you want to delete all tasks"
    );
    if (!confirmation) {
      return;
    }
    this.setState({ tasks: [] });
    localStorage.removeItem("myTasks");
  };

  render() {
    //filters state.tasks to return an array of task objects with day = input parameter key-value pair.
    const getTasksOfDay = listDay =>
      this.state.tasks.filter(task => task.day === listDay);

    //obtains an array of weekday keys, and for each key in this array, creates a <SingleTaskList> component.
    const getTasksofEachDay = () => {
      const weekdayKeys = Object.keys(days).filter(
        key => days[key] !== "None" && days[key] !== "Weekend"
      );
      return weekdayKeys.map((key, idx) => {
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
        <div id="clear-button-container" className="clear-all">
          <Button type="Button" onClick={this.clearAll} />
        </div>
        <div className="info">
          <p className="date">{getDateStamp()}</p>
          <p className="quote">Mongabay Rainforest, Brazil</p>
        </div>
        <div className="organiser-container">{getTasksofEachDay()}</div>
        <div className="news-container">
          {!!this.state.news &&
            !!this.state.news.length &&
            this.state.news.map((newsItem, index) => {
              return (
                <NewsReader newsArticle={newsItem} key={index} index={index} />
              );
            })}
          {/* {!!this.state.news && !!this.state.news.length && (
            <NewsReader newsArticles={this.state.news} />
          )} */}
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

//
