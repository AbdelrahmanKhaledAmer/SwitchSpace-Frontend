"use strict";
// Material UI Icons
import React from "react";
import PropTypes from "prop-types";
// Material UI Core
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
// Components
import Page from "./Page";
import PostList from "./Post/PostList";
// MISC
import {BarChart, XAxis, Tooltip, YAxis, Bar, Cell, ResponsiveContainer} from "recharts";

const styles = theme => ({
    graphContainer: {
        textAlign: "center",
        width: "90%",
        height: "90%",
        margin: "0 auto",
        marginTop: theme.spacing(3),
    },
    line: {
        backgroudColor: "purple",
    },
    graphCard: {
        textAlign: "center",
        width: "70%",
        height: "60vh",
        margin: "0 auto",
        // marginTop: theme.spacing(7),
    },
    postsContainer: {
        width: "70%",
        margin: "0 auto",
        marginTop: theme.spacing(3),
    },
});

class Trending extends React.Component {
    constructor(props) {
        super(props);

        this.colors = ["#659dbd", "#457dbd"];

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
                        <div className={classes.graphContainer}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={this.props.data} onClick={this.handlePvBarClick}>
                                    <XAxis dataKey="title" /> {/*change axis color axisLine={{ stroke: "purple" }}*/}
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
                    <div className={classes.postsContainer}>
                        <PostList posts={this.props.posts} msgForNoPosts="Click on a category to see posts"></PostList>
                    </div>
                </React.Fragment>
            </Page>
        );
    }
}
export default withStyles(styles)(Trending);
