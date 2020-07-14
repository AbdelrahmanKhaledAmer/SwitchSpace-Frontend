"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
//Material UI Core
import {withStyles, Divider, Typography} from "@material-ui/core";
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
// Services
import UserAuthService from "../../services/UserAuthService";

const styles = theme => ({
    topContainer: {
        width: "70%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    appBar: {
        color: theme.palette.header.textColor(),
        backgroundColor: theme.palette.type === "dark" ? theme.palette.primary.dark : theme.palette.primary.light,
    },
    tabsCard: {
        width: "70%",
        marginTop: theme.spacing(3),
        marginLeft: "auto",
        marginRight: "auto",
    },
    formButtonError: {
        backgroundColor: theme.palette.button.error,
        color: theme.palette.button.textColor(),
        marginTop: theme.spacing(1),
    },
    createReviewButton: {
        backgroundColor: theme.palette.button.backgroundColor(),
        color: theme.palette.button.textColor(),
        "&:hover": {
            background: theme.palette.button.hover.backgroundColor(),
        },
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
            onAccountRemove: PropTypes.func.isRequired,
            onModalClose: PropTypes.func.isRequired,
            onModalOpen: PropTypes.func.isRequired,
            userInfo: PropTypes.object.isRequired,
            posts: PropTypes.array.isRequired,
            isMyProfile: PropTypes.bool.isRequired,
            myEmail: PropTypes.string, // not required
            tabs: PropTypes.array.isRequired,
            modalOpen: PropTypes.bool.isRequired,
            onNotify: PropTypes.func.isRequired,
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
                                <UserInfo userInfo={this.props.userInfo} provideLinkToProfile={false} />
                            </Grid>
                            <Grid item>
                                {
                                    // show "Create Review" button if it not my profile and I am a normal user, not an admin
                                    !this.props.isMyProfile && UserAuthService.isNormalUser() && (
                                        <Button
                                            className={classes.createReviewButton}
                                            variant="contained"
                                            startIcon={<Icon>add_circle</Icon>}
                                            onClick={this.props.onModalOpen}>
                                            Create Review
                                        </Button>
                                    )
                                }
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
                                <Typography color="inherit" variant="h4" noWrap>
                                    {"General"}
                                </Typography>
                                <UserDataForm
                                    userData={{email: this.props.myEmail, name: this.props.userInfo.name}}
                                    onSubmit={this.props.onProfileUpdate}
                                />
                                <Divider></Divider>
                                <Typography color="inherit" variant="h4" noWrap>
                                    {"Advanced Settings"}
                                </Typography>
                                <Button variant="contained" fullWidth className={classes.formButtonError} onClick={this.props.onAccountRemove}>
                                    {"deactivate Account"}
                                </Button>
                            </TabPanel>
                        </TabContext>
                    </Card>
                    <ReviewForm
                        modalOpen={this.props.modalOpen}
                        onClose={this.props.onModalClose}
                        onUserReview={this.props.onUserReview}
                        revieweeId={this.props.userInfo._id}
                        onNotify={this.props.onNotify}
                    />
                </React.Fragment>
            </Page>
        );
    }
}

export default withStyles(styles)(UserProfile);
