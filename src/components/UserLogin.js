"use strict";

import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Page from "./Page";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import EmailValidator from "email-validator";

const styles = (theme) => ({
  paper: {
    marginTop: "8",
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

class UserLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      emailError: false,
      password: "",
      passwordError: false,
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onEmailChange(e) {
    const value = e.currentTarget.value;
    this.setState({ email: value });

    if (EmailValidator.validate(value)) {
      this.setState({ emailError: false });
    } else {
      this.setState({ emailError: true });
    }
  }

  onPasswordChange(e) {
    const value = e.currentTarget.value;
    this.setState({ password: value });
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (passwordRegex.test(value)) {
      this.setState({ passwordError: false });
    } else {
      this.setState({ passwordError: true });
    }
  }

  static get propTypes() {
    return {
      classes: PropTypes.object.isRequired,
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
                helperText={
                  this.state.emailError ? "Incorrect Email Address" : ""
                }
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
                helperText={
                  this.state.passwordError
                    ? "Password must be at least 8 charachters in length and must contain at least one number"
                    : ""
                }
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                // type="submit"
                fullWidth
                variant="contained"
                // color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <div className={classes.centerFold}>
                <Link href="" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </div>
            </form>
          </div>
        </Container>
      </Page>
    );
  }
}

export default withRouter(withStyles(styles)(UserLogin));
