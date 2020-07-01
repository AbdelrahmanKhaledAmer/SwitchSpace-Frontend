"use strict";
// React
import PropTypes from "prop-types";
import React from "react";
import {Link} from "react-router-dom";
// Material UI Core
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
// Material UI Icons
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// Components
import Page from "../Page";
import UserDataForm from "./UserDataForm";

const styles = theme => ({
    paper: {
        // marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#659dbd",
    },
    centerFold: {
        textAlign: "center",
    },
});

class UserSignup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            onSubmit: PropTypes.func.isRequired,
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <Page>
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <Card className={classes.paper} elevation={5}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Register
                        </Typography>
                        <UserDataForm onSubmit={this.props.onSubmit}></UserDataForm>
                        <div className={classes.centerFold}>
                            <Link to={"/login"}>{"Already a member? Login"}</Link>
                        </div>
                    </Card>
                </Container>
            </Page>
        );
    }
}

export default withStyles(styles)(UserSignup);
