import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Home } from "./components/layout";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Home />
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
