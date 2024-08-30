import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CustomTextInput from '../components/CustomTextInput'; 
import CustomButton from '../components/CustomButton'; 

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('Asdf1234');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;

      await firestore().collection('Users').doc(userId).set({
        name: name,
        email: email,
        role: role,
      });

      Alert.alert('Success', 'User signed up and data saved to Firestore!');
      console.log('User signed up and data saved to Firestore!');
      setName('')
      setEmail('')
      setPassword('')
      setRole('')
      setLoading(false);
      navigation.navigate('Login'); 
    } catch (error) {
      setLoading(false);
      console.error('Error signing up:', error);

      // Custom handling for specific error
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert(
          'Sign Up Error',
          'The email address is already in use. Please use a different email address.',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert('Sign Up Error', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <CustomTextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <CustomTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <CustomTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CustomTextInput
        placeholder="Role"
        value={role}
        onChangeText={setRole}
      />

      <CustomButton title="Sign Up" onPress={handleSignUp} />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  loading: {
    marginTop: 20,
  },
});

export default SignUpScreen;
