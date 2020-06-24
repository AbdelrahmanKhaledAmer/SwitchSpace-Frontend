"use strict";

import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Rating from "@material-ui/lab/Rating";

const styles = theme => ({
    mainContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: theme.spacing(10),
        marginLeft: theme.spacing(5),
    },
    ratingsContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        marginLeft: theme.spacing(2),
    },
    ratingItemContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    ratingText: {
        marginLeft: theme.spacing(2),
    },
    avatar: {
        width: theme.spacing(14),
        height: theme.spacing(14),
    },
    username: {
        fontSize: "18px",
    },
});

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            userInfo: PropTypes.object.isRequired,
        };
    }

    render() {
        const {classes, userInfo} = this.props;
        console.log(userInfo);
        return (
            <div className={classes.mainContainer}>
                <Avatar src={userInfo.profilePicture.url} className={classes.avatar} />
                <div className={classes.ratingsContainer}>
                    <text className={classes.username}>
                        <b>{userInfo.name}</b>
                    </text>
                    <div className={classes.ratingItemContainer}>
                        <Rating value={userInfo.commRate} precision={0.5} size="large" readOnly />
                        <text className={classes.ratingText}> Communication </text>
                    </div>
                    <div className={classes.ratingItemContainer}>
                        <Rating value={userInfo.descriptionRate} precision={0.5} size="large" readOnly />
                        <text className={classes.ratingText}> Item as described </text>
                    </div>
                    <div className={classes.ratingItemContainer}>
                        <Rating value={userInfo.conditionRate} precision={0.5} size="large" readOnly />
                        <text className={classes.ratingText}> Item condition </text>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(UserInfo);
