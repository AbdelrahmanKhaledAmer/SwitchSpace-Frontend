"use strict";
import React from "react";
//import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import Page from "./Page";

class Report extends React.Component {
  constructor(props) {
    super(props);
  }
  static get propTypes() {
    return {
      posts: PropTypes.array.isRequired,
    };
  }
  render() {
    return <Page></Page>;
  }
}
export default withRouter(Report);
