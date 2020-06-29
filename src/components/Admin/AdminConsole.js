import React from "react";
import PropTypes from "prop-types";
import ReportList from "./ReportList";
import Page from "../Page";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    consoleContainer: {
        marginTop: theme.spacing(10),
    },
});

class AdminConsole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    static get propTypes() {
        return {
            // classes: PropTypes.object.isRequired,
            reports: PropTypes.array.isRequired,
            deleteReport: PropTypes.func.isRequired,
            classes: PropTypes.object.isRequired,
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <Page>
                <Grid container direction="column" justify="space-between" alignItems="center" spacing={2} className={classes.consoleContainer}>
                    <Grid item xs={5}>
                        <Typography variant={"h4"}>{"User's Reports"}</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Zoom in={true} transitionduration={5000}>
                            <ReportList reports={this.props.reports} deleteReport={this.props.deleteReport}></ReportList>
                        </Zoom>
                    </Grid>
                </Grid>
            </Page>
        );
    }
}
export default withStyles(styles)(AdminConsole);
