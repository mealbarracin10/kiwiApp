import React, { Component } from 'react';
import { StyleSheet, View,TouchableHighlight, Image } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';

Mapbox.setAccessToken('pk.eyJ1IjoiZWRnYXIzMjgwIiwiYSI6ImNqZWMzaGtkNDE1ODQycXFlbzIzZHplZmMifQ.-zbRaTP4d2datg_DChElhg');

export default class App extends Component<{}> {

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
            styleURL={Mapbox.StyleURL.Dark}
            zoomLevel={15}
            centerCoordinate={[11.256, 43.770]}
            style={styles.container}
            showUserLocation={true}> 
            {this.renderAnnotations()}
        </Mapbox.MapView>
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