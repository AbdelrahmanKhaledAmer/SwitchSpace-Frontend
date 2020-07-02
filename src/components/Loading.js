"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Material UI Core
import {withStyles} from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
//Assets
import logo from "../../public/assets/loading/loading.svg";

const styles = theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 2,
        color: "#fff",
    },
});

class loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // need to defince prop type for every function
    static get propTypes() {
        return {
            loading: PropTypes.bool.isRequired,
            classes: PropTypes.object.isRequired,
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <Backdrop className={classes.backdrop} open={this.props.loading}>
                {/* <CircularProgress color="primary" /> */}
                <img src={logo} alt="loading..." />
            </Backdrop>
        );
    }
}

export default withStyles(styles)(loading);
