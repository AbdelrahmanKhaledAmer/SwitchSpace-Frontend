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
      {
        country: "AD",
        "hot dog": 95,
        "hot dogColor": "hsl(91, 70%, 50%)",
        burger: 98,
        burgerColor: "hsl(302, 70%, 50%)",
        sandwich: 35,
        sandwichColor: "hsl(19, 70%, 50%)",
        kebab: 142,
        kebabColor: "hsl(22, 70%, 50%)",
        fries: 179,
        friesColor: "hsl(320, 70%, 50%)",
        donut: 46,
        donutColor: "hsl(199, 70%, 50%)",
      },
      {
        country: "AE",
        "hot dog": 137,
        "hot dogColor": "hsl(12, 70%, 50%)",
        burger: 58,
        burgerColor: "hsl(271, 70%, 50%)",
        sandwich: 182,
        sandwichColor: "hsl(354, 70%, 50%)",
        kebab: 4,
        kebabColor: "hsl(242, 70%, 50%)",
        fries: 33,
        friesColor: "hsl(172, 70%, 50%)",
        donut: 81,
        donutColor: "hsl(22, 70%, 50%)",
      },
      {
        country: "AF",
        "hot dog": 22,
        "hot dogColor": "hsl(334, 70%, 50%)",
        burger: 125,
        burgerColor: "hsl(192, 70%, 50%)",
        sandwich: 160,
        sandwichColor: "hsl(181, 70%, 50%)",
        kebab: 132,
        kebabColor: "hsl(78, 70%, 50%)",
        fries: 130,
        friesColor: "hsl(220, 70%, 50%)",
        donut: 129,
        donutColor: "hsl(123, 70%, 50%)",
      },
      {
        country: "AG",
        "hot dog": 157,
        "hot dogColor": "hsl(23, 70%, 50%)",
        burger: 80,
        burgerColor: "hsl(79, 70%, 50%)",
        sandwich: 45,
        sandwichColor: "hsl(33, 70%, 50%)",
        kebab: 107,
        kebabColor: "hsl(220, 70%, 50%)",
        fries: 7,
        friesColor: "hsl(164, 70%, 50%)",
        donut: 3,
        donutColor: "hsl(79, 70%, 50%)",
      },
      {
        country: "AI",
        "hot dog": 77,
        "hot dogColor": "hsl(209, 70%, 50%)",
        burger: 171,
        burgerColor: "hsl(262, 70%, 50%)",
        sandwich: 150,
        sandwichColor: "hsl(174, 70%, 50%)",
        kebab: 32,
        kebabColor: "hsl(166, 70%, 50%)",
        fries: 106,
        friesColor: "hsl(133, 70%, 50%)",
        donut: 22,
        donutColor: "hsl(121, 70%, 50%)",
      },
      {
        country: "AL",
        "hot dog": 108,
        "hot dogColor": "hsl(331, 70%, 50%)",
        burger: 12,
        burgerColor: "hsl(216, 70%, 50%)",
        sandwich: 167,
        sandwichColor: "hsl(323, 70%, 50%)",
        kebab: 66,
        kebabColor: "hsl(69, 70%, 50%)",
        fries: 30,
        friesColor: "hsl(6, 70%, 50%)",
        donut: 95,
        donutColor: "hsl(21, 70%, 50%)",
      },
      {
        country: "AM",
        "hot dog": 43,
        "hot dogColor": "hsl(56, 70%, 50%)",
        burger: 84,
        burgerColor: "hsl(26, 70%, 50%)",
        sandwich: 171,
        sandwichColor: "hsl(195, 70%, 50%)",
        kebab: 41,
        kebabColor: "hsl(240, 70%, 50%)",
        fries: 174,
        friesColor: "hsl(311, 70%, 50%)",
        donut: 48,
        donutColor: "hsl(331, 70%, 50%)",
      },
    ];
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
            keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
            indexBy="country"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            colors={{ scheme: "nivo" }}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "#38bcb2",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "#eed312",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              {
                match: {
                  id: "fries",
                },
                id: "dots",
              },
              {
                match: {
                  id: "sandwich",
                },
                id: "lines",
              },
            ]}
            borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "country",
              legendPosition: "middle",
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "food",
              legendPosition: "middle",
              legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            legends={[
              {
                dataFrom: "keys",
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
          />
        </div>
      </Page>
    );
  }
}
export default withRouter(withStyles(styles)(Trending));
