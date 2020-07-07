"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Material UI CORE
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
// Material UI Lab
import Rating from "@material-ui/lab/Rating";

const styles = theme => ({
    avatar: {
        width: theme.spacing(18),
        height: theme.spacing(18),
    },
    itemPadding: {
        padding: theme.spacing(2, 3),
    },
    reviewerName: {
        fontWeight: "bold",
        fontSize: "1.5em",
    },
    description: {
        width: "750px",
    },
});

class ReviewListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            review: PropTypes.object.isRequired,
        };
    }

    render() {
        const {classes, review} = this.props;
        return (
            <div>
                <Grid container className={classes.itemPadding}>
                    <Grid item xs={3}>
                        <Avatar className={classes.avatar} src={review.reviewerId.profilePicture ? review.reviewerId.profilePicture.url : null} />
                    </Grid>
                    <Grid item container xs={9} spacing={2} direction="column" justify="space-between">
                        <Grid item container justify="space-between">
                            <Grid item>
                                <Typography className={classes.reviewerName}> {review.reviewerId.name}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography> Reviewed on {review.updatedAt.substring(0, 10)}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item container justify="space-between">
                            <Grid item>
                                <Typography align="center"> Communication </Typography>
                                <Rating value={review.commRate} precision={0.5} size="medium" readOnly />
                            </Grid>
                            <Grid item>
                                <Typography align="center"> Item as described </Typography>
                                <Rating value={review.descriptionRate} precision={0.5} size="medium" readOnly />
                            </Grid>
                            <Grid item>
                                <Typography align="center"> Item condition </Typography>
                                <Rating value={review.conditionRate} precision={0.5} size="medium" readOnly />
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography> {review.description} </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider />
            </div>
        );
    }
}

export default withStyles(styles)(ReviewListItem);
