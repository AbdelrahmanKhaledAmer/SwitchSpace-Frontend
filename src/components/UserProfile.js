"use strict";

import React from "react";
import PropTypes from "prop-types";
import Page from "./Page";
import UserInfo from "./UserInfo";
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import Card from "@material-ui/core/Card";

const styles = theme => ({
    topContainer: {
        width: "70%",
        marginTop: theme.spacing(10),
        marginLeft: "auto",
        marginRight: "auto",
    },
    appBar: {
        backgroundColor: "#659dbd",
    },
    createReviewButton: {
        backgroundColor: "#659dbd",
        color: "#FFFFFF",
    },
    card: {
        width: "70%",
        marginTop: theme.spacing(3),
        marginLeft: "auto",
        marginRight: "auto",
    },
});
class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: "reviews",
        };

        this.handleChange = this.handleChange.bind(this);
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            userInfo: PropTypes.object.isRequired,
        };
    }

    handleChange(event, newValue) {
        this.setState({
            selectedTab: newValue,
        });
    }

    render() {
        const {classes} = this.props;
        return (
            // TODO: add pagination for reviews and posts
            <Page>
                <div className={classes.topContainer}>
                    <Grid container justify="space-between">
                        <Grid item>
                            <UserInfo userInfo={this.props.userInfo} />
                        </Grid>
                        <Grid item>
                            <Button className={classes.createReviewButton} variant="contained" startIcon={<Icon>add_circle</Icon>}>
                                Create Review
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <Card elevation={5} className={classes.card}>
                    <TabContext value={this.state.selectedTab}>
                        <AppBar className={classes.appBar} position="static">
                            <TabList onChange={this.handleChange}>
                                <Tab label="Reviews" value="reviews" />
                                <Tab label="Posts" value="posts" />
                            </TabList>
                        </AppBar>
                        <TabPanel value="reviews">No Reviews</TabPanel>
                        <TabPanel value="posts">No Posts</TabPanel>
                    </TabContext>
                </Card>
            </Page>
        );
    }
}

export default withStyles(styles)(UserProfile);
