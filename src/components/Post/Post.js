"use strict";

import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import PostDetails from "../Post/PostDetails";
import UserInfo from "../UserInfo";
import Page from "../Page";

const styles = theme => ({
    conatiner: {
        textAlign: "center",
        width: "95%",
        margin: "0 auto",
        marginTop: theme.spacing(7),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 2,
        color: "#fff",
    },
});

class Post extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            post: PropTypes.object.isRequired,
            loading: PropTypes.bool.isRequired,
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <Page>
                {this.props.loading ? (
                    <Backdrop className={classes.backdrop} open={this.props.loading}>
                        <CircularProgress color="primary" />
                    </Backdrop>
                ) : (
                    <Container className={classes.conatiner}>
                        <UserInfo userInfo={this.props.post.creatorId} />
                        <PostDetails post={this.props.post} />
                    </Container>
                )}
            </Page>
        );
    }
}
export default withStyles(styles)(Post);
