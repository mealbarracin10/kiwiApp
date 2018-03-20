import React, { Component } from 'react';
import { Form, StyleSheet, View, TouchableHighlight, Image, TextInput, Platform, Alert } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import Map from './Map';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import Constants from '../helpers/constants.js';
import UserInput from './UserInput';
import Dimensions from 'Dimensions';
import location from '../Assets/images/location.png';
import { getLocation } from '../Api/api-client'
const DEVICE_HEIGHT = Dimensions.get('window').height
const IS_ANDROID = Platform.OS === 'android';

MapboxGL.setAccessToken(Constants.mapboxAccessToken);



export default class App extends Component<{}> {

  constructor() {
    super();
    this.state = {
      destLatLng: {
        lat: Constants.INITIAL_DEST_LAT, lng: Constants.INITIAL_DEST_LNG
      },
      destiny: "",
      isLocated: false,
      isFetchingAndroidPermission: IS_ANDROID,
      isAndroidPermissionGranted: false,
    }
  }

  async componentWillMount(){
      if (IS_ANDROID) {
      const isGranted = await MapboxGL.requestAndroidLocationPermissions();
      this.setState({
        isAndroidPermissionGranted: isGranted,
        isFetchingAndroidPermission: false,
      });
    }
  }


  updateInputs() {
    destiny = this.state.destiny;
    this.setState({
      isLocated: false
    })
    if (destiny) {
      try {
        getLocation(this.state.destiny).then(place => {
          const Features = place.features
          console.log("1. Features"+ Features)
          if (typeof Features !== 'undefined' && Features.length > 0) {
            const latLng = place.features[0].geometry.coordinates;
            if (!latLng) {
              Alert.alert('Location Error', destiny + ' not found  !!!');
              return
            }
            coord = { 'lat': latLng[1], 'lng':latLng[0] };
            this.setState({
              destLatLng: {
                lat: coord.lat, lng: coord.lng
              },
              isLocated: true,
            });
            return
          }
          else
          {
            Alert.alert('Location Error',destiny+' not found  !!!');
            console.log("2. Not found located")
            return
          }
            
        })
      } catch (e) {
      }
    }
  }



  render() {
    return (
      <View style={styles.container}>
        <Map dest={[this.state.destLatLng.lng, this.state.destLatLng.lat]} destName={this.state.destiny} isLocated={this.state.isLocated} />
        <View>
          <UserInput
            onSubmitEdit={(event) => this.updateInputs(event)}
            style={styles.input}
            source={location}
            onChangeText={(text) => this.setState({ destiny: text })}
            textValue={this.state.destiny}
            placeholder='Search Here'
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    bottom: 80,




  },
});