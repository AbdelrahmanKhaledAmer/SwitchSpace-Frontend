"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
// Material UI Core
import {withStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
// Material UI Icons
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import ReportIcon from "@material-ui/icons/Report";

const styles = theme => ({
    itemMargin: {
        margin: theme.spacing(2, 0),
    },
    itemText: {
        maxWidth: "80%",
        display: "list-item",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    boldText: {
        fontWeight: "bold",
    },
});

class ReportListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            postLocation: "Unknown Location",
        };

        this.goToPost = this.goToPost.bind(this);
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            report: PropTypes.object.isRequired,
            deleteReport: PropTypes.func.isRequired,
            history: PropTypes.object.isRequired,
        };
    }

    goToPost() {
        this.props.history.push(`/post/${this.props.report.postId}`);
    }

    render() {
        const {classes} = this.props;
        return (
            <Card elevation={5} className={classes.itemMargin}>
                <Grid container spacing={1} className={classes.postContainer}>
                    <Grid item xs={1}>
                        <Avatar variant="rounded" className={classes.image}>
                            <ReportIcon />
                        </Avatar>
                    </Grid>
                    <Grid item xs={9}>
                        <List>
                            <ListItem>
                                <div className={classes.boldText}>{this.props.report.reporterName}</div>
                            </ListItem>
                            <ListItem>{this.props.report.complaint}</ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={2}>
                        <Tooltip title="View Post" aria-label="go to post">
                            <IconButton edge="end" aria-label="go to post" onClick={this.goToPost}>
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
                    </Grid>
                </Grid>
            </Card>
        );
    }
}

export default withRouter(withStyles(styles)(ReportListItem));
