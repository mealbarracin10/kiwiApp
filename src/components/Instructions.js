import React, { Component } from 'react';
import { Container, Header, Content, Button } from 'native-base';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import Dimensions from 'Dimensions';
import Indications from './Indications'

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class Instructions extends Component<{}> {

    constructor(props) {
        super(props)
        this.state = {}
    }

    static propTypes = {
        instructions: PropTypes.arrayOf(PropTypes.string),
        distance: PropTypes.string,
        duration: PropTypes.string
    };

   
convertDist(distance){
        let distKm = distance / 1000;
        distKm = distKm.toFixed(1);
        const newDistance = distKm > 0 ? distKm + ( distKm == 1?' km ':' kms '): '';
        return newDistance;

    }

    convertTime(duration){
        const days = Math.floor(duration/86400); // 24*60*60
        const hours = Math.floor( (duration % 86400) / 3600); // 60*60
        const mins = Math.floor( (duration % 86400) % 60);
        const daysStr = days > 0 ? days + ( days == 1?' day, ':' days, '): '';
        const hoursStr = hours > 0 ? hours + ( hours == 1?' hr, ':' hrs, '): '';
        const minsStr = mins > 0 ? mins + ( mins == 1?' min ':' mins '): '';
        return (daysStr + hoursStr + minsStr);
    }





    render() {

        const {instructions, distance, duration} = this.props;
        console.log('Instructionsjs')
        console.log('instructions : ' + instructions);
        console.log('distance : ' + distance);
        console.log('duration : ' + duration);
        let  optionsInstrc = [];
        optionsInstrc.push(...instructions); // ... spread operator ES6
        console.log(optionsInstrc);
        return (
            <View >
                <Button block success  style={styles.btn2}  onPress={() => this.props.navigator.navigate('Indications', {instructions: optionsInstrc, distance: this.convertDist(distance),  duration: this.convertTime(duration) })}>
                    <Text style={styles.txt}>Instructions</Text>
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    btn2: {
        backgroundColor: 'rgba(88, 180, 135, 0.8)',
        bottom: 38,
    },
    txt:{
        color: 'white'
    }
});