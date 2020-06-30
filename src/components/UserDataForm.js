"use strict";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";

import PropTypes from "prop-types";
import React from "react";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import ImageIcon from "@material-ui/icons/Image";
import EmailValidator from "email-validator";

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
    formButton: {
        backgroundColor: "#659dbd",
        color: "#fbeec1",
        marginTop: theme.spacing(1),
    },
    formButtonError: {
        backgroundColor: "#a70000",
        color: "#fbeec1",
        marginTop: theme.spacing(1),
    },
    input: {
        display: "none",
    },
});

class UserProfileEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            name: "",
            password: undefined,
            repeatPassword: undefined,
            profilePicture: undefined,
            formValid: false,
            errorMsg: {},
            errorValidate: {
                // true means error exist
                email: true,
                name: true,
                password: true,
                repeatPassword: false,
                profilePicture: false,
            },
        };
        // bindings
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onRepeatPasswordChange = this.onRepeatPasswordChange.bind(this);
        this.onImageUpload = this.onImageUpload.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    componentDidMount() {
        if (this.props.userData) {
            this.setState({name: this.props.userData.name, errorValidate: {email: false, name: false, password: false}}, this.validateForm);
        }
    }
    validateForm() {
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
        let errorMsg = {...this.state.errorMsg};
        let errorValidate = {...this.state.errorValidate};

        if (!EmailValidator.validate(value)) {
            errorMsg.email = "This does not look like an email";
            errorValidate.email = true;
        } else {
            errorMsg.email = undefined;
            errorValidate.email = false;
        }
        this.setState(
            {email: value, errorMsg: errorMsg, errorValidate: errorValidate},
            this.validateForm // callback
        );
    }
    onNameChange(e) {
        const value = e.currentTarget.value;
        let errorMsg = {...this.state.errorMsg};
        let errorValidate = {...this.state.errorValidate};

        if (value.length < 2) {
            errorMsg.name = "Name must be at least 2 characters";
            errorValidate.name = true;
        } else {
            errorMsg.name = undefined;
            errorValidate.name = false;
        }

        if (!value && this.props.userData) {
            errorMsg.name = undefined;
            errorValidate.name = false;
        }
        this.setState(
            {name: value, errorMsg: errorMsg, errorValidate: errorValidate},
            this.validateForm // callbacks
        );
    }
    onPasswordChange(e) {
        const value = e.currentTarget.value;
        let errorMsg = {...this.state.errorMsg};
        let errorValidate = {...this.state.errorValidate};

        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        if (!passwordRegex.test(value)) {
            errorMsg.password = "Password must be at least 6 characters long and contain special character";
            errorValidate.password = true;
        } else {
            errorMsg.password = undefined;
            errorValidate.password = false;
        }

        if (!value && this.props.userData) {
            errorMsg.password = undefined;
            errorValidate.password = false;
        }

        this.setState(
            {password: value, errorMsg: errorMsg, errorValidate: errorValidate},
            this.validateForm //callback
        );
    }

    onRepeatPasswordChange(e) {
        const value = e.currentTarget.value;
        let errorMsg = {...this.state.errorMsg};
        let errorValidate = {...this.state.errorValidate};

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
    onImageUpload(e) {
        // let photos = [];
        this.setState({profilePicture: e.currentTarget.files[0]});
    }

    submitHandler() {
        if (this.state.formValid) {
            let user = {};
            if (this.props.userData) {
                //update form
                if (this.state.password) user["password"] = this.state.password;
                if (this.state.repeatPassword) user["repeatPassword"] = this.state.repeatPassword;
                if (this.state.name) user["name"] = this.state.name;
            } else {
                // register
                user = {email: this.state.email, name: this.state.name, password: this.state.password, repeatPassword: this.state.repeatPassword};
            }
            // put profile picture eitherway
            if (this.state.profilePicture) user["profilePicture"] = this.state.profilePicture;

            this.props.onSubmit(user);
        }
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            onSubmit: PropTypes.func.isRequired,
            userData: PropTypes.object,
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <form className={classes.form} noValidate>
                <Typography>{this.state.formValid ? "valid" : "not valid"}</Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    defaultValue={this.props.userData ? this.props.userData.email : ""}
                    disabled={this.props.userData ? true : false}
                    onChange={this.onEmailChange}
                    error={this.state.errorMsg.email ? true : false}
                    helperText={!this.props.userData ? this.state.errorMsg.email : "Email can not be changed"}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    defaultValue={this.props.userData ? this.props.userData.name : ""}
                    onChange={this.onNameChange}
                    error={this.state.errorMsg.name ? true : false}
                    helperText={this.state.errorMsg.name}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
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
                    fullWidth
                    name="repeatPassword"
                    label="Confirm Password"
                    type="password"
                    id="repeatPassword"
                    onChange={this.onRepeatPasswordChange}
                    error={this.state.errorMsg.repeatPassword ? true : false}
                    helperText={this.state.errorMsg.repeatPassword}
                />
                <FormControl fullWidth error={this.state.errorValidate.profilePicture}>
                    <input accept="image/*" className={classes.input} id="contained-button-file" type="file" onChange={this.onImageUpload} />
                    <label htmlFor="contained-button-file">
                        <Button
                            fullWidth
                            className={!this.state.errorValidate.profilePicture ? classes.submit : classes.formButtonError}
                            component="span"
                            endIcon={<CloudUploadIcon />}>
                            Upload Profile Picture
                        </Button>
                    </label>
                    <FormHelperText>{this.state.errorMsg.profilePicture}</FormHelperText>
                    {this.state.profilePicture ? (
                        <Typography align="center">
                            <ImageIcon />
                            {this.state.profilePicture.name}
                        </Typography>
                    ) : (
                        ""
                    )}
                </FormControl>
                <Button fullWidth variant="contained" className={classes.submit} onClick={this.submitHandler}>
                    {this.props.userData ? "Update Profile" : "Register"}
                </Button>
            </form>
        );
    }
}

export default withStyles(styles)(UserProfileEdit);