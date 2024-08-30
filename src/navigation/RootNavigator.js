import React from 'react';
import {createSwitchNavigator} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import {createStackNavigator} from '@react-navigation/stack';

const Switch = createStackNavigator();

const RootNavigator = () => {
  return (
    <Switch.Navigator>
      <Switch.Screen
        name="Auth"
        component={AuthNavigator}
        options={{headerShown: false}}
      />
      <Switch.Screen
        name="App"
        component={AppNavigator}
        options={{headerShown: false}}
      />
    </Switch.Navigator>
  );
};

export default RootNavigator;
