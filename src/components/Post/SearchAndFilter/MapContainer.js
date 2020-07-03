"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
import {Map, Marker, GoogleApiWrapper, InfoWindow, Circle} from "google-maps-react";
// Material UI Core
import {withStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
// Material UI Icons
import SwapHorizOutlinedIcon from "@material-ui/icons/SwapHorizOutlined";
// Components
import InfoCard from "./InfoCard";

//TODO: loading styles
const LoadingContainer = () => {
    return <CircularProgress size={100} />;
};
// infowindow style
const styles = () => ({
    infoWindowContainer: {
        // need min width to prevent collapsing
        minWidth: 300,
        // minHeight: 240,
        // needed for wrapping text
        maxWidth: 420,
        maxHeight: 420,
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
            activePost: undefined, // which marker shows info window
            mapCenterLong: 0,
            mapCenterLat: 0,
            myMarker: {title: "My Search Location", name: "My Search Location", position: {lat: 0, lng: 0}},
        };
        this.onMapClicked = this.onMapClicked.bind(this);
        this.onMarkerClicked = this.onMarkerClicked.bind(this);
        this.mapLoaded = this.mapLoaded.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
    }
    // called directly after mounting component
    async componentDidMount() {
        let latitude = 0;
        let longitude = 0;
        // will be props latter
        // const allMarkers = this.state.markers;
        let myLocation = {lat: latitude, lng: longitude};
        try {
            const position = await this.getCoordinates();
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            myLocation = {lat: latitude, lng: longitude};
            this.props.onLocationChange(myLocation);
        } catch (err) {
            console.log(err.message);
        }

        this.setState({
            mapCenterLat: latitude,
            mapCenterLong: longitude,
            myMarker: {title: this.state.myMarker.title, name: this.state.myMarker.name, position: myLocation},
        });
        // this.props.onLocationChange({lat: latitude, lng: longitude});
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

        const position = {lat: latLng.lat(), lng: latLng.lng()};
        this.setState({
            showInfo: false,
            activePost: undefined,
            myMarker: {title: this.state.myMarker.title, name: this.state.myMarker.name, position: position},
        });
        this.props.onLocationChange(position);
    }
    // open infowindow when marker is clicked
    onMarkerClicked(props, marker) {
        const idx = marker.name;
        // post is stored in activePost because it is needed for the map
        this.setState({showInfo: true, activePost: {idx: idx, post: this.props.posts[idx], marker: marker}});
        this.props.onPostFocusChange(marker.name);
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
            posts: PropTypes.array.isRequired,
            radius: PropTypes.number,
            onLocationChange: PropTypes.func.isRequired,
            onPostFocusChange: PropTypes.func.isRequired,
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <Map
                google={this.props.google}
                onReady={(mapProps, map) => this.mapLoaded(mapProps, map)}
                onClick={this.onMapClicked}
                zoom={11}
                center={{lat: this.state.mapCenterLat, lng: this.state.mapCenterLong}}>
                {this.props.posts.map((post, idx) => (
                    //TODO: ICONS
                    <Marker
                        key={idx}
                        title={post._id}
                        name={idx}
                        position={{lat: post.exchangeLocation.coordinates[1], lng: post.exchangeLocation.coordinates[0]}}
                        onClick={this.onMarkerClicked}
                        // icon={{
                        //     url: "https://switchspace-datastore.s3.eu-central-1.amazonaws.com/clipdealer_A51141491_preview.jpg",
                        //     anchor: new this.props.google.maps.Point(32, 32),
                        //     scaledSize: new this.props.google.maps.Size(32, 32),
                        // }}
                    />
                ))}
                <Marker
                    key={"myLoc"}
                    title={this.state.myMarker.title}
                    name={this.state.myMarker.name}
                    position={this.state.myMarker.position}
                    // onClick={this.onMarkerClicked}
                    //TODO: ICONS
                    icon={{
                        url: "https://switchspace-datastore.s3.eu-central-1.amazonaws.com/clipdealer_A51141491_preview.jpg",
                        anchor: new this.props.google.maps.Point(32, 32),
                        scaledSize: new this.props.google.maps.Size(32, 32),
                    }}
                />
                <InfoWindow
                    visible={this.state.showInfo}
                    styles={{textAlign: "center"}}
                    marker={this.state.activePost ? this.state.activePost.marker : undefined}>
                    {/* <CardContent> */}

                    <Grid container justify="space-between" alignItems="center" className={classes.infoWindowContainer}>
                        <Grid item>
                            <InfoCard
                                header={this.state.activePost ? "Item Owned" : ""}
                                title={this.state.activePost ? this.state.activePost.post.itemOwned.title : ""}
                                infoBig={this.state.activePost ? this.state.activePost.post.itemOwned.category : ""}
                                infoSmall={this.state.activePost ? this.state.activePost.post.itemOwned.condition : ""}
                            />
                        </Grid>
                        <Grid item>
                            <SwapHorizOutlinedIcon fontSize="inherit" />
                        </Grid>
                        <Grid item>
                            <InfoCard
                                header={this.state.activePost ? "Item Desired" : ""}
                                title={this.state.activePost ? this.state.activePost.post.itemDesired.title : ""}
                                infoBig={this.state.activePost ? this.state.activePost.post.itemDesired.category : ""}
                                infoSmall={this.state.activePost ? this.state.activePost.post.itemDesired.condition : ""}
                            />
                        </Grid>
                    </Grid>
                </InfoWindow>

                <Circle
                    radius={this.props.radius ? this.props.radius : 10000}
                    center={this.state.myMarker.position}
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
        );
    }
}

export default withStyles(styles)(
    GoogleApiWrapper({
        apiKey: process.env.GOOGLE_API_KEY,
        LoadingContainer: LoadingContainer,
    })(GoogleMap)
);
