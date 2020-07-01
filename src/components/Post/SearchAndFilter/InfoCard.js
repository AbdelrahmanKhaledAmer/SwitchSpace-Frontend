"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Material UI Core
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

// infowindow style
const styles = () => ({
    root: {
        minWidth: "50vw",
        maxHeight: "50vh",
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

class InfoCard extends React.Component {
    constructor(props) {
        super(props);
    }
    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            // post: PropTypes.object,
            header: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            infoBig: PropTypes.string.isRequired,
            infoSmall: PropTypes.string.isRequired,
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {this.props.header}
                </Typography>
                <Typography variant="h5" component="h2" noWrap>
                    {this.props.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary" noWrap>
                    {this.props.infoBig}
                </Typography>
                <Typography variant="body1" component="p" noWrap>
                    {this.props.infoSmall}
                </Typography>
            </div>
        );
    }
}

export default withStyles(styles)(InfoCard);
