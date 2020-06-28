"use strict";

import React from "react";
import PropTypes from "prop-types";
import PostListItem from "../components/PostListItem";
import Typography from "@material-ui/core/Typography";

class PostList extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            posts: PropTypes.array.isRequired,
            msgForNoPosts: PropTypes.string.isRequired,
        };
    }

    render() {
        if (this.props.posts.length == 0) {
            return (
                <Typography variant="h5" align="center">
                    {this.props.msgForNoPosts}
                </Typography>
            );
        }

        return this.props.posts.map((post, idx) => <PostListItem key={idx} post={post} />);
    }
}
export default PostList;
