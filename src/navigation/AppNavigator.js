import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AdminHome from '../screens/Admin/AdminHome';
import AdminAllTasks from '../screens/Admin/AdminAllTasks';
import TeamProgress from '../screens/Admin/TeamProgress';
import CreateTask from '../screens/Admin/CreateTask';
import AdminTaskDetails from '../screens/Admin/TaskDetails';
import MemberHome from '../screens/Member/MemberHome';
import MemberTaskDetails from '../screens/Member/MemberTaskDetails';
import EditTask from '../screens/Admin/EditTask';

const Stack = createStackNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: "#4169e1",
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontFamily: 'TitilliumWeb-SemiBold',
  },
};

const screens = [
  { name: 'AdminHome', component: AdminHome, options: { headerShown: false } },
  { name: 'MemberHome', component: MemberHome, options: { headerShown: false } },
  { name: 'CreateTask', component: CreateTask, options: { ...screenOptions, headerTitle: 'Create Task' } },
  { name: 'TaskDetails', component: AdminTaskDetails, options: { ...screenOptions, headerTitle: 'Task Details' } },
  { name: 'EditTask', component: EditTask, options: { ...screenOptions, headerTitle: 'Edit Task' } },
  { name: 'TeamProgress', component: TeamProgress, options: { ...screenOptions, headerTitle: 'Team Progress' } },
  { name: 'MemberTaskDetails', component: MemberTaskDetails, options: { ...screenOptions, headerTitle: 'Task Details for Member' } },
  { name: 'AdminAllTasks', component: AdminAllTasks, options: { ...screenOptions, headerTitle: 'All Tasks' } },
];

const AppNavigator = () => (
  <Stack.Navigator>
    {screens.map(({ name, component, options }) => (
      <Stack.Screen
        key={name}
        name={name}
        component={component}
        options={options}
      />
    ))}
  </Stack.Navigator>
);

export default AppNavigator;
