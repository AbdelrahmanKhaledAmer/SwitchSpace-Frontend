"use strict";
// React
import PropTypes from "prop-types";
import React from "react";
// Material UI Core
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
// Material UI Icons
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ImageIcon from "@material-ui/icons/Image";
// MISC
import EmailValidator from "email-validator";
// import FileInput from "@brainhubeu/react-file-input";
// import "@brainhubeu/react-file-input/dist/react-file-input.css";

const styles = theme => ({
    paper: {
        // marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2),
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    centerFold: {
        textAlign: "center",
    },
    formButtonError: {
        backgroundColor: theme.palette.button.error,
        color: theme.palette.button.textColor(),
        marginTop: theme.spacing(1),
    },
    input: {
        display: "none",
    },
    button: {
        // search button
        backgroundColor: theme.palette.button.backgroundColor(),
        color: theme.palette.button.textColor(),
        "&:hover": {
            backgroundColor: theme.palette.button.hover.backgroundColor(),
        },
        margin: theme.spacing(3, 0, 2),
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
                repeatPassword: true,
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
        this.setState({profilePicture: e.currentTarget.files[0]});
    }

    submitHandler(ev) {
        ev.preventDefault();
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
        } else {
            let errorMsg = {};
            if (this.state.errorValidate.email) errorMsg.email = "Email is required";
            if (this.state.errorValidate.password) errorMsg.password = "Password is required";
            if (this.state.errorValidate.name) errorMsg.name = "Name is required";
            if (this.state.errorValidate.repeatPassword) errorMsg.repeatPassword = "Repeat Password is required";
            this.setState({errorMsg: errorMsg});
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
            <form className={classes.form} noValidate onSubmit={this.submitHandler}>
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
                            className={!this.state.errorValidate.profilePicture ? classes.button : classes.formButtonError}
                            component="span"
                            variant="contained"
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
                <Button fullWidth variant="contained" type="submit" className={classes.button} onClick={this.submitHandler}>
                    {this.props.userData ? "Update Profile" : "Register"}
                </Button>
            </form>
        );
    }
}

export default withStyles(styles)(UserProfileEdit);
