import React from "react";
import {Map, Marker, GoogleApiWrapper, InfoWindow} from "google-maps-react";
import {withStyles} from "@material-ui/core/styles";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";

const styles = () => ({
    paper: {
        width: "100%",
        height: "100%",
        // maxWidth: "80%",
        // maxHeight: "80%",
        backgroundColor: "#000000",
    },
    map: {
        maxWidth: "90%",
        maxHeight: "90%",
    },
});

class GoogleMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showInfo: false,
            activeMarker: null,
        };
        this.onMapClicked = this.onMapClicked.bind(this);
        this.onMarkerClicked = this.onMarkerClicked.bind(this);
        this._mapLoaded = this._mapLoaded.bind(this);
    }
    onMapClicked(t, map, coord) {
        this.setState({showInfo: false, activeMarker: null});
        console.log(t);
        console.log(map);
        console.log(coord);
        const {latLng} = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        console.log(lat + ":" + lng);
    }
    onMarkerClicked(props, marker, e) {
        console.log(props.name);
        console.log(e);
        this.setState({showInfo: true, activeMarker: marker});
    }
    _mapLoaded(mapProps, map) {
        console.log("map loaded");
        console.log(mapProps);
        console.log(map);
    }
    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            google: PropTypes.object.isRequired,
        };
    }
    render() {
        const {classes} = this.props;

        return (
            <div width={"100%"}>
                <Card elevation={3} className={classes.paper}>
                    <Map
                        google={this.props.google}
                        className={classes.map}
                        onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
                        onClick={this.onMapClicked}>
                        <Marker
                            title={"The marker`s title will appear as a tooltip."}
                            name={"Post Tname in the marker "}
                            position={{lat: 37.78417917929799, lng: -122.40860455242664}}
                            onClick={this.onMarkerClicked}
                            icon={{
                                url: "https://image.flaticon.com/icons/png/512/61/61165.png",
                                anchor: new this.props.google.maps.Point(32, 32),
                                scaledSize: new this.props.google.maps.Size(32, 32),
                            }}></Marker>
                        <InfoWindow visible={this.state.showInfo} marker={this.state.activeMarker}>
                            <Card>
                                <h1>this is an Info InfoWindow</h1>
                            </Card>
                        </InfoWindow>
                    </Map>
                </Card>
            </div>
        );
    }
}

export default withRouter(
    withStyles(styles)(
        GoogleApiWrapper({
            // apiKey: "api key here",
        })(GoogleMap)
    )
);
