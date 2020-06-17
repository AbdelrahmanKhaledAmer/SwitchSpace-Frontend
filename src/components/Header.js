"use strict";

import React from "react";
import { Toolbar, Button } from "react-md";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import KebabMenu from "./KebabMenu";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  // need to defince prop type for every function
  static get propTypes() {
    return {
      history: PropTypes.object,
      title: PropTypes.string,
    };
  }
  render() {
    return (
      <Toolbar
        colored
        nav={
          <Button onClick={() => this.props.history.push("/")} icon>
            home
          </Button>
        }
        title={this.props.title}
        actions={<KebabMenu id="toolbar-colored-kebab-menu" />}
      ></Toolbar>
    );
  }
}

export default withRouter(Header);
