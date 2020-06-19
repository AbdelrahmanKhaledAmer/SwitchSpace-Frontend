"use strict";

import React from "react";
import PostListItem from "../components/PostListItem";
import PropTypes from "prop-types";

export class TrendingView extends React.Component {
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
      <PostListItem
        onSubmit={(user) => this.login(user)}
        error={this.state.error}
      ></PostListItem>
    );
  }
}
