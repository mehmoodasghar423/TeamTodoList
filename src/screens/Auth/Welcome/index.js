import React from 'react';
import { View } from 'react-native';
import WelcomeImage from '../../../components/WelcomeImage';
import PrimaryButton from '../../../components/PrimaryButton';
import Title from '../../../components/Title';
import commonStyles from '../../../styles/common';

const Welcome = ({ navigation }) => {
  return (
    <View style={commonStyles.container}>
      <WelcomeImage />
      <Title text="Welcome to Team To-Do List" />

      <PrimaryButton
        title="Log In"
        backgroundColor="#4169e1"
        onPress={() => navigation.navigate('Login')}
      />

      <PrimaryButton
        title="SignUp"
        backgroundColor="#4169e1"
        buttonStyle={{ marginTop: 20, paddingHorizontal: 70 }}
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
};

export default Welcome;
