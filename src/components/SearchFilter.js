"use strict";
import React from "react";
import Page from "./Page";

//import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

import {withStyles} from "@material-ui/core/styles";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    textBox: {
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
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
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={12} sm={6}>
                            <Container maxWidth="sm">
                                <Typography component="div" style={{backgroundColor: "#cfe8fc", height: "60vh"}} />
                                <form className={classes.textBox} noValidate autoComplete="off">
                                    <TextField id="filled-basic" label="Location" />
                                    <TextField id="filled-basic" label="Radius" />
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

                                    <Button className={classes.button}>Filter</Button>
                                </form>
                            </Container>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.paper}>Posts</Paper>
                        </Grid>
                    </Grid>
                </div>
            </Page>
        );
    }
}
export default withRouter(withStyles(styles)(SearchFilter));
