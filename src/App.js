import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import * from "./wordlist.js"
import { wordList } from "./wordlist.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn react and {wordList[10]}
        </a>
      </header>
    </div>
  );
}

export default App;
