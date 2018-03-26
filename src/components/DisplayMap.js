import React, { Component } from 'react';
import { Form, StyleSheet, View, TouchableHighlight, Image, TextInput, Platform, Alert } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import Map from './Map';
import Instructions from './Instructions';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import Constants from '../helpers/constants.js';
import UserInput from './UserInput';
import Dimensions from 'Dimensions';
import location from '../Assets/images/location.png';
import { getLocation } from '../Api/api-client'
const DEVICE_HEIGHT = Dimensions.get('window').height
const IS_ANDROID = Platform.OS === 'android';

MapboxGL.setAccessToken(Constants.mapboxAccessToken);



export default class DisplayMap extends Component<{}> {

  constructor() {
    super();
    this.state = {
      destLatLng: {
        lat: Constants.INITIAL_DEST_LAT, lng: Constants.INITIAL_DEST_LNG,
      },
      destiny: "",
      instructions: [],
      distance: "",
      duration: "",
      isLocated: false,
      isFetchingAndroidPermission: IS_ANDROID,
      isAndroidPermissionGranted: false,
    }
  }

  async componentWillMount() {
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
          if (typeof Features !== 'undefined' && Features.length > 0) {
            const latLng = place.features[0].geometry.coordinates;
            if (!latLng) {
              Alert.alert('Location Error', destiny + ' not found  !!!');
              return
            }
            coord = { 'lat': latLng[1], 'lng': latLng[0] };
            this.setState({
              destLatLng: {
                lat: coord.lat, lng: coord.lng
              },
              isLocated: true,
            });
            return
          }
          else {
            Alert.alert('Location Error', destiny + ' not found  !!!');
            console.log("2. Not found located")
            return
          }

        })
      } catch (e) {
      }
    }
  }

  getInstructions(instructions, distance, duration) {
    this.setState({
      instructions: instructions,
      distance: distance,
      duration: duration
    });
  }

  showInstructions() {
    if (this.state.instructions && this.state.distance && this.state.duration ) {
      return (
        <Instructions instructions={this.state.instructions}
                      distance = {this.state.distance.toString()}
                      duration = {this.state.duration.toString()}
                      navigator={this.props.navigation}/>
      );
    } else {
      return null;
    }


  }


  render() {
    return (
      <View style={styles.container}>
        <Map dest={[this.state.destLatLng.lng, this.state.destLatLng.lat]} destName={this.state.destiny} isLocated={this.state.isLocated}
          getInstructions={(instructions, distance, duration) => this.getInstructions(instructions, distance, duration)}
        />
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
        {this.showInstructions()}
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