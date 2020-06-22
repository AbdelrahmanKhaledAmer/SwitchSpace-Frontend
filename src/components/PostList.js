"use strict";

import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import PostListItem from "../components/PostListItem";

class PostList extends React.Component {
    constructor(props) {
        super(props);
    }
    static get propTypes() {
        return {
            posts: PropTypes.array.isRequired,
        };
    }
    render() {
        return (
            <List>
                {this.props.posts.map((post, idx) => (
                    <PostListItem key={idx} post={post}></PostListItem>
                ))}
            </List>
        );
    }
}
export default PostList;
