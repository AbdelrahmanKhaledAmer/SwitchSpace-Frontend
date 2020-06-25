"use strict";

import React from "react";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import Page from "./Page";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

const styles = {
    title: {
        fontSize: 14,
    },
    cardHeader: {
        backgroundColor: "#659dbd",
    },
    cardPricing: {
        textAlign: "center",
    },
};

class PostDetails extends React.Component {
    constructor(props) {
        super(props);
    }
    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
        };
    }
    render() {
        //const {classes} = this.props;

        return (
            <Page>
                <Grid container direction="row" justify="center" alignItems="center" spacing={2}></Grid>
            </Page>
        );
    }
}
export default withStyles(styles)(PostDetails);
