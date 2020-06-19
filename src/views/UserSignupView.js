"use strict";

import React from "react";

import UserSignup from "../components/UserSignup";

import UserAuthService from "../services/UserAuthService";
import PropTypes from "prop-types";
export class UserSignupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // need to defince prop type for every function
  static get propTypes() {
    return {
      history: PropTypes.object,
    };
  }
  async signup(user) {
    try {
      await UserAuthService.register(user);
      // TODO redirects
      this.props.history.push("/");
    } catch (err) {
      console.error(err);
      this.setState({
        error: err,
      });
    }
  }

  render() {
    return (
      <UserSignup
        onSubmit={(user) => this.signup(user)}
        error={this.state.error}
      ></UserSignup>
      // <UserSignup></UserSignup>
    );
  }
}
