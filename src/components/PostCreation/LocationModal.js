"use strict";

import React from "react";
import {withStyles} from "@material-ui/core/styles";

import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {Map, Marker, GoogleApiWrapper} from "google-maps-react";
import Zoom from "@material-ui/core/Zoom";

// set card options
const styles = {
    mapContainer: {
        width: "50vw",
        height: "50vh",
        position: "relative",
        textAlign: "center",
    },
    map: {
        maxWidth: "100%",
        maxHeight: "100%",
    },
    centerFold: {
        textAlign: "center",
    },
};

class LocationModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isMarkerPlaced: false,
            lat: 0,
            lng: 0,
        };

        this.submitHandler = this.submitHandler.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            modalOpen: PropTypes.bool.isRequired,
            onClose: PropTypes.func.isRequired,
            setLocation: PropTypes.func.isRequired,
            google: PropTypes.object.isRequired,
        };
    }

    submitHandler() {
        this.props.setLocation(this.state.lat, this.state.lng);
    }

    onMapClicked(t, map, coord) {
        const {latLng} = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();

        this.setState({
            isMarkerPlaced: true,
            lat: lat,
            lng: lng,
        });
    }

    render() {
        const {classes} = this.props;
        const containerStyle = {
            position: "relative",
            width: "100%",
            height: "100%",
        };
        return (
            <Dialog
                aria-labelledby="form-dialog-title"
                open={this.props.modalOpen}
                onClose={() => this.props.onClose()}
                TransitionComponent={Zoom}
                transitionDuration={500}>
                <DialogTitle id="form-dialog-title" className={classes.centerFold}>
                    {"Choose your desired exchange location"}
                </DialogTitle>
                <DialogContent className={classes.mapContainer}>
                    <Map google={this.props.google} zoom={11} className={classes.map} containerStyle={containerStyle} onClick={this.onMapClicked}>
                        {this.state.isMarkerPlaced ? (
                            <Marker title={"location"} name={"Exchange Location"} position={{lat: this.state.lat, lng: this.state.lng}} />
                        ) : null}
                    </Map>
                </DialogContent>
                <DialogActions className={classes.centerFold}>
                    <Button disabled={!this.state.isMarkerPlaced} onClick={this.submitHandler} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(
    GoogleApiWrapper({
        // apiKey: "API key here",
    })(LocationModal)
);
