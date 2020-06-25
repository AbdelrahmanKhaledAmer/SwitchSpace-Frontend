import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Modal from "@material-ui/core/Modal";
import Zoom from "@material-ui/core/Zoom";
import Payment from "./Payment/Payment";
import Page from "./Page";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Backdrop from "@material-ui/core/Backdrop";
import CardActionArea from "@material-ui/core/CardActionArea";

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2),
    },
    title: {
        fontSize: 14,
    },
    cardHeader: {
        backgroundColor: "#659dbd",
    },
    cardPricing: {
        textAlign: "center",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
                    pricePerPost: "0,623€",
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
        this.setState({modalOpen: false, activeTier: {}});
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
                <Paper className={classes.paper}>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={4}>
                        {this.state.tiers.map((tier, idx) => (
                            <Grid item xs={3} key={idx}>
                                <Card raised>
                                    <CardHeader title={tier.title} titleTypographyProps={{align: "center"}} className={classes.cardHeader} />
                                    <CardActionArea onClick={() => this.handleOpen(tier)}>
                                        <CardContent>
                                            <div className={classes.cardPricing}>
                                                <Typography variant="h4" color="textPrimary">
                                                    {tier.price}
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
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={this.state.modalOpen}
                        onClose={this.handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 200,
                        }}>
                        <Zoom in={this.state.modalOpen}>
                            <Payment
                                tier={{name: this.state.activeTier.name, price: this.state.activeTier.price}}
                                onSubmit={this.handleSubmit}></Payment>
                        </Zoom>
                    </Modal>
                </Paper>
            </Page>
        );
    }
}
export default withStyles(styles)(Subscription);
