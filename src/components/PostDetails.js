"use strict";

import React from "react";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import Page from "./Page";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

const styles = {
    title: {
        fontSize: 14,
    },
    cardHeader: {
        backgroundColor: "#659dbd",
    },
    cardPricing: {
        textAlign: "center",
    },
};
const tiers = [
    {
        title: "Pay as you post",
        description:
            "You can make any post you want for just 0.99€. This is suitable for you if you don't feel like you need to use this website often and you just want to use it on the rare occasion.",
        price: "0.99€/post",
        pricePerPost: "0.990€",
    },
    {
        title: "Limited",
        subtitle: "Recommended",
        description:
            "If you feel like you have a lot to exchange, you can join our monthly subscription tier for just 4.99 and get up to 8 posts for almost half the price!",
        price: "4.99€/month",
        pricePerPost: "0,623€",
    },
    {
        title: "Unlimited",
        description:
            "Don't want to be limited by a certain number of posts? No problem! Join our unlimited tier, and you can post as many posts as you want all month for only 7.99€.",
        price: "7.99€/month",
        pricePerPost: "0.000€",
    },
];
class PostDetails extends React.Component {
    constructor(props) {
        super(props);
    }
    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
        };
    }
    render() {
        const {classes} = this.props;

        return (
            <Page>
                <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                    {tiers.map((tier, idx) => (
                        <Grid item xs={2} key={idx}>
                            <Card raised>
                                <CardHeader title={tier.title} titleTypographyProps={{align: "center"}} className={classes.cardHeader} />
                                <CardContent>
                                    <div className={classes.cardPricing}>
                                        <Typography component="h2" variant="p1" color="textPrimary">
                                            ${tier.price}
                                        </Typography>
                                    </div>
                                    <br />
                                    <Divider />
                                    <br />
                                    <Typography variant="subtitle1" align="left">
                                        {tier.description}
                                    </Typography>
                                    <br />
                                    <Divider />
                                    <br />
                                    <Typography variant="subtitle1" align="center">
                                        {tier.pricePerPost} per post
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Page>
        );
    }
}
export default withStyles(styles)(PostDetails);
