"use strict";

import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Geocode from "react-geocode";

import PostDetails from "../Post/PostDetails";
import UserInfo from "../UserInfo";
import Page from "../Page";

Geocode.setApiKey(process.env.GOOGLE_API_KEY);

const styles = theme => ({
    conatiner: {
        textAlign: "center",
        width: "95%",
        margin: "0 auto",
        marginTop: theme.spacing(7),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 2,
        color: "#fff",
    },
    icon: {
        minWidth: "auto",
        color: "#659dbd",
    },
    date: {
        textAlign: "right",
        fontSize: "0.85em",
        color: "#3b3b3b",
        marginBottom: theme.spacing(1),
    },
    rightGridItem: {
        textAlign: "right",
    },
    topContainer: {
        marginBottom: theme.spacing(1),
    },
    button: {
        backgroundColor: "#659dbd",
        color: "#fbeec1",
        marginTop: theme.spacing(1),
    },
    reportButton: {
        backgroundColor: "#a70000",
        color: "#fbeec1",
        marginTop: theme.spacing(1),
    },
    bottom: {
        textAlign: "right",
    },
});

class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            postLocation: "Unknown Location",
        };

        this.getLocation = this.getLocation.bind(this);
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            post: PropTypes.object.isRequired,
            loading: PropTypes.bool.isRequired,
        };
    }

    componentDidMount() {
        this.getLocation();
    }

    async getLocation() {
        if (this.props.loading || !this.post.exchangeLocation) {
            return;
        }
        const coord = this.props.post.exchangeLocation.coordinates;
        let loc = await Geocode.fromLatLng(coord[1], coord[0]);
        let components = loc.results[0].address_components;
        let filtered = components.filter(elem => elem.types[0] == "locality")[0];
        if (filtered) {
            this.setState({postLocation: filtered.long_name});
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <Page>
                {this.props.loading ? (
                    <Backdrop className={classes.backdrop} open={this.props.loading}>
                        <CircularProgress color="primary" />
                    </Backdrop>
                ) : (
                    <Container className={classes.conatiner}>
                        <Grid container justify="space-between" alignItems="center" className={classes.topContainer}>
                            <Grid item xs={6}>
                                <UserInfo userInfo={this.props.post.creatorId} />
                            </Grid>
                            <Grid item xs={6} className={classes.rightGridItem}>
                                <div className={classes.date}>{this.props.post.createdAt.substring(0, 10)}</div>
                                <Grid container justify="flex-end">
                                    <div className={classes.icon}>
                                        <LocationOnOutlinedIcon />
                                    </div>
                                    {this.state.postLocation}
                                </Grid>
                                <Button className={classes.button}>Contact for Exchange</Button>
                                {/*TODO: START CHAT*/}
                            </Grid>
                        </Grid>
                        <PostDetails post={this.props.post} />
                        <div className={classes.bottom}>
                            <Button className={classes.reportButton}>Report Post</Button>
                        </div>
                    </Container>
                )}
            </Page>
        );
    }
}
export default withStyles(styles)(Post);
