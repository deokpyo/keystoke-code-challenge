import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Container } from "semantic-ui-react";
import Home from "./components";
import store from "./stores";

class App extends Component {
  render() {
    return (
      <Provider store={store.configureStore()}>
        <Home />
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
