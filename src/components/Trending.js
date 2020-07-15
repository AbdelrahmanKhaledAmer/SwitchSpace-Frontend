"use strict";
// Material UI Icons
import React from "react";
import PropTypes from "prop-types";
// Material UI Core
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Zoom from "@material-ui/core/Zoom";

// Components
import Page from "./Page";
import PostList from "./Post/PostList";
// MISC
import {BarChart, XAxis, Tooltip, YAxis, Bar, Cell, ResponsiveContainer} from "recharts";

const styles = theme => ({
    graphContainer: {
        textAlign: "center",
        width: "90%",
        height: "60%",
        margin: "0 auto",
        marginTop: theme.spacing(3),
    },
    line: {
        backgroudColor: "purple",
    },
    graphCard: {
        textAlign: "center",
        width: "70%",
        height: "50vh",
        margin: "0 auto",
        // marginTop: theme.spacing(7),
    },
    postsCard: {
        width: "70%",
        margin: "0 auto",
        marginTop: theme.spacing(3),
    },
    postsContainer: {
        padding: theme.spacing(0, 1),
        width: "100%",
        margin: "0 auto",
        marginTop: theme.spacing(3),
    },
    cardHeader: {
        width: "100%",
        textAlign: "center",
        backgroundColor: theme.palette.header.backgroundColor(),
        color: theme.palette.header.textColor(),
    },
});

class Trending extends React.Component {
    constructor(props) {
        super(props);

        this.colors = ["#15a4f7", "#15c4ff"];
        const lightColors = ["#15a4f7", "#15c4ff"];
        const darkColors = ["#7e7e7e", "#aeaeae"];
        if (window.localStorage["dark"]) {
            this.colors = darkColors;
        } else {
            this.cardStyle = lightColors;
        }

        this.handlePvBarClick = this.handlePvBarClick.bind(this);
    }

    handlePvBarClick(data) {
        this.props.onCategoryClick(data.activeLabel);
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            posts: PropTypes.array.isRequired,
            data: PropTypes.array.isRequired,
            onCategoryClick: PropTypes.func.isRequired,
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <Page>
                <React.Fragment>
                    <Card elevation={5} className={classes.graphCard}>
                        <CardHeader title="Trending Categories" className={classes.cardHeader} />
                        <div className={classes.graphContainer}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={this.props.data} onClick={this.handlePvBarClick}>
                                    <XAxis dataKey="title" />
                                    <YAxis width={35} />
                                    <Tooltip />
                                    <Bar dataKey="trendingScore">
                                        {this.props.data.map((entry, idx) => (
                                            <Cell key={`cell-${entry.title}`} fill={this.colors[idx % this.colors.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <Card className={classes.postsCard}>
                        <CardHeader title="Trending Posts" className={classes.cardHeader} />
                        <div className={classes.postsContainer}>
                            <Zoom in={true} transitionduration={5000}>
                                <PostList
                                    className={classes.postsContainer}
                                    posts={this.props.posts}
                                    msgForNoPosts="Click on a category to see posts"></PostList>
                            </Zoom>
                        </div>
                    </Card>
                </React.Fragment>
            </Page>
        );
    }
}
export default withStyles(styles)(Trending);
