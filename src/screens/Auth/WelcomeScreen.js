import React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import images from '../../images';
import PrimaryButton from '../../components/PrimaryButton';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image source={images.Welcome} style={styles.welcomeImage} />
      <Text style={styles.title}>Welcome to Team To-Do List App</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  welcomeImage: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 22,
    marginBottom: 40,
    fontFamily: 'TitilliumWeb-Bold',
  },
  buttonStyles:{
    backgroundColor:"red"
  }
});

export default WelcomeScreen;
