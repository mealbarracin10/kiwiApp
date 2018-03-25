import React, { Component } from 'react';
import { View, StyleSheet, MapView, Alert } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import MapboxClient from 'mapbox';
import Constants from '../helpers/constants.js';
import { lineString } from '@turf/helpers';

const layerStyles = MapboxGL.StyleSheet.create({
    origin: {
        circleRadius: 5,
        circleColor: 'white',
    },
    destination: {
        circleRadius: 5,
        circleColor: 'white',
    },
    route: {
        lineColor: 'red',
        lineWidth: 3,
        lineOpacity: 0.84,
    },
    progress: {
        lineColor: '#314ccd',
        lineWidth: 3,
    },
});

export default class Directions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mapboxClient: null,
            route: null,
        };
    }

    async componentDidMount() {

        try {
            this.getDirections(this.props.source, this.props.destiny);
        } catch (e) {
            console.log(e);
        }
    }

    async getDirections(src, dest) {

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
        let responseDirections = null;

        try {
            var client = new MapboxClient(Constants.mapboxAccessToken)
            responseDirections = await client.getDirections([
                sourcelatlon,
                destlatLng,
            ], requestOptions);

        } catch (error) {
            console.log("errores -------")
            console.log(error);
        }

        if (responseDirections == null) {
            return;
        }

        if (!(responseDirections.entity.routes)) {
            Alert.alert("Can't find a way there");
              return
        }

        const directions = responseDirections.entity.routes[0];
        const distance = directions.distance;
        const duration = directions.duration;
        const steps = directions.legs[0].steps;
        this.setState({
            route: lineString(directions.geometry.coordinates)
        });

    }


    render() {
        if (!this.state.route) {
            return null;
        }
        return (
            <MapboxGL.ShapeSource id='routeSource' shape={this.state.route}>
                <MapboxGL.LineLayer id='routeFill' style={layerStyles.route} belowLayerID='place-city-sm' />
            </MapboxGL.ShapeSource>
        );
    }

}