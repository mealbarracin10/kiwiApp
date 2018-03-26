import React, { Component } from 'react';
import { View, StyleSheet, MapView } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import PropTypes from 'prop-types';
import Constants from '../helpers/constants.js';
import Directions from './Directions'
import { Container, Header, Content, Button, Text } from 'native-base';

export default class ShowMap extends Component {

    constructor() {
        super();
        this.state = {
            srcLatLng: [
                Constants.INITIAL_DEST_LAT, Constants.INITIAL_DEST_LNG
            ],
        }
    }


    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    srcLatLng: [
                        position.coords.longitude, position.coords.latitude, 
                    ],
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    getInstructions(instructions, distance, duration){
        //this.moveCameraToFitBounds();
        if (this.props.getInstructions) {
            this.props.getInstructions(instructions, distance, duration);
        }
    }

    render() {
        const { dest, destName, isLocated } = this.props;
        
        if (isLocated) {
            return (
                <MapboxGL.MapView
                    style={styles.container}
                    minZoomLevel={1}
                    maxZoomLevel={24}
                    zoomLevel={3}
                    zoomEnabled={true}
                    scrollEnabled={true}
                    styleURL={MapboxGL.StyleURL.Street}
                    showUserLocation={true}>

                    <MapboxGL.PointAnnotation
                        key='SourceAnnotation'
                        id='SourceAnnotation'
                        coordinate={this.state.srcLatLng}>
                        <MapboxGL.Callout title={"Colombia"} />
                    </MapboxGL.PointAnnotation>

                    <MapboxGL.PointAnnotation
                        key='DestinyAnnotation'
                        id='DestinyAnnotation'
                        coordinate={dest}>
                        <MapboxGL.Callout title={destName} />
                    </MapboxGL.PointAnnotation>

                    <Directions 
                            source={this.state.srcLatLng} destiny={dest}
                            directionsReturn={(instructions, distance, duration) => this.getInstructions(instructions, distance, duration)}
                            />
                </MapboxGL.MapView>
                
            )
        }
        else {
            return (
                <MapboxGL.MapView
                    style={styles.container}
                    minZoomLevel={1}
                    maxZoomLevel={24}
                    zoomLevel={3}
                    zoomEnabled={true}
                    scrollEnabled={true}
                    styleURL={MapboxGL.StyleURL.Street}
                    showUserLocation={true}>
                    <MapboxGL.PointAnnotation
                        key='SourceAnnotation'
                        id='SourceAnnotation'
                        coordinate={this.state.srcLatLng}>
                        <MapboxGL.Callout title={"Colombia"} />
                    </MapboxGL.PointAnnotation>
                </MapboxGL.MapView>

            )
        }
    }
}


ShowMap.propTypes = {

    src: PropTypes.arrayOf(PropTypes.number),
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
    }
});