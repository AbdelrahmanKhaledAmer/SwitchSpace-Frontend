"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
import Geocode from "react-geocode";
import {withRouter} from "react-router-dom";
// Material UI Core
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import {withStyles} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
// Material UI Icons
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

Geocode.setApiKey(process.env.GOOGLE_API_KEY);

const styles = theme => ({
    postContainer: {
        marginTop: theme.spacing(1),
    },
    image: {
        width: "100%",
        height: "90%",
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
        color: theme.palette.button.backgroundColor(),
    },
    miniMarginLeft: {
        marginLeft: theme.spacing(1),
    },
    locationListItem: {
        fontSize: "0.75em",
    },
    categoryAndDate: {
        position: "relative",
        textAlign: "center",
        alignItems: "center",
    },
    date: {
        position: "absolute",
        bottom: 0,
        margin: "0 auto",
        marginBottom: theme.spacing(3),
        width: "100%",
        fontSize: "0.85em",
    },
    itemPadding: {
        padding: theme.spacing(0, 3),
    },
    itemMargin: {
        margin: theme.spacing(2, 0),
    },
    chip: {
        backgroundColor: theme.palette.button.backgroundColor(),
        color: theme.palette.button.textColor(),
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
                            <Avatar variant="rounded" src={this.props.post.photos[0].url} className={classes.image} />
                        </Grid>
                        <Grid item xs={6}>
                            <List>
                                <ListItem>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography color="inherit" noWrap className={classes.itemOwned}>
                                                {this.props.post.itemOwned.title}
                                            </Typography>
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
                                    <Typography color="inherit" noWrap>
                                        {this.props.post.itemOwned.description}
                                    </Typography>
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
                            <Chip size="small" label={this.props.post.itemOwned.category} className={classes.chip} />
                            <div className={classes.date} color="inherit">
                                {this.props.post.createdAt.substring(0, 10)}
                            </div>
                        </Grid>
                    </Grid>
                </CardActionArea>
            </Card>
        );
    }
}

export default withRouter(withStyles(styles)(PostListItem));
