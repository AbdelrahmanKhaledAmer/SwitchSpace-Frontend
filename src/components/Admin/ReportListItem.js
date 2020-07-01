"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Material UI Core
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
// Material UI Icons
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import ReportIcon from "@material-ui/icons/Report";

const styles = theme => ({
    itemMargin: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        maxWidth: "70vw",
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
            <Card raised className={classes.itemMargin} elevation={5}>
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
                                {this.props.report.complaint}
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
