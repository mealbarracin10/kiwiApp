import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import DisplayMap from "./DisplayMap"
import Indications from "./Indications"

export const Root = StackNavigator({
    Map: {
        screen: DisplayMap,
    },
    Indications: {
        screen: Indications,
    }

}, {
        mode: 'modal',
        headerMode: 'none',
    });