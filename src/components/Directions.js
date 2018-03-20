import React, { Component } from 'react';
import { View, StyleSheet, MapView } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import MapboxClient from 'mapbox';
import Constants from '../helpers/constants.js';


export default class Directions extends Component {

    getDirections(src, dest) {
        var mapboxClient = new MapboxClient(Constants.mapboxAccessToken);

        const sourcelatlon = {
            latitude: src[1],
            longitude: src[0],
        };

        const destlatLng = {
            latitude: dest[1],
            longitude: dest[0],
        };

        const requestOptions = {
            profile: 'driving-traffic',
            geometry: 'polyline',
            steps: true,
        };

        console.log("source")
        console.log(sourcelatlon)
        console.log("destiny")
        console.log(destlatLng)
        console.log("options")
        console.log(requestOptions)

        res = mapboxClient.getDirections([
            sourcelatlon,
            destlatLng
        ], requestOptions);

        console.log(res.routes)

    }

    async componentDidMount() {
        
        try {
            this.getDirections(this.props.source, this.props.destiny);
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <View>
            </View>
            //   <MapboxGL.ShapeSource id='mapbox-directions-source' shape={this.state.directions.geometry}>
            //     <MapboxGL.LineLayer
            //       id='mapbox-directions-line'
            //       belowLayerID={Places.UnselectedSymbolID}
            //       style={[styles.directionsLine, this.props.style]} />
            //   </MapboxGL.ShapeSource>
        );
    }

}