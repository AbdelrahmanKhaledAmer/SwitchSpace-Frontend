"use strict";

import React from "react";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import SwapHorizOutlinedIcon from "@material-ui/icons/SwapHorizOutlined";

const styles = theme => ({
    cardHeader: {
        backgroundColor: "#659dbd",
    },
    gridContainer: {
        width: "100%",
        margin: "auto",
        direction: "row",
        justify: "center",
        alignItems: "stretch",
    },
    arrow: {
        textAlign: "center",
        fontSize: "100px",
        margin: "auto",
    },
    slidingImage: {
        maxWidth: "100%",
        maxHeight: "100%",
    },
    itemTitle: {
        fontWeight: "bold",
        fontStyle: "italic",
        fontSize: "1.75em",
    },
    boldText: {
        fontWeight: "bold",
        marginRight: theme.spacing(1),
    },
    fullHeightCard: {
        height: "100%",
    },
});

class PostDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            post: PropTypes.object.isRequired,
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <Grid container className={classes.gridContainer} spacing={1}>
                <Grid item xs={5}>
                    <Card elevation={5} className={classes.fullHeightCard}>
                        <CardHeader className={classes.cardHeader} title="Offered Item" />
                        <CardContent>
                            <List>
                                <ListItem dense>
                                    <AwesomeSlider bullets={false} organicArrows={true}>
                                        {this.props.post.photos.map((photo, idx) => (
                                            <div key={idx}>
                                                <img className={classes.slidingImage} src={photo.url} />
                                            </div>
                                        ))}
                                    </AwesomeSlider>
                                </ListItem>
                                <ListItem dense>
                                    <div className={classes.itemTitle}>{this.props.post.itemOwned.title}</div>
                                </ListItem>
                                <ListItem dense>
                                    <div className={classes.boldText}>Condition: </div> {this.props.post.itemOwned.condition}
                                </ListItem>
                                <ListItem dense>
                                    <div className={classes.boldText}>Model year:</div>
                                    {this.props.post.itemOwned.modelYear ? (
                                        this.props.post.itemOwned.modelYear
                                    ) : (
                                        <Typography color="textSecondary">{"N/A"}</Typography>
                                    )}
                                </ListItem>
                                <ListItem dense>
                                    <div className={classes.boldText}>Description: </div>
                                </ListItem>
                                <ListItem dense>
                                    {this.props.post.itemOwned.description ? this.props.post.itemOwned.description : "No description provided."}
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={2} className={classes.arrow}>
                    <SwapHorizOutlinedIcon fontSize="inherit" />
                </Grid>
                <Grid item xs={5}>
                    <Card elevation={5} className={classes.fullHeightCard}>
                        <CardHeader className={classes.cardHeader} title="Desired Item" />
                        <CardContent>
                            <ListItem>
                                <div className={classes.itemTitle}>{this.props.post.itemDesired.title}</div>
                            </ListItem>
                            <ListItem>
                                <div className={classes.boldText}>Condition: </div> {this.props.post.itemDesired.condition}
                            </ListItem>
                            <ListItem>
                                <div className={classes.boldText}>Model year: </div>
                                {this.props.post.itemDesired.modelYear ? (
                                    this.props.post.itemDesired.modelYear
                                ) : (
                                    <Typography color="textSecondary">{" N/A"}</Typography>
                                )}
                            </ListItem>
                            <ListItem>
                                <div className={classes.boldText}>Description: </div>
                            </ListItem>
                            <ListItem>
                                {this.props.post.itemDesired.description ? this.props.post.itemDesired.description : "No description provided."}
                            </ListItem>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}
export default withStyles(styles)(PostDetails);
