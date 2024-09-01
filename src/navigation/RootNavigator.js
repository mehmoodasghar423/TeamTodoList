import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const Stack = createStackNavigator();

const screenConfig = [
  { name: 'Auth', component: AuthNavigator },
  { name: 'App', component: AppNavigator },
];

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      {screenConfig.map(({ name, component }) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={{ headerShown: false }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default RootNavigator;
