import React, { Component } from "react";
import "./App.scss";
import * as ww from "./wordwheel";

export default App;

function App() {
  return (
    <div className="App">
      <Wheel />
    </div>
  );
}

function LetterBox(props) {
  return (
    <input
      id={props.id}
      name={props.name}
      className="letterbox"
      type="text"
      value={props.value}
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
    />
  );
}

class Wheel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letters: "",
      letterArray: new Array(8).fill("")
    };
    // this.handleInputChange = this.handleInputChange.bind(this, index);
    this.state.letters = this.state.letterArray.join("");
  }

  handleInputChange(index, event) {
    //Update array with uppercase letter
    const newLetterArray = this.state.letterArray;
    const validInput = /^[A-z?]$/.test(event.target.value);
    if (validInput) {
      newLetterArray[index] = event.target.value.toUpperCase();
      this.setState({ letterArray: newLetterArray, letters: newLetterArray.join("") });
      //Shift focus to next input box
      const nextIndex = index === this.state.letterArray.length - 1 ? 0 : index + 1;
      event.target.form.elements[nextIndex].focus();
      event.target.form.elements[nextIndex].select();
    }
  }

  onKeyDown(index, event) {
    if (event.keyCode === 8) {
      //Shift focus to prev input box
      const prevIndex = index === 0 ? 7 : index - 1;
      event.target.form.elements[prevIndex].focus();
      event.target.form.elements[prevIndex].select();
      const newLetterArray = this.state.letterArray;
      newLetterArray[prevIndex] = "";
      this.setState({ letterArray: newLetterArray, letters: newLetterArray.join("") });
    }
  }

  handleClick() {
    this.setState({ letterArray: new Array(8).fill(""), letters: "" });
    document.getElementById("input-boxes")[6].focus();
  }

  componentDidMount() {
    document.getElementById("input-boxes")[6].focus();
  }

  render() {
    return (
      <div id="container">
        <div id="wheel">
          <form id="input-boxes">
            {this.state.letterArray.map((letter, index) => (
              <LetterBox
                value={letter}
                id={"letter_" + index}
                name={"letter_" + index}
                key={index}
                onKeyDown={this.onKeyDown.bind(this, index)}
                onChange={this.handleInputChange.bind(this, index)}
              />
            ))}
          </form>
        </div>
        <Results text={this.state.letters} />
        <button onClick={this.handleClick.bind(this)}>Reset</button>
      </div>
    );
  }
}

function Results(props) {
  const result = ww.wordwheel(props.text);
  const displayResult = result ? result.toString().toUpperCase() : "";
  return (
    <div id="results">
      <p>{displayResult}</p>
    </div>
  );
}
