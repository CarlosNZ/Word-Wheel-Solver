import React, { Component } from "react";
import "./App.scss";
import * as ww from "./wordwheel";
// import Async from "react-async";

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
    const validInput = /^[A-z\?]$/.test(event.target.value);
    if (validInput) {
      newLetterArray[index] = event.target.value.toUpperCase();
      this.setState({ letterArray: newLetterArray, letters: newLetterArray.join("") });
      //Shift focus to next input box
      const nextIndex = index === this.state.letterArray.length - 1 ? 0 : index + 1;
      event.target.form.elements[nextIndex].focus();
      event.target.form.elements[nextIndex].select();
    }
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
                onChange={this.handleInputChange.bind(this, index)}
              />
            ))}
          </form>
        </div>
        <Results text={this.state.letters} />
      </div>
    );
  }
}

function Results(props) {
  // const solved = new Promise(function(resolve, reject) {
  //   if (ww.wordwheel(props.text)) resolve(["This", "Worked"]);
  //   else reject(Error(["Did", "Not", "Work"]));
  // });
  const result = ww.wordwheel(props.text);
  const displayResult = result ? result.toString().toUpperCase() : "";
  return (
    <div id="results">
      <p>{displayResult}</p>
    </div>
  );
}
