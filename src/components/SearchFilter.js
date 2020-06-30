"use strict";
import React from "react";
import Page from "./Page";
import PostList from "./Post/PostList";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Zoom from "@material-ui/core/Zoom";
import MapContainer from "./MapContainer";

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
});

class SearchFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            wantedCondition: "",
            ownedCondition: "",
            itemOwned: "",
            itemWanted: "",
            wantedCategory: "",
            ownedCategory: "",
            lon: 11.581981,
            lat: 48.135124,
            radius: 1e5 * 1000,
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.onItemOwnedChange = this.onItemOwnedChange.bind(this);
        this.onItemWantedChange = this.onItemWantedChange.bind(this);
        this.onRadiusChange = this.onRadiusChange.bind(this);
        this.onOwnedConditionChange = this.onOwnedConditionChange.bind(this);
        this.onOwnedCategoryChange = this.onOwnedCategoryChange.bind(this);
        this.onWantedCategoryChange = this.onWantedCategoryChange.bind(this);
        this.onWantedConditionChange = this.onWantedConditionChange.bind(this);
        this.hndelSubmitSearch = this.hndelSubmitSearch.bind(this);
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            posts: PropTypes.array.isRequired,
            onSubmit: PropTypes.func.isRequired,
        };
    }
    hndelSubmitSearch() {
        this.props.onSubmit(
            this.state.itemWanted,
            this.state.itemOwned,
            this.state.wantedCategory,
            this.state.wantedCondition,
            this.state.ownedCategory,
            this.state.ownedCondition,
            this.state.lon,
            this.state.lat,
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
        this.setState({radius: value});
    }
    onWantedCategoryChange(e) {
        const value = e.target.value;
        this.setState({open: value});
        this.setState({wantedCategory: value});
    }
    onOwnedCategoryChange(e) {
        const value = e.target.value;
        this.setState({open: value});
        this.setState({ownedCategory: value});
    }
    onWantedConditionChange(e) {
        const value = e.target.value;
        console.log(value);
        this.setState({wantedCondition: value});
        this.setState({open: value});
    }
    onOwnedConditionChange(e) {
        const value = e.target.value;
        this.setState({open: value});
        this.setState({ownedCondition: value});
    }

    handleClose() {
        this.open = false;
    }

    handleOpen() {
        this.open = true;
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
                                        <MapContainer className={classes.map} posts={this.props.posts}></MapContainer>
                                    </Card>
                                </Zoom>
                            </Grid>
                            {/* form */}
                            <Grid item sm={12}>
                                <Zoom in={true} transitionduration={500}>
                                    <Card elevation={3} className={classes.inputCard}>
                                        <div className={classes.formAlignment}>
                                            <form className={classes.textBox} noValidate autoComplete="off">
                                                <TextField id="location" label="Location" />
                                                <TextField id="radius" label="Radius" onChange={this.onRadiusChange} />
                                                <TextField id="itemDesired" label="Item Desired" onChange={this.onItemWantedChange} />
                                                <br />
                                                <TextField id="ItemOwned" label="Item Owned" onChange={this.onItemOwnedChange} />
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="demo-controlled-open-select-label">Item Desired Condition</InputLabel>
                                                    <Select
                                                        labelId="demo-controlled-open-select-label"
                                                        id="demo-controlled-open-select"
                                                        //open={this.open}
                                                        onClose={this.handleClose}
                                                        onOpen={this.handleOpen}
                                                        //value={this.wantedCondition}
                                                        onChange={this.onWantedConditionChange}>
                                                        <MenuItem value={"new"}>New</MenuItem>
                                                        <MenuItem value={"used"}>Used</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="demo-controlled-open-select-label">Item Desired Category</InputLabel>
                                                    <Select
                                                        labelId="demo-controlled-open-select-label"
                                                        id="demo-controlled-open-select"
                                                        //open={this.open}
                                                        onClose={this.handleClose}
                                                        onOpen={this.handleOpen}
                                                        //value={this.cat}
                                                        onChange={this.onWantedCategoryChange}>
                                                        <MenuItem value={"electronics"}>Electronics</MenuItem>
                                                        <MenuItem value={"furniture"}>Furniture</MenuItem>
                                                        <MenuItem value={"vehicles"}>Vehicles</MenuItem>
                                                        <MenuItem value={"kitchenware"}>KitchenWare</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="demo-controlled-open-select-label">Item Owned Condition</InputLabel>
                                                    <Select
                                                        labelId="demo-controlled-open-select-label"
                                                        id="demo-controlled-open-select"
                                                        //open={this.open}
                                                        onClose={this.handleClose}
                                                        onOpen={this.handleOpen}
                                                        //value={this.condition}
                                                        onChange={this.onOwnedConditionChange}>
                                                        <MenuItem value={"new"}>New</MenuItem>
                                                        <MenuItem value={"used"}>Used</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="demo-controlled-open-select-label">Item Owned Category</InputLabel>
                                                    <Select
                                                        labelId="demo-controlled-open-select-label"
                                                        id="demo-controlled-open-select"
                                                        //open={this.open}
                                                        onClose={this.handleClose}
                                                        onOpen={this.handleOpen}
                                                        //value={this.cat}
                                                        onChange={this.onOwnedCategoryChange}>
                                                        <MenuItem value={"electronics"}>Electronics</MenuItem>
                                                        <MenuItem value={"furniture"}>Furniture</MenuItem>
                                                        <MenuItem value={"vehicles"}>Vehicles</MenuItem>
                                                        <MenuItem value={"kitchenware"}>KitchenWare</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <br />
                                                <Button variant="contained" color="primary" onClick={this.hndelSubmitSearch}>
                                                    Search
                                                </Button>
                                            </form>
                                        </div>
                                    </Card>
                                </Zoom>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* post list grid */}
                    <Grid item sm={7}>
                        <PostList posts={this.props.posts} msgForNoPosts={"Could not find any posts"}></PostList>
                        {/* <Grid container spacing={10} className={classes.child}>
                            <Zoom in={true} transitionduration={5000}>
                                <Card elevation={5}>
                                    <PostList posts={this.props.posts}></PostList>
                                </Card>
                            </Zoom>
                        </Grid> */}
                    </Grid>
                </Grid>
            </Page>
        );
    }
}
export default withStyles(styles)(SearchFilter);
