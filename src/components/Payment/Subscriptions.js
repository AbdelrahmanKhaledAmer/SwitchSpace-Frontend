"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Material UI Core
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Zoom from "@material-ui/core/Zoom";
import CardActionArea from "@material-ui/core/CardActionArea";
// Components
import Payment from "./Payment";
import Page from "../Page";

const styles = theme => ({
    cardContainer: {
        width: "85%",
        marginTop: theme.spacing(2),
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(1),
    },
    cardHeader: {
        backgroundColor: theme.palette.header.backgroundColor(),
        color: theme.palette.header.textColor(),
    },
    cardPricing: {
        textAlign: "center",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    fullHeightCard: {
        height: "100%",
    },
});

class Subscription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            activeTier: {},
            tiers: [
                {
                    title: "Pay as you post",
                    name: "Per Post",
                    description:
                        "You can make any post you want for just 0.99€. This is suitable for you if you don't feel like you need to use this website often and you just want to use it on the rare occasion.",
                    price: "0.99€/post",
                    pricePerPost: "0.990€",
                },
                {
                    title: "Limited",
                    name: "Limited Subscription",
                    subtitle: "Recommended",
                    description:
                        "If you feel like you have a lot to exchange, you can join our monthly subscription tier for just 4.99 and get up to 8 posts for almost half the price!",
                    price: "4.99€/month",
                    pricePerPost: "0.623€",
                },
                {
                    title: "Unlimited",
                    name: "Unlimited Subscription",
                    description:
                        "Don't want to be limited by a certain number of posts? No problem! Join our unlimited tier, and you can post as many posts as you want all month for only 7.99€.",
                    price: "7.99€/month",
                    pricePerPost: "0.000€",
                },
            ],
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose() {
        this.setState({modalOpen: false});
    }
    handleOpen(tier) {
        this.setState({modalOpen: true, activeTier: tier});
    }
    handleSubmit(request) {
        this.setState({modalOpen: false, activeTier: {}});
        this.props.onSubmit(request);
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
                <Zoom in={true}>
                    <Card raised className={classes.cardContainer}>
                        <Typography variant="h2" color="inherit" align="center">
                            Choose Your Desired Tier
                        </Typography>
                        <br />
                        <Grid container direction="row" justify="center" alignItems="stretch" spacing={2}>
                            {this.state.tiers.map((tier, idx) => (
                                <Grid item xs={4} key={idx}>
                                    <Zoom in={true} transitionduration={500}>
                                        <CardActionArea onClick={() => this.handleOpen(tier)} className={classes.fullHeightCard}>
                                            <Card raised className={classes.fullHeightCard}>
                                                <CardHeader
                                                    title={tier.title}
                                                    titleTypographyProps={{align: "center"}}
                                                    className={classes.cardHeader}
                                                />
                                                <CardContent>
                                                    <div className={classes.cardPricing}>
                                                        <Typography variant="h4" color="textPrimary">
                                                            {tier.price}
                                                        </Typography>
                                                    </div>
                                                    <br />
                                                    <Divider />
                                                    <br />
                                                    <Typography variant="subtitle1" align="left" color="inherit">
                                                        {tier.description}
                                                    </Typography>
                                                    <br />
                                                    <Divider />
                                                    <br />
                                                    <Typography variant="subtitle1" align="center" color="inherit">
                                                        {tier.pricePerPost} per post
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </CardActionArea>
                                    </Zoom>
                                </Grid>
                            ))}
                        </Grid>
                        <Payment
                            modalOpen={this.state.modalOpen}
                            tier={{name: this.state.activeTier.name, price: this.state.activeTier.price}}
                            onClose={this.handleClose}
                            onSubmit={this.handleSubmit}></Payment>
                    </Card>
                </Zoom>
            </Page>
        );
    }
}
export default withStyles(styles)(Subscription);
