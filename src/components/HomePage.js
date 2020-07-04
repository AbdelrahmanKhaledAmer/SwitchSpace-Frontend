"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
// Material UI Core
import {fade, withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Carousel from "react-material-ui-carousel";
//Components
import Page from "./Page";

const styles = theme => ({
    gridContainer: {
        width: "80%",
        margin: "auto",
        textAlign: "center",
    },
    sliderMedia: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    card: {
        position: "relative",
    },
    textOverlay: {
        position: "absolute",
        bottom: "0",
        left: "0",
        width: "100%",
        backgroundColor: fade(theme.palette.common.black, 0.35),
        textAlign: "Left",
        color: theme.palette.common.white,
        padding: theme.spacing(1, 0, 1, 2),
    },
    cardMedia: {
        height: 0,
        paddingTop: "75%", // 4:3
    },
});

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // TODO: CONSIDER ADDING THIS TO A JSON FILE
        this.sliderData = [
            {
                header: "Find people who are close",
                subtitle: "No need to travel long distances",
                url: "https://switchspace-datastore.s3.eu-central-1.amazonaws.com/Categories/Find_close_people_16_9.jpeg",
            },
            {
                header: "Save money",
                subtitle: "Get the items you want for a much lower cost",
                url: "https://switchspace-datastore.s3.eu-central-1.amazonaws.com/Categories/Save_Money_16_9.jpg",
            },
            {
                header: "Fast and easy communication",
                subtitle: "Chat with other users and discuss deals",
                url: "https://switchspace-datastore.s3.eu-central-1.amazonaws.com/Categories/Communication_16_9.jpeg",
            },
        ];
        this.tmp = [
            "https://expertphotography.com/wp-content/uploads/2018/07/Aspect-ratio-photography-Grand-mosque-Oman-1.jpg",
            "https://www.projectorcentral.com/images/articles/4-3%20Bristlecone%20Pines.jpg",
        ];
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            categories: PropTypes.array.isRequired,
            history: PropTypes.object.isRequired,
        };
    }

    goToSearch(category) {
        this.props.history.push(`/search?ownedCategory=${category}`);
    }

    render() {
        const {classes} = this.props;
        return (
            <Page>
                <Grid container spacing={2} className={classes.gridContainer} justify="center" alignItems="center">
                    <Grid item xs={12}>
                        <Carousel animation="slide">
                            {this.sliderData.map((data, idx) => (
                                <Card key={idx} className={classes.card}>
                                    <CardMedia className={classes.sliderMedia} image={data.url} />
                                    <div className={classes.textOverlay}>
                                        <Typography variant="h4" color="inherit">
                                            {data.header}
                                        </Typography>
                                        <Typography variant="h6" color="inherit">
                                            {data.subtitle}
                                        </Typography>
                                    </div>
                                </Card>
                            ))}
                        </Carousel>
                    </Grid>
                    {this.props.categories.map(category =>
                        category.subcategories.map((subacategory, idx) => (
                            <Grid item xs={3} key={idx}>
                                <CardActionArea onClick={() => this.goToSearch(category.title, subacategory.title)}>
                                    <Card key={idx} elevation={5} className={classes.card}>
                                        {/*TODO: ASSIGN CORRECT IMAGE*/}
                                        <CardMedia className={classes.cardMedia} image={this.tmp[idx % 2]} />
                                        <CardContent>
                                            <Typography variant="h5" color="inherit">
                                                {subacategory.title}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </CardActionArea>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Page>
        );
    }
}

export default withRouter(withStyles(styles)(HomePage));