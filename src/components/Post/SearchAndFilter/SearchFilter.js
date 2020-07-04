"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
import Geocode from "react-geocode";
import {withRouter} from "react-router-dom";
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
import Slider from "@material-ui/core/Slider";
import Chip from "@material-ui/core/Chip";
// Components
import Page from "../../Page";
import PostList from "../PostList";
import MapContainer from "./MapContainer";
// MISC
import queryString from "query-string";

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
    slider: {
        width: 472,
        marginTop: theme.spacing(5),
    },
    chip: {
        width: 50,
        marginTop: "-45px",
    },
});

class SearchFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wantedCondition: "Any", //any
            ownedCondition: "Any", //any
            itemOwned: "",
            itemWanted: "",
            wantedCategory: "Any", //any
            wantedSubcategory: "Any",
            ownedCategory: "Any", //any
            ownedSubcategory: "Any",
            myLocation: {lng: 0, lat: 0},
            radius: 50, // radius in KM
            city: "",
            validWantedSubcategories: props.categories[props.categories.length - 1].subcategories,
            validOwnedSubcategories: props.categories[props.categories.length - 1].subcategories,
        };

        this.onItemOwnedChange = this.onItemOwnedChange.bind(this);
        this.onItemWantedChange = this.onItemWantedChange.bind(this);
        this.onRadiusChange = this.onRadiusChange.bind(this);
        this.onOwnedConditionChange = this.onOwnedConditionChange.bind(this);
        this.onOwnedCategoryChange = this.onOwnedCategoryChange.bind(this);
        this.onWantedSubcategoryChange = this.onWantedSubcategoryChange.bind(this);
        this.onWantedCategoryChange = this.onWantedCategoryChange.bind(this);
        this.onOwnedSubcategoryChange = this.onOwnedSubcategoryChange.bind(this);
        this.onWantedConditionChange = this.onWantedConditionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
        this.onPostFocusChange = this.onPostFocusChange.bind(this);
        this.onLocationTextChange = this.onLocationTextChange.bind(this);
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            posts: PropTypes.array.isRequired,
            categories: PropTypes.array.isRequired,
            onSubmit: PropTypes.func.isRequired,
            //router props
            history: PropTypes.object.isRequired,
            location: PropTypes.object.isRequired,
            match: PropTypes.object.isRequired,
        };
    }

    componentDidMount() {
        const searchParams = queryString.parse(this.props.location.search);
        // get query params
        const wantedCondition = searchParams.wantedCondition ? searchParams.wantedCondition : this.state.wantedCondition;
        const ownedCondition = searchParams.ownedCondition ? searchParams.ownedCondition : this.state.ownedCondition;
        const itemOwned = searchParams.itemOwned ? searchParams.itemOwned : this.state.itemOwned;
        const itemWanted = searchParams.itemWanted ? searchParams.itemWanted : this.state.itemWanted;
        const wantedCategory = searchParams.wantedCategory ? searchParams.wantedCategory : this.state.wantedCategory;
        const wantedSubcategory = searchParams.wantedSubcategory ? searchParams.wantedSubcategory : this.state.wantedSubcategory;
        // const ownedCategory = searchParams.ownedCategory ? searchParams.ownedCategory : this.state.ownedCategory;
        // const ownedSubcategory = searchParams.ownedSubcategory ? searchParams.ownedSubcategory : this.state.ownedSubcategory;
        const radius = searchParams.radius ? searchParams.radius : this.state.radius;

        let idx = this.props.categories.findIndex(x => x.title === wantedCategory);
        // not found
        if (idx === -1) {
            idx = this.props.categories.length - 1;
        }
        const selectedCat = this.props.categories[idx];

        // set query params
        this.setState(
            {
                wantedCondition: wantedCondition,
                ownedCondition: ownedCondition,
                itemOwned: itemOwned,
                itemWanted: itemWanted,
                wantedCategory: wantedCategory,
                wantedSubcategory: wantedSubcategory,
                validWantedSubcategories: selectedCat.subcategories, // only this is allowed to be in the param field
                // ownedCategory: ownedCategory,
                // wonedSubcategory: ownedSubcategory,
                radius: radius,
            },
            this.handleSubmit
        );
    }

    handleSubmit() {
        let searchQueryBody = {
            itemWanted: this.state.itemWanted,
            itemOwned: this.state.itemOwned,
            wantedCategory: this.state.wantedCategory === "Any" ? "" : this.state.wantedCategory,
            wantedSubcategory: this.state.wantedSubcategory === "Any" ? "" : this.state.wantedSubcategory,
            wantedCondition: this.state.wantedCondition === "Any" ? "" : this.state.wantedCondition,
            ownedCategory: this.state.ownedCategory === "Any" ? "" : this.state.ownedCategory,
            ownedSubcategory: this.state.ownedSubcategory === "Any" ? "" : this.state.ownedSubcategory,
            ownedCondition: this.state.ownedCondition === "Any" ? "" : this.state.ownedCondition,
            lng: this.state.myLocation.lng,
            lat: this.state.myLocation.lat,
            radius: this.state.radius,
        };
        this.props.onSubmit(searchQueryBody);
    }
    onItemWantedChange(e) {
        const value = e.currentTarget.value;
        this.setState({itemWanted: value});
    }

    onItemOwnedChange(e) {
        const value = e.currentTarget.value;
        this.setState({itemOwned: value});
    }

    onRadiusChange(e, value) {
        this.setState({radius: parseInt(value)});
    }

    onWantedCategoryChange(e) {
        const value = e.target.value;
        const idx = this.props.categories.findIndex(x => x.title === value);
        const selectedCat = this.props.categories[idx];
        this.setState({wantedCategory: selectedCat.title, validWantedSubcategories: selectedCat.subcategories, wantedSubcategory: "Any"});
    }

    onWantedSubcategoryChange(e) {
        const value = e.target.value;
        this.setState({wantedSubcategory: value});
    }

    onOwnedCategoryChange(e) {
        const value = e.target.value;
        const idx = this.props.categories.findIndex(x => x.title === value);
        const selectedCat = this.props.categories[idx];

        this.setState({ownedCategory: selectedCat.title, validOwnedSubcategories: selectedCat.subcategories, ownedSubcategory: "Any"});
    }

    onOwnedSubcategoryChange(e) {
        const value = e.target.value;
        this.setState({ownedSubcategory: value});
    }

    onWantedConditionChange(e) {
        const value = e.target.value;
        this.setState({wantedCondition: value});
    }

    onOwnedConditionChange(e) {
        const value = e.target.value;
        this.setState({ownedCondition: value});
    }

    async onLocationChange(loc) {
        let city = this.state.city;
        try {
            let tmpLoc = await Geocode.fromLatLng(loc.lat, loc.lng);
            let components = tmpLoc.results[0].address_components;
            let filtered = components.filter(elem => elem.types[0] == "locality")[0];
            if (filtered) {
                city = filtered.long_name;
            } else {
                city = "unknown";
            }
        } catch (err) {
            console.log(err);
        }
        this.setState({myLocation: loc, city: city});
    }

    async onLocationTextChange(e) {
        const value = e.target.value;
        this.setState({city: value});
        try {
            let entered_loc = await Geocode.fromAddress(value);
            let loc = entered_loc.results[0].geometry.location;
            this.setState({myLocation: loc});
        } catch (err) {
            console.log(err);
        }
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
                                                <TextField
                                                    id="location"
                                                    value={this.state.city}
                                                    onChange={this.onLocationTextChange}
                                                    label="Location"
                                                />
                                                <Slider
                                                    className={classes.slider}
                                                    defaultValue={this.state.radius}
                                                    value={this.state.radius}
                                                    max={400}
                                                    step={1}
                                                    valueLabelDisplay="on"
                                                    onChange={this.onRadiusChange}
                                                />
                                                <Chip size="small" label="KM" className={classes.chip} />
                                                <TextField
                                                    id="itemDesired"
                                                    label="Item Desired"
                                                    value={this.state.itemWanted}
                                                    onChange={this.onItemWantedChange}
                                                />

                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="wantedCondition">Item Desired Condition</InputLabel>
                                                    <Select
                                                        labelId="wantedConditionLabel"
                                                        id="wantedCondition"
                                                        value={this.state.wantedCondition}
                                                        defaultValue={this.state.wantedCondition}
                                                        onChange={this.onWantedConditionChange}>
                                                        <MenuItem value={"Any"}>Any</MenuItem>
                                                        <MenuItem value={"new"}>New</MenuItem>
                                                        <MenuItem value={"used"}>Used</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="desiredCategoryInput">Item Desired Category</InputLabel>
                                                    <Select
                                                        labelId="desiredCategoryLabel"
                                                        id="desiredCategory"
                                                        defaultValue={this.state.wantedCategory}
                                                        value={this.state.wantedCategory}
                                                        onChange={this.onWantedCategoryChange}>
                                                        {this.props.categories.map((category, idx) => (
                                                            <MenuItem key={idx} value={category.title}>
                                                                {category.title}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="desiredSubcategoryInput">Item Desired Subcategory</InputLabel>
                                                    <Select
                                                        labelId="desiredSubccategoryLabel"
                                                        id="desiredSubcategory"
                                                        defaultValue={this.state.wantedSubcategory}
                                                        value={this.state.wantedSubcategory}
                                                        onChange={this.onWantedSubcategoryChange}>
                                                        {this.state.validWantedSubcategories.map((subcategory, idx) => (
                                                            <MenuItem key={idx} value={subcategory == undefined ? "Any" : subcategory.title}>
                                                                {subcategory == undefined ? "Any" : subcategory.title}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                <TextField
                                                    id="itemOwned"
                                                    label="Item Owned"
                                                    value={this.state.itemOwned}
                                                    onChange={this.onItemOwnedChange}
                                                />
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="ownedConditionInput">Item Owned Condition</InputLabel>
                                                    <Select
                                                        labelId="ownedConditionLabel"
                                                        id="ownedCondition"
                                                        value={this.state.ownedCondition}
                                                        defaultValue={this.state.ownedCondition}
                                                        onChange={this.onOwnedConditionChange}>
                                                        <MenuItem value={"Any"}>Any</MenuItem>
                                                        <MenuItem value={"new"}>New</MenuItem>
                                                        <MenuItem value={"used"}>Used</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="ownedCategoryInput">Item Owned Category</InputLabel>
                                                    <Select
                                                        labelId="ownedCategoryLabel"
                                                        id="ownedCategory"
                                                        value={this.state.ownedCategory}
                                                        defaultValue={this.state.ownedCategory}
                                                        onChange={this.onOwnedCategoryChange}>
                                                        <MenuItem value={"Any"}>Any</MenuItem>
                                                        {this.props.categories.map((category, idx) => (
                                                            <MenuItem key={idx} value={category == undefined ? "" : category.title}>
                                                                {category == undefined ? "" : category.title}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="ownedSubcategoryInput">Item Owned Subcategory</InputLabel>
                                                    <Select
                                                        labelId="ownedSubccategoryLabel"
                                                        id="ownedSubcategory"
                                                        defaultValue={this.state.ownedSubcategory}
                                                        value={this.state.ownedSubcategory}
                                                        onChange={this.onOwnedSubcategoryChange}>
                                                        <MenuItem value={"Any"}>Any</MenuItem>
                                                        {this.state.validOwnedSubcategories.map((subcategory, idx) => (
                                                            <MenuItem key={idx} value={subcategory == undefined ? "Any" : subcategory.title}>
                                                                {subcategory == undefined ? "Any" : subcategory.title}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>

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
                        <Card>
                            <div className={classes.postList}>
                                <Zoom in={true} transitionduration={5000}>
                                    <PostList posts={this.props.posts} msgForNoPosts={"Could not find any posts"}></PostList>
                                </Zoom>
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </Page>
        );
    }
}
export default withRouter(withStyles(styles)(SearchFilter));
