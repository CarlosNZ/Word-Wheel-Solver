import React, { Component } from "react";
import "./App.css";
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
  return <input className="letterbox" type="text" value={props.value} />;
}

class Wheel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letters: "NAUSEATE",
      letterArray: []
    };
    this.state.letterArray = this.state.letters.split("");
  }
  render() {
    return (
      <div id="wheel">
        {this.state.letterArray.map((ltr) => (
          <LetterBox value={ltr} />
        ))}
      </div>
    );
  }
}

class Results extends Component {
  render() {
    return <div></div>;
  }
}
