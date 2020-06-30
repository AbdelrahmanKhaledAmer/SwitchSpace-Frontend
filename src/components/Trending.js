"use strict";

import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {BarChart, XAxis, Tooltip, YAxis, Bar, Cell, ResponsiveContainer} from "recharts";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import Page from "./Page";
import PostList from "./Post/PostList";

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
        maxHeight: "90vh",
        // TODO: remove from trending add to search
        overflowY: "scroll",
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
                    <Card elevation={5} className={classes.postsContainer}>
                        <PostList posts={this.props.posts} msgForNoPosts=""></PostList>
                    </Card>
                </React.Fragment>
            </Page>
        );
    }
}
export default withStyles(styles)(Trending);
