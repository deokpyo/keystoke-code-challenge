import React, { Component } from "react";
import { connect } from "react-redux";
import { Loader, Dimmer, Transition } from "semantic-ui-react";
import { APIManager } from "../utils";
import { Login, Dashboard } from "./containers";
import actions from "../actions";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    // check for logged in user
    APIManager.get("/users/currentuser", null, (err, response) => {
      if (err) {
        alert(err);
        return;
      }
      if (response.user == null) {
        setTimeout(
          () =>
            this.setState({
              loading: false
            }),
          500
        );
        return;
      }
      // user is logged in
      this.props.currentUserReceived(response.user);
      setTimeout(
        () =>
          this.setState({
            loading: false
          }),
        500
      );
    });
  }
  render() {
    const { loading } = this.state;
    return (
      <div>
        <Transition
          visible={loading}
          unmountOnHide={true}
          animation="scale"
          duration={500}
        >
          <Dimmer active inverted>
            <Loader inverted size="large">
              Loading
            </Loader>
          </Dimmer>
        </Transition>
        <Transition visible={!loading} animation="scale" duration={500}>
          {this.props.currentUser == null ? <Login /> : <Dashboard />}
        </Transition>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    currentUser: state.user.currentUser
  };
};

const dispatchToProps = dispatch => {
  return {
    currentUserReceived: user => dispatch(actions.currentUserReceived(user))
  };
};

export default connect(stateToProps, dispatchToProps)(Home);
