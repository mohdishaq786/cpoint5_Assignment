import React, { Component } from "react";
import "./App.css";

import Grocery from "./components/grocery"; // Import the Grocery component

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <img src={backGround} /> */}
        {/* <h1>Grocery Inventory</h1> */}
        <Grocery /> {/* Use the Grocery component */}
      </div>
    );
  }
}

export default App;
