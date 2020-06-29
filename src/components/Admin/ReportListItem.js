"use strict";

import React from "react";
// import Grid from "@material-ui/core/Grid";
// import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import ReportIcon from "@material-ui/icons/Report";

const styles = theme => ({
    itemPadding: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        maxWidth: "900px",
    },

    itemText: {
        maxWidth: "80%",
        display: "list-item",
        // wordWrap: "inherit",
    },
});

class ReportListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            postLocation: "Unknown Location",
        };
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            report: PropTypes.object.isRequired,
            deleteReport: PropTypes.func.isRequired,
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <Card raised className={classes.itemPadding} elevation={5}>
                <ListItem alignItems="flex-start" button>
                    <ListItemAvatar>
                        <Avatar>
                            <ReportIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography align={"left"} variant="h6" color="textPrimary">
                                {this.props.report.reporterName}
                            </Typography>
                        }
                        secondary={
                            // {/* <React.Fragment> */}
                            <Typography variant="subtitle1" className={classes.itemText}>
                                {this.props.report.complaint}+
                                {
                                    "aaaaaashdbasdjsabydvtydtdvaayfsy dtsaftdstfsttfahhasgdgasdghsag ashgdsahgasdhgdghahgadhgdghdahgadhsgastfsa tttyastysatysatytyastytydstyasyttystyastys atysatystyatystydtydsyt"
                                }
                            </Typography>
                            // {/* </React.Fragment> */}
                        }
                    />
                    <ListItemSecondaryAction>
                        <Tooltip title="View Post" aria-label="go to post">
                            <IconButton edge="end" aria-label="go to post">
                                <ViewHeadlineIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="delete" aria-label="delete">
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => {
                                    console.log("hehehe");
                                    this.props.deleteReport(this.props.report._id);
                                }}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </ListItemSecondaryAction>
                </ListItem>
            </Card>
        );
    }
}

export default withStyles(styles)(ReportListItem);
