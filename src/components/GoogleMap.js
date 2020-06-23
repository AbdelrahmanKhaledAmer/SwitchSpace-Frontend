import React from "react";
import {Map, Marker, GoogleApiWrapper, InfoWindow, Circle} from "google-maps-react";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

// infowindow style
const styles = () => ({
    root: {
        minWidth: 275,
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

class GoogleMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showInfo: false, // shows information window
            activeMarker: null, // which marker shows info window
            mapCenterLong: 0,
            mapCenterLat: 0,
            markers: [
                // list of markers => posts to be displayed will be a prop passed latter
                {title: "Marker 1.", name: "SOMA 1", position: {lat: 38.778519, lng: -122.40564}},
                {title: "Marker 2", name: "SOMA 2", position: {lat: 39.778519, lng: -122.40564}},
                {title: "Marker 3", name: "SOMA 3", position: {lat: 40.778519, lng: -122.40564}},
                {title: "Marker 4", name: "SOMA 4", position: {lat: 41.778519, lng: -122.40564}},
            ],
        };
        this.onMapClicked = this.onMapClicked.bind(this);
        this.onMarkerClicked = this.onMarkerClicked.bind(this);
        this.mapLoaded = this.mapLoaded.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
    }
    // called directly after mounting component
    async componentDidMount() {
        let latitude = 38;
        let longitude = -122;
        // will be props latter
        const allMarkers = this.state.markers;

        try {
            const position = await this.getCoordinates();
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
        } catch (err) {
            console.log(err.message);
        }
        allMarkers.push({title: "My self", name: "My post", position: {lat: latitude, lng: longitude}});
        this.setState({
            showInfo: false,
            activeMarker: null,
            markers: allMarkers,
            mapCenterLat: latitude,
            mapCenterLong: longitude,
        });
    }

    // get my coordinates // throws an error if the user denied location
    getCoordinates() {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    // add a marker on the postion clicked on the map
    onMapClicked(t, map, coord) {
        const {latLng} = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        //get all markers
        const allMarkers = this.state.markers;
        // if there was a me marker before

        allMarkers.pop();

        allMarkers.push({title: "My self", name: "My post", position: {lat: lat, lng: lng}});
        this.setState({showInfo: false, activeMarker: null, markers: allMarkers});
    }
    // open infowindow when marker is clicked
    onMarkerClicked(props, marker, e) {
        console.log(props.name);
        console.log(e);
        this.setState({showInfo: true, activeMarker: marker});
    }
    // triggered when the map finishes loading
    mapLoaded(mapProps, map) {
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
    // renderMyMarker() TODO:

    render() {
        const {classes} = this.props;
        console.log(this.state.activeMarker);
        return (
            <div>
                <Map
                    google={this.props.google}
                    onReady={(mapProps, map) => this.mapLoaded(mapProps, map)}
                    onClick={this.onMapClicked}
                    zoom={11}
                    center={{lat: this.state.mapCenterLat, lng: this.state.mapCenterLong}}>
                    {this.state.markers.map((marker, index) => (
                        <Marker
                            key={index}
                            title={marker.title}
                            name={marker.name}
                            position={marker.position}
                            onClick={this.onMarkerClicked}
                            // icon={{
                            //     url: "https://switchspace-datastore.s3.eu-central-1.amazonaws.com/clipdealer_A51141491_preview.jpg",
                            //     anchor: new this.props.google.maps.Point(32, 32),
                            //     scaledSize: new this.props.google.maps.Size(32, 32),
                            // }}
                        />
                    ))}
                    <InfoWindow visible={this.state.showInfo} marker={this.state.activeMarker}>
                        <Card className={classes.root}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    {this.state.activeMarker ? this.state.activeMarker.title : "unknown"}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {this.state.activeMarker ? this.state.activeMarker.name : "unknown"}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    Hello there
                                </Typography>
                                <Typography variant="body2" component="p">
                                    owned item and item desired
                                </Typography>
                            </CardContent>
                        </Card>
                    </InfoWindow>

                    <Circle
                        radius={10000}
                        center={this.state.markers[this.state.markers.length - 1].position}
                        // onMouseover={() => console.log("mouseover")}
                        onClick={this.onMapClicked}
                        // onMouseout={() => console.log("mouseout")}
                        strokeColor="transparent"
                        strokeOpacity={0}
                        strokeWeight={5}
                        fillColor="blue"
                        fillOpacity={0.3}
                    />
                </Map>
            </div>
        );
    }
}

export default withStyles(styles)(
    GoogleApiWrapper({
        // apiKey: "API key here",
    })(GoogleMap)
);
