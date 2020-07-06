"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Material UI Core
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import {withStyles} from "@material-ui/core/styles";
// Components
import ReportList from "./ReportList";
import Page from "../Page";

const styles = theme => ({
    consoleContainer: {
        // marginTop: theme.spacing(10),
        backgroud: "transparent",
    },
    cardContainer: {
        width: "70%",
        margin: "0 auto",
        marginTop: theme.spacing(3),
        textAlign: "center",
    },
    reportsContainer: {
        margin: theme.spacing(0, 1),
    },
});

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
                <Card elevation={5} className={classes.cardContainer}>
                    <Typography variant={"h3"} color="inherit">
                        Pending Users Reports
                    </Typography>
                    <Zoom in={true} transitionduration={500}>
                        <div className={classes.reportsContainer}>
                            <ReportList
                                reports={this.props.reports}
                                deleteReport={this.props.deleteReport}
                                msgForNoPosts="There are currently no reports"
                            />
                        </div>
                    </Zoom>
                </Card>
            </Page>
        );
    }
}
export default withStyles(styles)(AdminConsole);
