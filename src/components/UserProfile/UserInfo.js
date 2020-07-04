"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Material UI Core
import {withStyles} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
//Material UI Lab
import Rating from "@material-ui/lab/Rating";

const styles = theme => ({
    mainContainer: {
        display: "flex",
        flexDirection: "row",
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
        width: theme.spacing(18),
        height: theme.spacing(18),
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
        return (
            <div className={classes.mainContainer} color="inherit">
                <Avatar className={classes.avatar} src={userInfo.profilePicture ? userInfo.profilePicture.url + "?versionId=null" : null} />
                <div className={classes.ratingsContainer}>
                    <Typography className={classes.username} color="inherit">
                        <b>{userInfo.name}</b>
                    </Typography>
                    <div className={classes.ratingItemContainer}>
                        <Rating value={userInfo.commRate} precision={0.5} size="large" readOnly color="inherit" />
                        <Typography className={classes.ratingText} color="inherit">
                            Communication
                        </Typography>
                    </div>
                    <div className={classes.ratingItemContainer}>
                        <Rating value={userInfo.descriptionRate} color="inherit" precision={0.5} size="large" readOnly />
                        <Typography className={classes.ratingText} color="inherit">
                            Item as described
                        </Typography>
                    </div>
                    <div className={classes.ratingItemContainer}>
                        <Rating value={userInfo.conditionRate} precision={0.5} size="large" readOnly />
                        <Typography className={classes.ratingText} color="inherit">
                            Item condition
                        </Typography>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(UserInfo);
