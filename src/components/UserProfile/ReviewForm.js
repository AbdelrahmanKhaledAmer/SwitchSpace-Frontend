"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
//Material UI Core
import {withStyles} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Zoom from "@material-ui/core/Zoom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// Material UI Lab
import Rating from "@material-ui/lab/Rating";

const styles = theme => ({
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: theme.palette.button.backgroundColor(),
        color: theme.palette.button.textColor(),
        "&:hover": {
            background: theme.palette.button.hover.backgroundColor(),
        },
    },
});

class ReviewForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commRate: 0,
            descriptionRate: 0,
            conditionRate: 0,
            description: "",
            commRateValid: false,
            descriptionRateValid: false,
            conditionRateValid: false,
            // description is optional, so its initial empty state is valid
            descriptionValid: true,
        };

        this.onCommRateChange = this.onCommRateChange.bind(this);
        this.onDescriptionRateChange = this.onDescriptionRateChange.bind(this);
        this.onConditionRateChange = this.onConditionRateChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            modalOpen: PropTypes.bool.isRequired,
            onClose: PropTypes.func.isRequired,
            onUserReview: PropTypes.func.isRequired,
            revieweeId: PropTypes.string.isRequired,
            onNotify: PropTypes.func.isRequired,
        };
    }

    onCommRateChange(_, value) {
        this.setState({commRate: value});
        let commRateValid = false;
        if (value > 0) {
            commRateValid = true;
        }
        this.setState({commRateValid: commRateValid});
    }

    onDescriptionRateChange(_, value) {
        this.setState({descriptionRate: value});
        let descriptionRateValid = false;
        if (value > 0) {
            descriptionRateValid = true;
        }
        this.setState({descriptionRateValid: descriptionRateValid});
    }

    onConditionRateChange(_, value) {
        this.setState({conditionRate: value});
        let conditionRateValid = false;
        if (value > 0) {
            conditionRateValid = true;
        }
        this.setState({conditionRateValid: conditionRateValid});
    }

    onDescriptionChange(event) {
        const value = event.target.value;
        this.setState({description: value});
        let descriptionValid = true;
        // max characters for a review description is 500
        if (value.length > 500) {
            descriptionValid = false;
        }
        this.setState({descriptionValid: descriptionValid});
    }

    onSubmit() {
        const {
            commRate,
            descriptionRate,
            conditionRate,
            description,
            commRateValid,
            descriptionRateValid,
            conditionRateValid,
            descriptionValid,
        } = this.state;
        if (commRateValid && descriptionRateValid && conditionRateValid && descriptionValid) {
            this.props.onUserReview({
                revieweeId: this.props.revieweeId,
                commRate: commRate,
                descriptionRate: descriptionRate,
                conditionRate: conditionRate,
                description: description,
            });
            this.setState({
                commRate: 0,
                descriptionRate: 0,
                conditionRate: 0,
                description: "",
                commRateValid: false,
                descriptionRateValid: false,
                conditionRateValid: false,
                // description is optional, so its initial empty state is valid
                descriptionValid: true,
            });
        } else {
            this.props.onNotify("Please fill the fields correctly", "error");
        }
    }

    onKeyDown(event) {
        if (event.key === "Enter") {
            this.onSubmit();
            event.preventDefault();
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <Dialog
                className={classes.form}
                open={this.props.modalOpen}
                onClose={this.props.onClose}
                TransitionComponent={Zoom}
                transitionDuration={500}>
                <DialogTitle>Review</DialogTitle>
                <DialogContent>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item container xs={12} direction="column" alignItems="center">
                                <Grid item>
                                    <Typography align="center" color="inherit">
                                        Communication *
                                    </Typography>
                                    <Rating size="large" name="commRate" value={this.state.commRate} onChange={this.onCommRateChange} />
                                </Grid>
                            </Grid>
                            <Grid item container xs={12} direction="column" alignItems="center">
                                <Grid item>
                                    <Typography align="center" color="inherit">
                                        Item as described *
                                    </Typography>
                                    <Rating
                                        size="large"
                                        name="descriptionRate"
                                        value={this.state.descriptionRate}
                                        onChange={this.onDescriptionRateChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container xs={12} direction="column" alignItems="center">
                                <Grid item>
                                    <Typography align="center" color="inherit">
                                        Item condition *
                                    </Typography>
                                    <Rating
                                        size="large"
                                        name="conditionRate"
                                        value={this.state.conditionRate}
                                        onChange={this.onConditionRateChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="description"
                                    label="Description (optional)"
                                    name="description"
                                    autoComplete="description"
                                    onChange={this.onDescriptionChange}
                                    onKeyDown={this.onKeyDown}
                                    error={!this.state.descriptionValid}
                                    helperText={this.state.descriptionValid ? "" : "Must not exceed 500 characters"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button className={classes.submit} fullWidth variant="contained" onClick={this.onSubmit}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
        );
    }
}

export default withStyles(styles)(ReviewForm);
