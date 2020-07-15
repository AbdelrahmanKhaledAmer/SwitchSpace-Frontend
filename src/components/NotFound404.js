"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import {withRouter} from "react-router-dom";

// React components
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";

// Components
import Page from "./Page";

const styles = theme => ({
    center: {
        height: "70%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
    },
    center1: {
        height: "70%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
    },
    cardHeader: {
        backgroundColor: theme.palette.button.error,
        color: theme.palette.button.textColor,
    },
    button: {
        top: 1,
        backgroundColor: theme.palette.button.backgroundColor(),
        color: theme.palette.button.textColor(),
        "&:hover": {
            backgroundColor: theme.palette.button.hover.backgroundColor(),
        },
    },
});

class NotFound404 extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            history: PropTypes.object.isRequired,
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <Page>
                <div className={classes.center}>
                    <CardHeader title="404 We Could't find what you are looking for" className={classes.cardHeader} />
                </div>
                <div className={classes.center1}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            this.props.history.push("/");
                        }}
                        className={classes.button}>
                        Home
                    </Button>
                </div>
            </Page>
        );
    }
}
export default withRouter(withStyles(styles)(NotFound404));
