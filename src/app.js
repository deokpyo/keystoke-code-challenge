import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Home } from "./components/layout";
import { Container } from "semantic-ui-react";

class App extends Component {
  render() {
    return (
      <Container>
        <Home />
      </Container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
