"use strict";

import React from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import Geocode from "react-geocode";
import {Divider} from "@material-ui/core";

Geocode.setApiKey(process.env.GOOGLE_API_KEY);

const styles = {
    image: {
        clipPath: "circle()",
        width: "100%",
        margin: "1em 0 0 0",
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
        minWidth: "150px",
        background: "#bababa",
        padding: "0.5em",
        borderRadius: "75px",
        color: "#000000",
        textAlign: "center",
    },
};

class PostListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            postLocation: "Unknown Location",
        };

        this.getLocation = this.getLocation.bind(this);

        this.post = {
            _id: "5ee2869e3d8df45c02a0f382",
            creatorId: "5ee245bbdedc1468ff6e3221",
            itemOwned: {
                title: "BMW X3",
                condition: "Used",
                modelYear: 2010,
                description: "Used in a good condition",
                category: "vehicles",
                subcategory: "cars",
            },
            itemDesired: {
                title: "Audi A5",
                condition: "New",
                modelYear: 2019,
                description: "Must be new",
                category: "vehicles",
                subcategory: "cars",
            },
            exchangeLocation: {
                type: "Point",
                coordinates: [48.249653, 11.626915],
            },
            photos: ["photo1", "photo2"],
        };

        this.user = {
            _id: "5ee245bbdedc1468ff6e3221",
            commRate: 0,
            conditionRate: 0,
            descriptionRate: 0,
            tier: "PerPost",
            violationsCount: 0,
            password: "$2y$10$9LUVPLcVuq34H9F8MQs.V.JrfXpJlIN4QU9uRREgWxlEgM7G1uVsO",
            name: "mohamed",
            email: "mohamed@gmail.com",
            reviews: [],
            deleted: false,
            deletedAt: null,
        };

        this.getLocation();
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            post: PropTypes.object.isRequired,
        };
    }

    async getLocation() {
        const coord = this.post.exchangeLocation.coordinates;
        let loc = await Geocode.fromLatLng(coord[0], coord[1]);
        let components = loc.results[0].address_components;
        let filtered = components.filter(elem => elem.types[0] == "locality")[0];
        if (filtered) {
            this.setState({postLocation: filtered.long_name});
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <img
                            src="https://static.toiimg.com/photo/61654288.cms" // TODO: GET IMAGE FROM POST
                            className={classes.image}></img>
                    </Grid>
                    <Grid item xs={6}>
                        <List>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <div className={classes.itemOwned}>{this.post.itemOwned.title}</div>
                                    </Grid>
                                    <Grid item container xs={6}>
                                        <div className={classes.icon}>
                                            <PersonOutlineIcon />
                                        </div>
                                        <div>{this.user.name}</div>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <div className={classes.boldText}>Exchanged with: </div>
                                <div className={classes.miniMarginLeft}>{this.post.itemDesired.title}</div>
                            </ListItem>
                            <ListItem>
                                <div>{this.post.itemOwned.description}</div>
                                {/*TODO: CUT DESCRIPTION SHORT OF LENGTH OF COMPONENT*/}
                            </ListItem>
                            <ListItem className={classes.locationListItem}>
                                <div className={classes.icon}>
                                    <LocationOnOutlinedIcon />
                                </div>
                                {this.state.postLocation}
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={3}>
                        <ListItem>
                            <div className={classes.backdrop}>{this.post.itemOwned.category}</div>
                        </ListItem>
                        <ListItem>{/*TODO: ADD DATE OR NOT?*/}</ListItem>
                    </Grid>
                </Grid>
                <Divider />
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(PostListItem));
