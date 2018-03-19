/**
 * Created by martinalbarracin on 16/07/17.
 */
import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	View,
	TextInput,
	Image,
	Platform,

} from 'react-native';
import PropTypes from 'prop-types';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class UserInput extends Component {
	render() {
		return (
			<View style={this.props.style}>
				<Image source={this.props.source}
					style={styles.inlineImg} />
				<TextInput style={styles.input}
					onChangeText={this.props.onChangeText}
					onSubmitEditing={this.props.onSubmitEdit}
					value={this.props.textValue}
					placeholder={this.props.placeholder}
					secureTextEntry={this.props.secureTextEntry}
					autoCorrect={this.props.autoCorrect}
					autoCapitalize={this.props.autoCapitalize}
					returnKeyType={this.props.returnKeyType}
					placeholderTextColor='white'
					keyboardType={this.props.keyboardType}
					underlineColorAndroid='transparent' />
				<Image source={this.props.source}
					style={styles.inlineImg} />	
			</View>

		);
	}
}

UserInput.propTypes = {
	onSubmitEdit: PropTypes.func,
	textValue: PropTypes.string.isRequired,
	source: PropTypes.number.isRequired,
	placeholder: PropTypes.string.isRequired,
	keyboardType: PropTypes.string,
	secureTextEntry: PropTypes.bool,
	autoCorrect: PropTypes.bool,
	autoCapitalize: PropTypes.string,
	returnKeyType: PropTypes.string,
	searchSubmit : PropTypes.string
};

const styles = StyleSheet.create({
	input: {
        backgroundColor: 'rgba(55, 106, 165, 0.8)',
        width: DEVICE_WIDTH - 40,
        height: DEVICE_WIDTH* 0.10,
        marginHorizontal: 20,
        paddingLeft: 45,
        borderRadius: 20,
        color: '#ffffff',
    },
	inputWrapper: {
		flex: 1,
	},
	inlineImg: {
		position: 'absolute',
		zIndex: 99,
		width: 22,
		height: 22,
		left: 35,
		top: 9,
	},
});
