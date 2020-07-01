"use strict";

import React from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Geocode from "react-geocode";
import {withRouter} from "react-router-dom";

Geocode.setApiKey(process.env.GOOGLE_API_KEY);

const styles = theme => ({
    postContainer: {
        marginTop: theme.spacing(2),
    },
    image: {
        width: theme.spacing(18),
        height: theme.spacing(18),
    },
    itemOwned: {
        fontWeight: "bold",
        fontSize: "1.5em",
    },
    boldText: {
        fontWeight: "bold",
    },
    icon: {
        minWidth: "auto",
        color: "#659dbd",
    },
    miniMarginLeft: {
        marginLeft: "0.5em",
    },
    locationListItem: {
        margin: "0.4em 0 0 0",
        fontSize: "0.75em",
    },
    backdrop: {
        minWidth: "100%",
        background: "#bababa",
        padding: "0.5em",
        borderRadius: "75px",
        color: "#000000",
        textAlign: "center",
        marginTop: theme.spacing(2),
    },
    categoryAndDate: {
        position: "relative",
        textAlign: "center",
        alignItems: "center",
    },
    date: {
        position: "absolute",
        bottom: 0,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: theme.spacing(3),
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: "0.85em",
        color: "#3b3b3b",
    },
    itemPadding: {
        padding: theme.spacing(0, 3),
    },
    itemMargin: {
        margin: theme.spacing(2, 0),
    },
});

class PostListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            postLocation: "Unknown Location",
        };

        this.getLocation = this.getLocation.bind(this);
        this.goToPost = this.goToPost.bind(this);
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            post: PropTypes.object.isRequired,
            history: PropTypes.object,
        };
    }

    componentDidMount() {
        this.getLocation();
    }

    async getLocation() {
        const coord = this.props.post.exchangeLocation.coordinates;
        let loc = await Geocode.fromLatLng(coord[1], coord[0]);
        let components = loc.results[0].address_components;
        let filtered = components.filter(elem => elem.types[0] == "locality")[0];
        if (filtered) {
            this.setState({postLocation: filtered.long_name});
        }
    }

    goToPost() {
        this.props.history.push(`/post/${this.props.post._id}`);
    }

    render() {
        const {classes} = this.props;
        return (
            <Card elevation={5} className={classes.itemMargin}>
                <CardActionArea onClick={this.goToPost} className={classes.itemPadding}>
                    <Grid container spacing={1} className={classes.postContainer}>
                        <Grid item xs={3}>
                            <Avatar src={this.props.post.photos[0].url} className={classes.image} />
                        </Grid>
                        <Grid item xs={6}>
                            <List>
                                <ListItem>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <div className={classes.itemOwned}>{this.props.post.itemOwned.title}</div>
                                        </Grid>
                                        <Grid item container xs={6}>
                                            <div className={classes.icon}>
                                                <PersonOutlineIcon />
                                            </div>
                                            <div>{this.props.post.creatorName}</div>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <div className={classes.boldText}>Exchanged with: </div>
                                    <div className={classes.miniMarginLeft}>{this.props.post.itemDesired.title}</div>
                                </ListItem>
                                <ListItem>
                                    <Typography noWrap>{this.props.post.itemOwned.description}</Typography>
                                </ListItem>
                                <ListItem className={classes.locationListItem}>
                                    <div className={classes.icon}>
                                        <LocationOnOutlinedIcon />
                                    </div>
                                    {this.state.postLocation}
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={3} className={classes.categoryAndDate}>
                            <div className={classes.backdrop}>{this.props.post.itemOwned.category}</div>
                            <div className={classes.date}>{this.props.post.createdAt.substring(0, 10)}</div>
                        </Grid>
                    </Grid>
                </CardActionArea>
            </Card>
        );
    }
}

export default withRouter(withStyles(styles)(PostListItem));
