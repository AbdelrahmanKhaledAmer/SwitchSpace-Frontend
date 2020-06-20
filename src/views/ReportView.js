"use strict";

import React from "react";
import Report from "../components/Report";

import PropTypes from "prop-types";

export class ReportView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static get propTypes() {
    return {
      history: PropTypes.object,
    };
  }

  render() {
    return (
      <Report
        onSubmit={(user) => this.login(user)}
        error={this.state.error}
      ></Report>
    );
  }
}
