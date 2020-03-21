import React, { Component } from "react";
import "./App.scss";
import * as ww from "./wordwheel";
import Modal from "react-responsive-modal";

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
      letterArray: new Array(8).fill(""),
      solution: "",
      modalOpen: false
    };
  }

  handleInputChange(index, event) {
    // Update array with uppercase letter
    const newLetterArray = this.state.letterArray;
    const validInput = /^[A-z?]$/.test(event.target.value);
    if (validInput) {
      newLetterArray[index] = event.target.value.toUpperCase();
      this.setState({ letterArray: newLetterArray });
      // Try and solve
      const displayResult = solve(this.state.letterArray.join(""));
      if (displayResult) {
        this.setState({ solution: displayResult, modalOpen: true });
        return;
      }
      this.setState({ solution: "" });
      // Shift focus to next input box
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
    this.setState({ solution: "" });
  }

  componentDidMount() {
    document.getElementById("input-boxes")[6].focus();
  }

  onCloseModal = () => {
    this.setState({ modalOpen: false });
  };

  modalStyle = {
    modal: { backgroundColor: "black" }
  };

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
        <p className="results">{this.state.solution}</p>
        <button onClick={this.handleClick.bind(this)}>Reset</button>
        <Modal
          open={this.state.modalOpen}
          onClose={this.onCloseModal}
          center
          closeIconSize={16}
          animationDuration={200}
          classNames={{ modal: "modal-style" }}
        >
          <h2>{this.state.solution}</h2>
        </Modal>
      </div>
    );
  }
}

function solve(text) {
  const result = ww.wordwheel(text);
  return result ? result.toString().toUpperCase() : "";
}
