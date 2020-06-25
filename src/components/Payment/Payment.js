"use strict";

import React from "react";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Page from "../Page";
import PropTypes from "prop-types";
// import Grid from "@material-ui/core/Grid";
import CheckoutForm from "./CheckoutForm";
// import CardSection from "./CardSection";
import {loadStripe} from "@stripe/stripe-js";
import {Elements, ElementsConsumer} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51Gss3pBpTM0LcyRYZosR9f9sFp1jwqdwVoquDByaDRl4ANqTa1al2tEyyXW77OhHJxgssqUTNPtpXHxAo83sVOZA00JZcWzWfG");
// set card options

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

    centerFold: {
        textAlign: "center",
    },
});

class Payment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.submitHandler = this.submitHandler.bind(this);
    }

    async submitHandler(tokenID) {
        const request = {
            stripeToken: tokenID,
            tier: this.props.tier.name,
        };
        console.log(request);
        // submit from the view
        this.props.onSubmit(request);
        event.preventDefault();
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            onSubmit: PropTypes.func.isRequired,
            tier: PropTypes.object.isRequired,
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <Page>
                <Container component="main" maxWidth="sm">
                    <Card className={classes.paper} elevation={5}>
                        <Typography component="h1" variant="h5">
                            {this.props.tier.name}
                        </Typography>
                        <Elements stripe={stripePromise}>
                            <ElementsConsumer>
                                {({stripe, elements}) => (
                                    <CheckoutForm price={this.props.tier.price} onSubmit={this.submitHandler} stripe={stripe} elements={elements} />
                                )}
                            </ElementsConsumer>
                        </Elements>
                    </Card>
                </Container>
            </Page>
        );
    }
}

export default withStyles(styles)(Payment);
