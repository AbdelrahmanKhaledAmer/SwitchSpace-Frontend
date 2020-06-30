import React from "react";
import {Map, Marker, GoogleApiWrapper, InfoWindow, Circle} from "google-maps-react";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";

// import Card from "@material-ui/core/Card";
// import Paper from "@material-ui/core/Paper";
// import CardContent from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {Grid} from "@material-ui/core";

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
        let latitude = 38;
        let longitude = -122;
        // will be props latter
        // const allMarkers = this.state.markers;

        try {
            const position = await this.getCoordinates();
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
        } catch (err) {
            console.log(err.message);
        }

        this.setState({
            showInfo: false,
            activePost: undefined,
            mapCenterLat: latitude,
            mapCenterLong: longitude,
            myMarker: {title: this.state.myMarker.title, name: this.state.myMarker.name, position: {lat: latitude, lng: longitude}},
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

        const position = {lat: latLng.lat(), lng: latLng.lng()};
        this.setState({
            showInfo: false,
            activePost: undefined,
            myMarker: {title: this.state.myMarker.title, name: this.state.myMarker.name, position: position},
        });
        this.props.onLocationChange(position);
    }
    // open infowindow when marker is clicked
    onMarkerClicked(props, marker, e) {
        // console.log(props.name);
        console.log(e);
        console.log(marker);
        console.log(props);
        this.setState({showInfo: true, activePost: {idx: marker.name, marker: marker}});
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
        console.log(this.props.posts);
        return (
            <div>
                <Map
                    google={this.props.google}
                    onReady={(mapProps, map) => this.mapLoaded(mapProps, map)}
                    onClick={this.onMapClicked}
                    zoom={11}
                    center={{lat: this.state.mapCenterLat, lng: this.state.mapCenterLong}}>
                    {this.props.posts.map((post, idx) => (
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
                        icon={{
                            url: "https://switchspace-datastore.s3.eu-central-1.amazonaws.com/clipdealer_A51141491_preview.jpg",
                            anchor: new this.props.google.maps.Point(32, 32),
                            scaledSize: new this.props.google.maps.Size(32, 32),
                        }}
                    />
                    <InfoWindow
                        visible={this.state.showInfo}
                        styles={{width: "550px", height: "250px"}}
                        marker={this.state.activePost ? this.state.activePost.marker : undefined}>
                        {/* <CardContent> */}

                        <Grid container spacing={2} className={classes.root}>
                            <Grid item xs={6}>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    {"Item Owned"}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {this.state.activePost ? this.props.posts[this.state.activePost.idx].itemOwned.title : ""}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    {this.state.activePost ? this.props.posts[this.state.activePost.idx].itemOwned.category : ""}
                                </Typography>
                                <Typography variant="body1" component="p">
                                    {this.state.activePost ? this.props.posts[this.state.activePost.idx].itemOwned.condition : ""}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    {"Item Desired"}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {this.state.activePost ? this.props.posts[this.state.activePost.idx].itemDesired.title : ""}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    {this.state.activePost ? this.props.posts[this.state.activePost.idx].itemDesired.category : ""}
                                </Typography>
                                <Typography variant="body1" component="p">
                                    {this.state.activePost ? this.props.posts[this.state.activePost.idx].itemOwned.condition : ""}
                                </Typography>
                            </Grid>
                        </Grid>
                        {/* </CardContent> */}
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
            </div>
        );
    }
}

export default withStyles(styles)(
    GoogleApiWrapper({
        // apiKey: "API key here",
    })(GoogleMap)
);
