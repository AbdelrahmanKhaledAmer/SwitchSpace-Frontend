"use strict";

import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import PostListItem from "../components/PostListItem";

class PostList extends React.Component {
  constructor(props) {
    super(props);
  }
  static get propTypes() {
    return {
      classes: PropTypes.object.isRequired,
      posts: PropTypes.array.isRequired,
    };
  }
  render() {
    return (
      <List>
        {[1, 2, 3].map((post) => (
          <PostListItem key={post} post={{}}></PostListItem>
        ))}
      </List>
    );
  }
}
export default withRouter(PostList);
