"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Material UI Core
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import {withStyles} from "@material-ui/core/styles";
// Components
import ReportList from "./ReportList";
import Page from "../Page";

const styles = {
    consoleContainer: {
        // marginTop: theme.spacing(10),
        backgroud: "transparent",
    },
};

class AdminConsole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    static get propTypes() {
        return {
            reports: PropTypes.array.isRequired,
            deleteReport: PropTypes.func.isRequired,
            classes: PropTypes.object.isRequired,
            loading: PropTypes.bool.isRequired,
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <Page>
                <Grid container direction="column" justify="space-between" alignItems="center" spacing={2} className={classes.consoleContainer}>
                    <Grid item xs={5}>
                        <Typography variant={"h4"}>{"Pending Users Reports"}</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Zoom in={true} transitionduration={500}>
                            <ReportList reports={this.props.reports} deleteReport={this.props.deleteReport}></ReportList>
                        </Zoom>
                    </Grid>
                </Grid>
            </Page>
        );
    }
}
export default withStyles(styles)(AdminConsole);
