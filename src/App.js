import React, { Component } from 'react';
import { StyleSheet, View,TouchableHighlight, Image } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import Icon from 'react-native-vector-icons/MaterialIcons';

Mapbox.setAccessToken('pk.eyJ1IjoiZWRnYXIzMjgwIiwiYSI6ImNqZWMzaGtkNDE1ODQycXFlbzIzZHplZmMifQ.-zbRaTP4d2datg_DChElhg');

export default class App extends Component<{}> {

  constructor() {
    super();
    this.state = {
    }
  }
  onUserLocationUpdate (location) {
  this.setState({ location: location });
}

centerMap () {
  if (this.state.location) {
    const location = this.state.location; // This was missing
    this.map.setCamera({
      centerCoordinate: [location.coords.longitude, location.coords.latitude],
    });
  }
}

  renderAnnotations () {
    return (
      <Mapbox.PointAnnotation
        key='pointAnnotation'
        id='pointAnnotation'
        coordinate={[11.254, 43.772]}>

        <View style={styles.annotationContainer}>
          <View style={styles.annotationFill} />
        </View>
        <Mapbox.Callout title='Look! An annotation!' />
      </Mapbox.PointAnnotation>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Mapbox.MapView
            ref={map => { this._map = map; }}
            styleURL={Mapbox.StyleURL.Street}
            zoomLevel={11.00}
            centerCoordinate={[114.139249, 22.3827448]}
            style={styles.container}
            showUserLocation={true}
            onUpdateUserLocation={this.onUpdateUserLocation}>
            {this.renderAnnotations()}
        </Mapbox.MapView>

        <Icon.Button name="my-location" backgroundColor="#3b5998" onPress={() => this.centerMap()}>
  </Icon.Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'orange',
    transform: [{ scale: 0.6 }],
  },
  buttonGeolocation : {
    backgroundColor:'transparent',
  }

});