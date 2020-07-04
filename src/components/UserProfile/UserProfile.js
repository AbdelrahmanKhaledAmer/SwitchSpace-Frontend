"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
//Material UI Core
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Card from "@material-ui/core/Card";
// Material UI Lab
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
// Components
import Page from "../Page";
import UserInfo from "./UserInfo";
import PostList from "../Post/PostList";
import ReviewList from "./ReviewList";
import UserDataForm from "../UserAuth/UserDataForm";
import ReviewForm from "./ReviewForm";

const styles = theme => ({
    topContainer: {
        width: "70%",
        // marginTop: theme.spacing(10),
        marginLeft: "auto",
        marginRight: "auto",
    },
    appBar: {
        // backgroundColor: "#659dbd",
        backgroundColor: theme.palette.type === "dark" ? theme.palette.primary.dark : theme.palette.primary.light,
    },
    createReviewButton: {
        // backgroundColor: "#659dbd",
        // color: "#FFFFFF",
    },
    tabsCard: {
        width: "70%",
        marginTop: theme.spacing(3),
        marginLeft: "auto",
        marginRight: "auto",
    },
});
class UserProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            selectedTab: PropTypes.string.isRequired,
            onTabChange: PropTypes.func.isRequired,
            onProfileUpdate: PropTypes.func.isRequired,
            onUserReview: PropTypes.func.isRequired,
            onModalClose: PropTypes.func.isRequired,
            onModalOpen: PropTypes.func.isRequired,
            userInfo: PropTypes.object.isRequired,
            posts: PropTypes.array.isRequired,
            isMyProfile: PropTypes.bool.isRequired,
            myEmail: PropTypes.string, // not required
            tabs: PropTypes.array.isRequired,
            modalOpen: PropTypes.bool.isRequired,
        };
    }

    render() {
        const {classes} = this.props;
        return (
            // TODO: add pagination for reviews and posts
            <Page>
                <React.Fragment>
                    <div className={classes.topContainer}>
                        <Grid container justify="space-between">
                            <Grid item>
                                <UserInfo userInfo={this.props.userInfo} />
                            </Grid>
                            <Grid item>
                                {!this.props.isMyProfile ? (
                                    <Button
                                        className={classes.createReviewButton}
                                        variant="contained"
                                        startIcon={<Icon>add_circle</Icon>}
                                        onClick={this.props.onModalOpen}>
                                        Create Review
                                    </Button>
                                ) : (
                                    ""
                                )}
                            </Grid>
                        </Grid>
                    </div>
                    <Card elevation={5} className={classes.tabsCard}>
                        <TabContext value={this.props.selectedTab}>
                            <AppBar className={classes.appBar} position="static">
                                <TabList onChange={this.props.onTabChange}>
                                    {this.props.tabs.map((tab, idx) => (
                                        <Tab key={idx} label={tab.label} value={tab.value} />
                                    ))}

                                    {/* <Tab label="Reviews" value="reviews" />
                                <Tab label="Posts" value="posts" />
                            {this.props.isMyProfile ? <Tab label="Settings" value="settings" /> : <Tab></Tab>} */}
                                </TabList>
                            </AppBar>
                            <TabPanel value="posts">
                                {/* TODO: change name of the message */}
                                <PostList posts={this.props.posts} msgForNoPosts="No posts available"></PostList>
                            </TabPanel>
                            <TabPanel value="reviews">
                                <ReviewList reviews={this.props.userInfo.reviews}></ReviewList>
                            </TabPanel>
                            {/* render this pannel iff my profile */}

                            <TabPanel value="settings">
                                <UserDataForm
                                    userData={{email: this.props.myEmail, name: this.props.userInfo.name}}
                                    onSubmit={this.props.onProfileUpdate}></UserDataForm>
                            </TabPanel>
                        </TabContext>
                    </Card>
                    <ReviewForm
                        modalOpen={this.props.modalOpen}
                        onClose={this.props.onModalClose}
                        onUserReview={this.props.onUserReview}
                        revieweeId={this.props.userInfo._id}
                    />
                </React.Fragment>
            </Page>
        );
    }
}

export default withStyles(styles)(UserProfile);
