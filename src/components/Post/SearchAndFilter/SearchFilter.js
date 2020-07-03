"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
import Geocode from "react-geocode";
// Material UI Core
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import Zoom from "@material-ui/core/Zoom";
// Components
import Page from "../../Page";
import PostList from "../PostList";
import MapContainer from "./MapContainer";

Geocode.setApiKey(process.env.GOOGLE_API_KEY);

const styles = theme => ({
    inputCard: {
        width: "100%",
    },
    map: {
        margin: theme.spacing(2),
        maxHeight: "20%",
        maxWidth: "20%",
    },
    mapCard: {
        width: "100%",
        height: "50vh",
        position: "relative",
    },
    textBox: {
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
    root: {
        // main grid
        flexGrow: 1,
        // marginTop: theme.spacing(4.5), // for navbar
        padding: theme.spacing(3), // outside margin
    },
    child: {
        flexGrow: 1,
    },
    button: {
        // search button
        alignItems: "center",
    },
    formAlignment: {
        width: "100%",
        textAlign: "center",
    },
    postList: {
        overflowY: "scroll",
        // border: "1px solid ",
        width: "100%",
        float: "left",
        height: "700px",
        position: "relative",
    },
    appBar: {
        // backgroundColor: "#659dbd",
        backgroundColor: theme.palette.type === "dark" ? theme.palette.primary.dark : theme.palette.primary.light,
    },
});

class SearchFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wantedCondition: "",
            ownedCondition: "",
            itemOwned: "",
            itemWanted: "",
            wantedCategory: "",
            ownedCategory: "",
            myLocation: {lng: 0, lat: 0},
            radius: 6371, // radius in KM
            city: "",
        };

        this.onItemOwnedChange = this.onItemOwnedChange.bind(this);
        this.onItemWantedChange = this.onItemWantedChange.bind(this);
        this.onRadiusChange = this.onRadiusChange.bind(this);
        this.onOwnedConditionChange = this.onOwnedConditionChange.bind(this);
        this.onOwnedCategoryChange = this.onOwnedCategoryChange.bind(this);
        this.onWantedCategoryChange = this.onWantedCategoryChange.bind(this);
        this.onWantedConditionChange = this.onWantedConditionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
        this.onPostFocusChange = this.onPostFocusChange.bind(this);
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            posts: PropTypes.array.isRequired,
            categories: PropTypes.array.isRequired,
            onSubmit: PropTypes.func.isRequired,
        };
    }
    handleSubmit() {
        console.log(this.state.myLocation);
        this.props.onSubmit(
            this.state.itemWanted,
            this.state.itemOwned,
            this.state.wantedCategory,
            this.state.wantedCondition,
            this.state.ownedCategory,
            this.state.ownedCondition,
            this.state.myLocation.lng,
            this.state.myLocation.lat,
            this.state.radius
        );
    }
    onItemWantedChange(e) {
        const value = e.currentTarget.value;
        this.setState({itemWanted: value});
    }
    onItemOwnedChange(e) {
        const value = e.currentTarget.value;
        this.setState({itemOwned: value});
    }
    onRadiusChange(e) {
        const value = e.currentTarget.value;
        this.setState({radius: parseInt(value)});
    }
    onWantedCategoryChange(e) {
        const value = e.target.value;
        this.setState({wantedCategory: value});
    }
    onOwnedCategoryChange(e) {
        const value = e.target.value;
        this.setState({ownedCategory: value});
    }
    onWantedConditionChange(e) {
        const value = e.target.value;
        console.log(value);
        this.setState({wantedCondition: value});
    }
    onOwnedConditionChange(e) {
        const value = e.target.value;
        this.setState({ownedCondition: value});
    }
    async onLocationChange(loc) {
        try {
            let tmpLoc = await Geocode.fromLatLng(loc.lat, loc.lng);

            loc = tmpLoc;
            let components = loc.results[0].address_components;

            let filtered = components.filter(elem => elem.types[0] == "locality")[0];
            if (filtered) {
                this.setState({city: filtered.long_name});
            }
        } catch (err) {
            console.log(err);
        }

        this.setState({myLocation: loc});
    }
    // send post in focus
    onPostFocusChange(idx) {
        console.log(idx);
    }

    render() {
        const {classes} = this.props;

        return (
            <Page>
                <Grid container spacing={3} className={classes.root}>
                    <Grid item sm={5}>
                        <Grid container spacing={3} className={classes.child}>
                            {/* map */}
                            <Grid item sm={12}>
                                <Zoom in={true} transitionduration={500}>
                                    <Card elevation={3} className={classes.mapCard}>
                                        <MapContainer
                                            className={classes.map}
                                            posts={this.props.posts}
                                            radius={parseInt(this.state.radius) * 1000}
                                            onLocationChange={this.onLocationChange}
                                            onPostFocusChange={this.onPostFocusChange}
                                        />
                                    </Card>
                                </Zoom>
                            </Grid>
                            {/* form */}
                            <Grid item sm={12}>
                                <Zoom in={true} transitionduration={500}>
                                    <Card elevation={3} className={classes.inputCard}>
                                        <div className={classes.formAlignment}>
                                            <form className={classes.textBox} noValidate autoComplete="off">
                                                <TextField id="location" value={this.state.city} label="Location" />
                                                <TextField
                                                    id="radius"
                                                    type={"number"}
                                                    label="Radius in Km"
                                                    defaultValue={this.state.radius}
                                                    onChange={this.onRadiusChange}
                                                />
                                                <TextField id="itemDesired" label="Item Desired" onChange={this.onItemWantedChange} />
                                                <br />
                                                <TextField id="itemOwned" label="Item Owned" onChange={this.onItemOwnedChange} />
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="desiredLocation">Item Desired Condition</InputLabel>
                                                    <Select
                                                        labelId="desiredConditionLabel"
                                                        id="desiredCondition"
                                                        //value={this.wantedCondition}
                                                        defaultValue={""}
                                                        onChange={this.onWantedConditionChange}>
                                                        <MenuItem value={"new"}>New</MenuItem>
                                                        <MenuItem value={"used"}>Used</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="desiredCategoryInput">Item Desired Category</InputLabel>
                                                    <Select
                                                        labelId="desiredCategoryLabel"
                                                        id="desiredCategory"
                                                        //value={this.cat}
                                                        defaultValue={""}
                                                        onChange={this.onWantedCategoryChange}>
                                                        {this.props.categories.map((category, idx) => (
                                                            <MenuItem key={idx} value={category == undefined ? "" : category.title}>
                                                                {category == undefined ? "" : category.title}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="ownedConditionInput">Item Owned Condition</InputLabel>
                                                    <Select
                                                        labelId="ownedConditionLabel"
                                                        id="ownedCondition"
                                                        //value={this.condition}
                                                        defaultValue={""}
                                                        onChange={this.onOwnedConditionChange}>
                                                        <MenuItem value={"new"}>New</MenuItem>
                                                        <MenuItem value={"used"}>Used</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="ownedCategoryInput">Item Owned Category</InputLabel>
                                                    <Select
                                                        labelId="ownedCategoryLabel"
                                                        id="ownedCategory"
                                                        //value={this.cat}
                                                        defaultValue={""}
                                                        onChange={this.onOwnedCategoryChange}>
                                                        {this.props.categories.map((category, idx) => (
                                                            <MenuItem key={idx} value={category == undefined ? "" : category.title}>
                                                                {category == undefined ? "" : category.title}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                <br />
                                                <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                                                    Search
                                                </Button>
                                            </form>
                                        </div>
                                    </Card>
                                </Zoom>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item sm={7}>
                        <AppBar position="static" className={classes.appBar}>
                            <Toolbar variant="dense">
                                <Typography variant="h6" color="inherit">
                                    Search Results
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className={classes.postList}>
                            <Zoom in={true} transitionduration={5000}>
                                <PostList posts={this.props.posts} msgForNoPosts={"Could not find any posts"}></PostList>
                            </Zoom>
                        </div>
                    </Grid>
                </Grid>
            </Page>
        );
    }
}
export default withStyles(styles)(SearchFilter);