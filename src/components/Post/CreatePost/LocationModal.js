"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
// Material UI Core
import {withStyles} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Zoom from "@material-ui/core/Zoom";
// MISC
import {Map, Marker, GoogleApiWrapper} from "google-maps-react";

// set card options
const styles = {
    mapContainer: {
        width: "40vw",
        height: "50vh",
        position: "relative",
        textAlign: "center",
    },
    map: {
        maxWidth: "100%",
        maxHeight: "100%",
        margin: "auto",
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
            centerLat: 0,
            centerLng: 0,
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
            oldMarker: PropTypes.object,
        };
    }

    componentDidMount() {
        if (this.props.oldMarker) {
            this.setState({
                isMarkerPlaced: true,
                lat: this.props.oldMarker.coordinates[1],
                lng: this.props.oldMarker.coordinates[0],
                centerLat: this.props.oldMarker.coordinates[1],
                centerLng: this.props.oldMarker.coordinates[0],
            });
        }
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
                    <Map google={this.props.google} zoom={15} containerStyle={containerStyle} onClick={this.onMapClicked} className={classes.map}>
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
