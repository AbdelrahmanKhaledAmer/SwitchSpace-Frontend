"use strict";

import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {Link} from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Page from "./Page";
import PropTypes from "prop-types";
import EmailValidator from "email-validator";

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#659dbd",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#659dbd",
        color: "#fbeec1",
        "&:hover": {
            background: "#558dad",
        },
    },
    centerFold: {
        textAlign: "center",
    },
});

class UserLogin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            emailError: false,
            passwordError: false,
            password: "",
        };

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    onEmailChange(e) {
        const value = e.currentTarget.value;
        const error = EmailValidator.validate(value) ? false : true;
        this.setState({email: value, emailError: error});
    }

    onPasswordChange(e) {
        const value = e.currentTarget.value;
        const error = !value ? true : false;
        this.setState({password: value, passwordError: error});
    }

    submitHandler() {
        let user = {email: this.state.email, password: this.state.password};
        if (!this.state.emailError && this.state.password != "" && this.state.email != "") {
            this.props.onSubmit(user);
        }
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            onSubmit: PropTypes.func.isRequired,
            isAdmin: PropTypes.bool,
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <Page>
                <Container component="main" maxWidth="sm">
                    <Card className={classes.paper} elevation={5}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={this.onEmailChange}
                                autoFocus
                                error={this.state.emailError}
                                helperText={this.state.emailError ? "Incorrect Email Address" : ""}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.onPasswordChange}
                                error={this.state.passwordError}
                                helperText={this.state.passwordError ? "Password is Required" : ""}
                            />
                            {/*TODO: CHECK IF REMEMBER ME IS A VIABLE OPTION*/}
                            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                            <Button fullWidth variant="contained" className={classes.submit} onClick={this.submitHandler}>
                                Sign In
                            </Button>
                            {!this.props.isAdmin ? (
                                <div className={classes.centerFold}>
                                    <Link to={"/register"}>{"Not a member? Register"}</Link>
                                </div>
                            ) : (
                                ""
                            )}
                        </form>
                    </Card>
                </Container>
            </Page>
        );
    }
}

export default withStyles(styles)(UserLogin);
