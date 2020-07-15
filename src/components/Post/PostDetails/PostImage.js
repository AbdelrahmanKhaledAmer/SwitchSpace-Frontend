"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Material UI Core
import {withStyles} from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";

const styles = theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 2,
    },
});

class PostImage extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            open: PropTypes.bool.isRequired,
            image: PropTypes.string.isRequired,
            onImageClose: PropTypes.func.isRequired,
            classes: PropTypes.object.isRequired,
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <Backdrop className={classes.backdrop} open={this.props.open} onClick={this.props.onImageClose}>
                <div>
                    <img src={this.props.image} />
                </div>
            </Backdrop>
        );
    }
}

export default withStyles(styles)(PostImage);
