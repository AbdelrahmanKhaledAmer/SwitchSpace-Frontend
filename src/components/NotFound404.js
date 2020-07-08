"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
// Components
import Page from "./Page";
//source image
import pageNotFound from "../../public/assets/general/404.png";

const styles = {
    center: {
        height: "70%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
};

class NotFound404 extends React.Component {
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
                <div className={classes.center}>
                    <img src={pageNotFound} />
                </div>
            </Page>
        );
    }
}
export default withStyles(styles)(NotFound404);
