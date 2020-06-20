"use strict";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import EmailValidator from "email-validator";
import Page from "./Page";

const styles = (theme) => ({
  paper: {
    marginTop: "2em",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: "1",
    backgroundColor: "#659dbd",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: "1",
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

class UserSignup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      name: "",
      password: "",
      repeatPassword: "",
      formValid: false,
      errorMsg: {},
      errorValidate: {
        // true means error exist
        email: true,
        name: true,
        password: true,
        repeatPassword: true,
      },
    };
    // bindings
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onRepeatPasswordChange = this.onRepeatPasswordChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }
  validateForm() {
    console.log(this.state.errorValidate);
    this.setState({
      formValid:
        !this.state.errorValidate.email &&
        !this.state.errorValidate.name &&
        !this.state.errorValidate.password &&
        !this.state.errorValidate.repeatPassword,
    });
  }
  onEmailChange(e) {
    const value = e.currentTarget.value;
    let errorMsg = { ...this.state.errorMsg };
    let errorValidate = { ...this.state.errorValidate };

    if (!EmailValidator.validate(value)) {
      errorMsg.email = "This does not look like an email";
      errorValidate.email = true;
    } else {
      errorMsg.email = undefined;
      errorValidate.email = false;
    }
    this.setState(
      { email: value, errorMsg: errorMsg, errorValidate: errorValidate },
      this.validateForm // callback
    );
  }
  onNameChange(e) {
    const value = e.currentTarget.value;
    let errorMsg = { ...this.state.errorMsg };
    let errorValidate = { ...this.state.errorValidate };

    if (value.length < 2) {
      errorMsg.name = "Name must be at least 2 characters";
      errorValidate.name = true;
    } else {
      errorMsg.name = undefined;
      errorValidate.name = false;
    }
    this.setState(
      { name: value, errorMsg: errorMsg, errorValidate: errorValidate },
      this.validateForm // callbacks
    );
  }
  onPasswordChange(e) {
    const value = e.currentTarget.value;
    let errorMsg = { ...this.state.errorMsg };
    let errorValidate = { ...this.state.errorValidate };

    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(value)) {
      errorMsg.password =
        "Password must be at least 6 characters long and contain special character";
      errorValidate.password = true;
    } else {
      errorMsg.password = undefined;
      errorValidate.password = false;
    }
    this.setState(
      { password: value, errorMsg: errorMsg, errorValidate: errorValidate },
      this.validateForm //callback
    );
  }

  onRepeatPasswordChange(e) {
    const value = e.currentTarget.value;
    let errorMsg = { ...this.state.errorMsg };
    let errorValidate = { ...this.state.errorValidate };

    if (value !== this.state.password) {
      errorMsg.repeatPassword = "repeat password must match";
      errorValidate.repeatPassword = true;
    } else {
      errorMsg.repeatPassword = undefined;
      errorValidate.repeatPassword = false;
    }
    this.setState(
      {
        repeatPassword: value,
        errorMsg: errorMsg,
        errorValidate: errorValidate,
      },
      this.validateForm //callback
    );
  }

  submitHandler() {
    let user = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      repeatPassword: this.state.repeatPassword,
    };
    // if (this.state.formValid) {
    this.props.onSubmit(user);
    // }
  }

  static get propTypes() {
    return {
      classes: PropTypes.object.isRequired,
      onSubmit: PropTypes.func.isRequired,
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <Page>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
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
                error={this.state.errorMsg.email ? true : false}
                helperText={this.state.errorMsg.email}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                onChange={this.onNameChange}
                autoFocus
                error={this.state.errorMsg.name ? true : false}
                helperText={this.state.errorMsg.name}
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
                error={this.state.errorMsg.password ? true : false}
                helperText={this.state.errorMsg.password}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="repeatPassword"
                label="Confirm Password"
                type="password"
                id="repeatPassword"
                onChange={this.onRepeatPasswordChange}
                error={this.state.errorMsg.repeatPassword ? true : false}
                helperText={this.state.errorMsg.repeatPassword}
              />
              <input type="file" />

              <Button
                fullWidth
                variant="contained"
                className={classes.submit}
                onClick={this.submitHandler}
              >
                Sign Up
              </Button>

              <div className={classes.centerFold}>
                <Link to={"/login"}>{"Already a member? Login"}</Link>
              </div>
            </form>
          </div>
        </Container>
      </Page>
    );
  }
}

export default withRouter(withStyles(styles)(UserSignup));
