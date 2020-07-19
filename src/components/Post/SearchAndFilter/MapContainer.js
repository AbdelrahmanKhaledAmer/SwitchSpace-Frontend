"use strict";
// React
import React from "react";
import PropTypes from "prop-types";
import {Map, Marker, GoogleApiWrapper, InfoWindow, Circle} from "google-maps-react";
// Material UI Core
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// Material UI Icons
import SwapHorizOutlinedIcon from "@material-ui/icons/SwapHorizOutlined";
// Components
import InfoCard from "./InfoCard";
// Assets
import UserMapIcon from "../../../../public/assets/map/me.png";
import PostMapIcon from "../../../../public/assets/map/post.png";

// infowindow style
const styles = () => ({
    infoWindowContainer: {
        // need min width to prevent collapsing
        minWidth: 300,
        // needed for wrapping text
        maxWidth: 420,
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
            myMarker: {title: "My Search Location", name: "My Search Location"},
            mapLoading: true,
        };
        this.onMapClicked = this.onMapClicked.bind(this);
        this.onMarkerClicked = this.onMarkerClicked.bind(this);
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            google: PropTypes.object.isRequired,
            posts: PropTypes.array.isRequired,
            radius: PropTypes.number,
            myLocation: PropTypes.object.isRequired,
            onLocationChange: PropTypes.func.isRequired,
        };
    }
    // called directly after mounting component
    componentDidMount() {
        this.setState({
            mapCenterLat: this.props.myLocation.lat,
            mapCenterLong: this.props.myLocation.lng,
            mapLoading: false,
        });
    }

    // add a marker on the postion clicked on the map
    onMapClicked(t, map, coord) {
        const {latLng} = coord;

        const position = {lat: latLng.lat(), lng: latLng.lng()};
        this.setState({
            showInfo: false,
            activePost: undefined,
            // myMarker: {title: this.state.myMarker.title, name: this.state.myMarker.name, position: position},
        });
        // notify the parent with the new location
        this.props.onLocationChange(position);
    }
    // open infowindow when marker is clicked
    onMarkerClicked(props, marker) {
        const idx = marker.name;
        // post is stored in activePost because it is needed for the map
        this.setState({showInfo: true, activePost: {idx: idx, post: this.props.posts[idx], marker: marker}});
    }

    render() {
        const {classes} = this.props;
        const map = (
            <Map
                google={this.props.google}
                onClick={this.onMapClicked}
                zoom={8}
                initialCenter={{lat: this.state.mapCenterLat, lng: this.state.mapCenterLong}}>
                {this.props.posts.map((post, idx) => (
                    <Marker
                        key={idx}
                        title={post._id}
                        name={idx}
                        position={{lat: post.exchangeLocation.coordinates[1], lng: post.exchangeLocation.coordinates[0]}}
                        onClick={this.onMarkerClicked}
                        icon={{
                            url: PostMapIcon,

                            anchor: new this.props.google.maps.Point(32, 32),
                            scaledSize: new this.props.google.maps.Size(32, 32),
                        }}
                    />
                ))}
                <Marker
                    key={"myLoc"}
                    title={this.state.myMarker.title}
                    name={this.state.myMarker.name}
                    position={this.props.myLocation}
                    icon={{
                        url: UserMapIcon,
                        anchor: new this.props.google.maps.Point(55, 55),
                        scaledSize: new this.props.google.maps.Size(56, 56),
                    }}
                />
                <InfoWindow
                    visible={this.state.showInfo}
                    styles={{textAlign: "center"}}
                    marker={this.state.activePost ? this.state.activePost.marker : undefined}>
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
                    center={this.props.myLocation}
                    onClick={this.onMapClicked}
                    strokeColor="transparent"
                    strokeOpacity={0}
                    strokeWeight={5}
                    fillColor="blue"
                    fillOpacity={0.3}
                />
            </Map>
        );
        return !this.state.mapLoading ? map : "";
    }
}

export default withStyles(styles)(
    GoogleApiWrapper({
        apiKey: process.env.GOOGLE_API_KEY,
    })(GoogleMap)
);
