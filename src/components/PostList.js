"use strict";

import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import PostListItem from "../components/PostListItem";
import {withStyles} from "@material-ui/core/styles";

const styles = {
    scrollableCard: {
        maxHeight: "90vh",
        overflowY: "scroll",
    },
};

class PostList extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            posts: PropTypes.array.isRequired,
            classes: PropTypes.object.isRequired,
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <Card elevation={5} className={classes.scrollableCard}>
                {this.props.posts.map((post, idx) => (
                    <PostListItem key={idx} post={post} />
                ))}
            </Card>
        );
    }
}
export default withStyles(styles)(PostList);
