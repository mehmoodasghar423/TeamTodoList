import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CustomTextInput from '../components/CustomTextInput'; 
import CustomButton from '../components/CustomButton'; 

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('Asdf1234');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;

      const userDoc = await firestore().collection('Users').doc(userId).get();
      const userData = userDoc.data();

      if (userData) {
        Alert.alert('Success', 'Logged in successfully!');
        console.log('User logged in successfully!', userData);

        if (userData.role === 'Admin') {
          navigation.reset({
            index: 0,
            routes: [{ name: 'App', state: { routes: [{ name: 'AdminHome' }] } }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'App', state: { routes: [{ name: 'MemberHome' }] } }],
          });
        }
        // setEmail('');
        // setPassword('');
      } else {
        Alert.alert('Error', 'User data not found.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Login Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>

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
        // secureTextEntry
      />

      <CustomButton title="Log In" onPress={handleLogin} />

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

export default LoginScreen;
