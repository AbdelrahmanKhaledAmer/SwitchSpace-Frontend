"use strict";

import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {withRouter} from "react-router-dom";
import {BarChart, XAxis, Tooltip, YAxis, Bar, Cell, ResponsiveContainer} from "recharts";
import PropTypes from "prop-types";
import Page from "./Page";
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
        this.data = [
            {title: "smartphones", posts: 10},
            {title: "tablets", posts: 9},
            {title: "chairs", posts: 8},
            {title: "tables", posts: 7},
            {title: "cars", posts: 6},
            {title: "bikes", posts: 5},
            {title: "microwaves", posts: 4},
            {title: "utensils", posts: 3},
        ];

        this.handlePvBarClick = this.handlePvBarClick.bind(this);
    }

    handlePvBarClick(data, index) {
        console.log(`Pv Bar (${index}) Click: `, data); // TODO: GET POSTS BY SUBCATEGORY
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            posts: PropTypes.array.isRequired,
        };
    }

    render() {
        const {classes} = this.props;

        return (
            <Page>
                <div className={classes.trendingContainer}>
                    <ResponsiveContainer width="100%" height="100%" className={classes.chart}>
                        <BarChart data={this.data} onClick={this.handlePvBarClick}>
                            <XAxis dataKey="title" /> {/*change axis color axisLine={{ stroke: "purple" }}*/}
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="posts">
                                {this.data.map(entry => (
                                    <Cell key={`cell-${entry.title}`} fill={"#659dbd"} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Page>
        );
    }
}
export default withRouter(withStyles(styles)(Trending));
