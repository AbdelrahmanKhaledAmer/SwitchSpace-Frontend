"use strict";

import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {BarChart, XAxis, Tooltip, YAxis, Bar, Cell, ResponsiveContainer} from "recharts";
import PropTypes from "prop-types";
import Page from "./Page";
import PostList from "./PostList";
const styles = theme => ({
    trendingContainer: {
        textAlign: "center",
        width: "65%",
        height: "50vh",
        margin: "0 auto",
        marginTop: theme.spacing(7),
    },
    chart: {
        width: "100px",
        height: "100px",
    },
    line: {
        backgroudColor: "purple",
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
                <div className={classes.trendingContainer}>
                    <ResponsiveContainer width="100%" height="100%" className={classes.chart}>
                        <BarChart data={this.props.data} onClick={this.handlePvBarClick}>
                            <XAxis dataKey="title" /> {/*change axis color axisLine={{ stroke: "purple" }}*/}
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="trendingScore">
                                {this.props.data.map((entry, idx) => (
                                    <Cell key={`cell-${entry.title}`} fill={this.colors[idx % this.colors.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <PostList posts={this.props.posts}></PostList>
                </div>
            </Page>
        );
    }
}
export default withStyles(styles)(Trending);
