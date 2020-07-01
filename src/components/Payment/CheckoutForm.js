"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Material UI Core
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {Zoom} from "@material-ui/core";
// Components
import CardSection from "./CardSection";
// MISC
import {CardNumberElement} from "@stripe/react-stripe-js";

const cardOptions = {
    style: {
        base: {
            color: "#32325D",
            fontWeight: 500,
            fontFamily: "Source Code Pro, Consolas, Menlo, monospace",
            fontSize: "16px",
            fontSmoothing: "antialiased",

            "::placeholder": {
                color: "#CFD7DF",
            },
            ":-webkit-autofill": {
                color: "#e39f48",
            },
        },
        invalid: {
            color: "#E25950",

            "::placeholder": {
                color: "#FFCCA5",
            },
        },
    },
};

const styles = theme => ({
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#659dbd",
        color: "#fbeec1",
        "&:hover": {
            background: "#558dad",
        },
    },
});
class CheckoutForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            fnameError: false,
            lnameError: false,
            paymentDisabled: false,
        };

        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    onFirstNameChange(e) {
        const value = e.currentTarget.value;
        this.setState({firstname: value});
        if (value.length >= 2) {
            this.setState({fnameError: false});
        } else {
            this.setState({fnameError: true});
        }
    }
    onLastNameChange(e) {
        const value = e.currentTarget.value;
        this.setState({lastname: value});
        if (value.length >= 2) {
            this.setState({lnameError: false});
        } else {
            this.setState({lnameError: true});
        }
    }
    async submitHandler() {
        // check fields are all valid

        const {stripe, elements} = this.props;

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            // TODO:notfiy here
            return;
        }
        if (this.state.fnameError || this.state.lnameError || this.state.firstname === "" || this.state.lastnam === "") {
            console.log("please complete fields correctly");
            return;
        }

        this.setState({paymentDisabled: true});
        const cardNumber = elements.getElement(CardNumberElement);
        // return;
        const result = await stripe.createToken(cardNumber);
        if (result.error) {
            // TODO:notify here
            console.log(result.error.message);
            this.setState({paymentDisabled: false});
        } else {
            console.log("token obtained succesfully");
            // pass the token to your backend API
            const token = result.token.id;

            // call parent to make api call
            this.props.onSubmit({stripeToken: token, firstname: this.state.firstname, lastname: this.state.lastname});
        }
    }
    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            onSubmit: PropTypes.func.isRequired,
            stripe: PropTypes.object,
            elements: PropTypes.object,
            price: PropTypes.string,
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <form onSubmit={this.handleSubmit} className={classes.form}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            margin="none"
                            required
                            fullWidth
                            id="firstname"
                            label="First Name"
                            name="First Name"
                            autoComplete="name"
                            onChange={this.onFirstNameChange}
                            error={this.state.fnameError}
                            helperText={this.state.fnameError ? "Name must be at least 2 characters long" : ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lastname"
                            label="Last Name"
                            name="name"
                            autoComplete="name"
                            onChange={this.onLastNameChange}
                            error={this.state.lnameError}
                            helperText={this.state.lnameError ? "Name must be at least 2 characters long" : ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Zoom in={true}>
                            <CardSection options={cardOptions} />
                        </Zoom>
                        <Button
                            fullWidth
                            variant="contained"
                            disabled={this.state.paymentDisabled}
                            className={classes.submit}
                            onClick={this.submitHandler}>
                            {"Pay"} {this.props.price}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default withStyles(styles)(CheckoutForm);
