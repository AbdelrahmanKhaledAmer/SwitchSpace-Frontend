"use strict";

import React from "react";
// import Grid from "@material-ui/core/Grid";
// import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {Divider} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import FolderIcon from "@material-ui/icons/FolderOpen";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
const styles = theme => ({
    reportContainer: {
        marginTop: theme.spacing(2),
    },
    image: {
        width: theme.spacing(18),
        height: theme.spacing(18),
    },
    username: {
        fontWeight: "bold",
        fontSize: "1.5em",
    },
    itemPadding: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    inline: {
        display: "inline",
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
            <Card className={classes.itemPadding} elevation={5}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar>
                            <FolderIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={this.props.report.reporterName}
                        secondary={
                            <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                                {this.props.report.complaint}+
                                {
                                    "aaaaaashdbasdjsabshajbasxbydvtydtdvaayfsydtsaftdstfsttfastfsatttyastysatysatytyastytydstyasyttystyastysatysatystyatystydtydsyt"
                                }
                            </Typography>
                        }
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="go to post">
                            <ViewHeadlineIcon />
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => {
                                console.log("hehehe");
                                this.props.deleteReport(this.props.report._id);
                            }}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider />
            </Card>

            //     /*{ <Grid
            //         container
            //         spacing={2}
            //         className={classes.reportContainer}
            //         justify={"flex-start"}
            //         alignContent={"flex-start"}
            //         alignItems={"flex-start"}>
            //         <Grid item sm={2}>
            //             <Avatar src={undefined} className={classes.image} />
            //         </Grid>
            //         <Grid item sm={6}>
            //             <List>
            //                 <ListItem>
            //                     <Grid container>
            //                         <Grid item xs={6}>
            //                             <div className={classes.username}>{this.props.report.reporterName}</div>
            //                         </Grid>
            //                     </Grid>
            //                 </ListItem>

            //                 <ListItem>
            //                     <Typography noWrap>
            //                         {this.props.report.complaint}
            //                         {
            //                             "this is aacasjkajsxkjskjskjdkjasdjaskdjdkjaskjdsakjasdjkdakjdkjsajksajksakjsajkaskjsaksajsaksajkaskjaskjsasakjaskaskjskja"
            //                         }
            //                     </Typography>
            //                 </ListItem>
            //             </List>
            //         </Grid>
            //     </Grid> */}
            //     {/* <Divider /> */}
            // {/* </Card> */}
        );
    }
}

export default withStyles(styles)(ReportListItem);
