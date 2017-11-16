import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Home } from "./components/layout";
import { Container } from "semantic-ui-react";
import store from "./stores";
import { Provider } from "react-redux";

class App extends Component {
  render() {
    return (
      <Provider store={store.configureStore()}>
        <Container>
          <Home />
        </Container>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
