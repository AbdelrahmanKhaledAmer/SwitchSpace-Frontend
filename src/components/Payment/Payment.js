"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Material UI Core
import {withStyles} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Zoom from "@material-ui/core/Zoom";
// Components
import CheckoutForm from "./CheckoutForm";
// MISC
import {loadStripe} from "@stripe/stripe-js";
import {Elements, ElementsConsumer} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
// set card options
const styles = theme => ({
    paper: {
        // marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2),
    },
});

class Payment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.submitHandler = this.submitHandler.bind(this);
    }

    async submitHandler(request) {
        request["tier"] = this.props.tier.name;
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
            modalOpen: PropTypes.bool.isRequired,
            onClose: PropTypes.func.isRequired,
        };
    }

    render() {
        return (
            <Dialog
                aria-labelledby="form-dialog-title"
                open={this.props.modalOpen}
                onClose={() => this.props.onClose()}
                TransitionComponent={Zoom}
                transitionDuration={500}>
                <DialogTitle id="form-dialog-title">
                    {"Change tiers to "}
                    {this.props.tier.name}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>To renew or change your subscription please enter the credit card information below</DialogContentText>

                    <Elements stripe={stripePromise}>
                        <ElementsConsumer>
                            {({stripe, elements}) => (
                                <CheckoutForm price={this.props.tier.price} onSubmit={this.submitHandler} stripe={stripe} elements={elements} />
                            )}
                        </ElementsConsumer>
                    </Elements>
                </DialogContent>
            </Dialog>
        );
    }
}

export default withStyles(styles)(Payment);
