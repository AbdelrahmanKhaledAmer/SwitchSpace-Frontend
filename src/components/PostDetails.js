"use strict";

import React from "react";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import Page from "./Page";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {red} from "@material-ui/core/colors";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import SwapHorizOutlinedIcon from "@material-ui/icons/SwapHorizOutlined";
const styles = theme => ({
    title: {
        fontSize: 14,
    },
    cardHeader: {
        backgroundColor: "#808080",
    },
    cardPricing: {
        textAlign: "center",
    },
    root: {
        maxWidth: "80%",
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    avatar: {
        backgroundColor: red[500],
    },
    container: {
        marginTop: theme.spacing(20),
        direction: "row",
        justify: "center",
        alignItems: "center",
    },
    imageSlider: {
        maxWidth: "50%",
        maxHeight: "50%",
    },
    arrow: {
        fontSize: "100px",
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    slidingImage: {
        maxWidth: "100%",
        maxHeight: "100%",
    },
});

const test = {
    _id: {$oid: "5ee28666de1873f021bcf563"},
    photos: [
        {
            _id: {$oid: "5eef818f1ca7ce3b37b3d348"},
            url: "https://static.toiimg.com/photo/61654288.cms",
            key: "1",
        },
        {
            _id: {$oid: "5eef818f1ca7ce3b37b3d349"},
            url: "https://i.gadgets360cdn.com/large/iphone_11_pro_max_afp_new_1568185633865.jpg",
            key: "2",
        },
        {
            _id: {$oid: "5eef818f1ca7ce3b37b3d369"},
            url: "https://cdn.cultofmac.com/wp-content/uploads/2019/08/210BCC3A-98B1-41D4-A98D-E4BDD34B5DC3.jpg",
            key: "3",
        },
    ],
    itemOwned: {
        _id: {$oid: "5eee8625d836d34976705da8"},
        title: "iphone 10+",
        condition: "Used",
        modelYear: 2010,
        description: "Used in a good condition",
        category: "electronics",
        subcategory: "smartphones",
    },
    itemDesired: {
        _id: {$oid: "5eee8625d836d34976705da9"},
        title: "Samsung s9",
        condition: "New",
        modelYear: 2019,
        description: "Must be new",
        category: "electronics",
        subcategory: "smartphones",
    },
    exchangeLocation: {
        coordinates: [11.581981, 48.135124],
        _id: {$oid: "5eee8625d836d34976705daa"},
        type: "Point",
    },
    creatorId: {$oid: "5ee245bbdedc1468ff6e3221"},
    creatorName: "Mohamed",
    createdAt: "2020-06-20T21:56:53.039Z",
    updatedAt: "2020-06-20T21:56:53.039Z",
    __v: 0,
};
const images = [test.photos[0].url, test.photos[1].url, test.photos[2].url];
class PostDetails extends React.Component {
    constructor(props) {
        super(props);
    }
    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
        };
    }
    render() {
        const {classes} = this.props;

        return (
            <Page>
                <Grid container className={classes.container} spacing={2}>
                    <Grid item xs={5}>
                        <Card className={classes.root}>
                            <CardHeader className={classes.cardHeader} title="Offered Item" />
                            <AwesomeSlider infinite={true} bullets={false} organicArrows={true}>
                                <div>
                                    <img
                                        className={classes.slidingImage}
                                        src="https://switchspace-datastore.s3.eu-central-1.amazonaws.com/profilePics/5ef27c282012e129acc060d8"
                                    />
                                </div>
                                <div>
                                    <img className={classes.slidingImage} src={images[1]} />
                                </div>
                            </AwesomeSlider>

                            <CardContent>
                                <Typography variant="h4" color="textSecondary" component="p">
                                    {test.itemOwned.title}
                                    <br />
                                    Condition: {test.itemOwned.condition}
                                    <br />
                                    Model year: {test.itemOwned.modelYear}
                                    <br />
                                    Description:
                                    <br />
                                    {test.itemOwned.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={2} className={classes.arrow}>
                        <SwapHorizOutlinedIcon fontSize="inherit" />
                    </Grid>
                    <Grid item xs={5}>
                        <Card className={classes.root}>
                            <CardHeader className={classes.cardHeader} title="Desired Item" />

                            <CardContent>
                                <Typography variant="h4" color="textSecondary" component="p">
                                    {test.itemDesired.title}
                                    <br />
                                    Condition: {test.itemDesired.condition}
                                    <br />
                                    Model year: {test.itemDesired.modelYear}
                                    <br />
                                    Description:
                                    <br />
                                    {test.itemDesired.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Page>
        );
    }
}
export default withStyles(styles)(PostDetails);
