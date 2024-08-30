import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CustomTextInput from '../../components/CustomTextInput'; 
import CustomButton from '../../components/CustomButton'; 
import CustomModal from '../../components/CustomModal'; 
import CustomLoader from '../../components/CustomLoader'; 
import images from '../../images'; 

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [loaderVisible, setLoaderVisible] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password || !role) {
      setModalMessage('Please fill in all fields.');
      setModalVisible(true);
      return;
    }

    if (password.length < 6) {
      setModalMessage('Password should be at least 6 characters.');
      setModalVisible(true);
      return;
    }
    if (name.length < 4) {
      setModalMessage('Name should be at least 4 characters.');
      setModalVisible(true);
      return;
    }

    setLoading(true);
    setLoaderVisible(true); 

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;

      await firestore().collection('Users').doc(userId).set({
        name: name,
        email: email,
        role: role,
      });

      setModalMessage('User signed up and data saved to Firestore!');
      setModalVisible(true);
      setName('');
      setEmail('');
      setPassword('');
      setRole('');
      setLoading(false);
      navigation.navigate('Login'); 
    } catch (error) {
      setLoading(false);
      setLoaderVisible(false); 
      console.error('Error signing up:', error);

      let message = 'An unexpected error occurred.';

      if (error.code === 'auth/email-already-in-use') {
        message = 'The email address is already in use. Please use a different email address.';
      } else {
        message = error.message;
      }

      setModalMessage(message);
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={images.Welcome} style={styles.signupImage} /> 
      <Text style={styles.title}>Register Your Account Here !</Text>

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

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Alert"
        message={modalMessage}
      />

      <CustomLoader
        visible={loaderVisible}
        message="Signing up, please wait..."
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
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'TitilliumWeb-Bold',
  },
  signupImage: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  loading: {
    marginTop: 20,
  },
});

export default SignUpScreen;
