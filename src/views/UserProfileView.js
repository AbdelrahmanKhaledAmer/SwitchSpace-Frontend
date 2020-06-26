"use strict";

import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import {withStyles} from "@material-ui/core/styles";
import UserProfile from "../components/UserProfile";

const styles = {
    centered: {
        position: "fixed",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-50px",
    },
};

class UserProfileView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
        };
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
        };
    }

    componentDidMount() {
        // TODO: get userInfo from a service
        const userInfo = {
            name: "Frodo Baggins",
            profilePicture: {
                url: "https://tipsmake.com/data/thumbs/how-to-hide-facebook-profile-picture-thumb-EhRnrBzAY.jpg",
                key: "awsKey",
            },
            commRate: 3.5,
            conditionRate: 3.7,
            descriptionRate: 3.2,
        };

        this.setState({
            loading: false,
            userInfo: userInfo,
        });
    }

    render() {
        const {classes} = this.props;

        // TODO: use a common loader for all components
        if (this.state.loading) {
            return (
                <div>
                    <CircularProgress size={100} className={classes.centered} />
                </div>
            );
        }

        return <UserProfile userInfo={this.state.userInfo} />;
    }
}

export default withStyles(styles)(UserProfileView);
