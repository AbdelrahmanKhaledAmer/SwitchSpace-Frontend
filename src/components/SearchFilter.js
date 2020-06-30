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
import GoogleMap from "../components/GoogleMap";
import Zoom from "@material-ui/core/Zoom";

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
            category: "",
            condition: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }
    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            onSubmit: PropTypes.func.isRequired,
        };
    }
    handleChange(event) {
        const value = event.currentTarget.value;
        this.setState({open: value});
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
                                        <GoogleMap className={classes.map}></GoogleMap>
                                    </Card>
                                </Zoom>
                            </Grid>
                            {/* form */}
                            <Grid item sm={12}>
                                <Zoom in={true} transitionduration={500}>
                                    <Card elevation={3} className={classes.inputCard}>
                                        <div className={classes.formAlignment}>
                                            <form className={classes.textBox} noValidate autoComplete="off">
                                                <TextField id="filled-basic" label="Location" />
                                                <TextField id="filled-basic" label="Radius" />
                                                <TextField id="filled-basic" label="Item Desired" />
                                                <br />
                                                <TextField id="filled-basic" label="Item Owned" />
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="demo-controlled-open-select-label">Condition</InputLabel>
                                                    <Select
                                                        labelId="demo-controlled-open-select-label"
                                                        id="demo-controlled-open-select"
                                                        open={this.open}
                                                        onClose={this.handleClose}
                                                        onOpen={this.handleOpen}
                                                        value={this.condition}
                                                        onChange={this.handleChange}>
                                                        <MenuItem value={"new"}>New</MenuItem>
                                                        <MenuItem value={"used"}>Used</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="demo-controlled-open-select-label">Category</InputLabel>
                                                    <Select
                                                        labelId="demo-controlled-open-select-label"
                                                        id="demo-controlled-open-select"
                                                        open={this.open}
                                                        onClose={this.handleClose}
                                                        onOpen={this.handleOpen}
                                                        value={this.cat}
                                                        onChange={this.handleChange}>
                                                        <MenuItem value={"electronics"}>Electronics</MenuItem>
                                                        <MenuItem value={"furniture"}>Furniture</MenuItem>
                                                        <MenuItem value={"vehicles"}>Vehicles</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <br />
                                                <Button variant="contained" color="primary">
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
                        <Grid container spacing={3} className={classes.child}>
                            <Zoom in={true} transitionduration={500}>
                                <Card elevation={3}>
                                    <PostList posts={[]}></PostList>
                                </Card>
                            </Zoom>
                        </Grid>
                    </Grid>
                </Grid>
            </Page>
        );
    }
}
export default withStyles(styles)(SearchFilter);
