
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminHome from '../screens/AdminHome';
import MemberHome from '../screens/MemberHome';
import CreateTask from '../screens/CreateTask';
import TaskDetails from '../screens/TaskDetails';
import TeamProgress from '../screens/TeamProgress';
import MemberTaskDetails from '../screens/MemberTaskDetails';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen 
        name="AdminHome" 
        component={AdminHome} 
        options={{ headerShown: false }} 

      />
      <Stack.Screen 
        name="MemberHome" 
        component={MemberHome} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="CreateTask" 
        component={CreateTask} 
        options={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTitle:"Create Task",
            headerTintColor: '#fff', 
            headerTitleStyle: {
              fontFamily: 'TitilliumWeb-SemiBold',
            },
          }}      />
    
      <Stack.Screen 
        name="TaskDetails" 
        component={TaskDetails} 
        options={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTitle:"Task Details",
            headerTintColor: '#fff', 
            headerTitleStyle: {
              fontFamily: 'TitilliumWeb-SemiBold',
            },
          }}      />
      <Stack.Screen 
        name="TeamProgress" 
        component={TeamProgress} 
        options={{
            headerStyle: {
              backgroundColor: 'green',
            },
            headerTitle:"Team Progress",
            headerTintColor: '#fff', 
            headerTitleStyle: {
              fontFamily: 'TitilliumWeb-SemiBold',
            },
          }}      />
      <Stack.Screen 
        name="MemberTaskDetails" 
        component={MemberTaskDetails} 
        options={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTitle:"Task Details for Member",
            headerTintColor: '#fff', 
            headerTitleStyle: {
              fontFamily: 'TitilliumWeb-SemiBold',
            },
          }}      />
    
    </Stack.Navigator>
  );
};

export default AppNavigator;
