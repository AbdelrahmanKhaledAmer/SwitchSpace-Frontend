"use strict";

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { ResponsiveBar } from "@nivo/bar";
import PropTypes from "prop-types";
import Page from "./Page";
const styles = {
  trendingContainer: {
    textAlign: "center",
    width: "65%",
    height: "50vh",
    margin: "0 auto",
  },
};

class Trending extends React.Component {
  constructor(props) {
    super(props);
    this.data = [
      { title: "smartphones", posts: 10 },
      { title: "tablets", posts: 9 },
      { title: "chairs", posts: 8 },
      { title: "tables", posts: 7 },
      { title: "cars", posts: 6 },
      { title: "bikes", posts: 5 },
      { title: "microwaves", posts: 4 },
      { title: "utensils", posts: 3 },
    ];

    this.handleChartClick = this.handleChartClick.bind(this);
  }

  handleChartClick(data) {
    console.log(data.indexValue); // TODO: GET POSTS BY SUBCATEGORY
  }

  static get propTypes() {
    return {
      classes: PropTypes.object.isRequired,
      posts: PropTypes.array.isRequired,
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <Page>
        <div className={classes.trendingContainer}>
          <ResponsiveBar
            data={this.data}
            keys={["posts"]}
            indexBy="title"
            margin={{ top: 40, right: 35, bottom: 50, left: 50 }}
            padding={0.3}
            colors={{ scheme: "paired" }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            enableGridY={false}
            enableLabel={false}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            onClick={this.handleChartClick}
          />
        </div>
      </Page>
    );
  }
}
export default withRouter(withStyles(styles)(Trending));
