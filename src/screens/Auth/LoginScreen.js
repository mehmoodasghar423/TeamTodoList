import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CustomTextInput from '../../components/CustomTextInput'; 
import CustomButton from '../../components/CustomButton'; 
import CustomModal from '../../components/CustomModal'; 
import CustomLoader from '../../components/CustomLoader'; 
import images from '../../images';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [loaderVisible, setLoaderVisible] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setModalMessage('Please fill in all fields.');
      setModalVisible(true);
      return;
    }

    setLoading(true);
    setLoaderVisible(true); 

    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;

      const userDoc = await firestore().collection('Users').doc(userId).get();
      const userData = userDoc.data();

      if (userData) {
        setModalMessage('Logged in successfully!');
        setModalVisible(true);
        console.log('User logged in successfully!', userData);

        if (userData.role === 'Admin') {
          navigation.reset({
            index: 0,
            routes: [{ name: 'App', state: { routes: [{ name: 'AdminHome' }] } }],
          });
          return
        } e

          navigation.reset({
            index: 0,
            routes: [{ name: 'App', state: { routes: [{ name: 'MemberHome' }] } }],
          });
        

      } else {
        setModalMessage('User data not found.');
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      let message = 'An unexpected error occurred.';

      if (error.code === 'auth/invalid-credential') {
        message = 'Provided credentials are not correct.';
      } else if (error.code === 'auth/user-not-found') {
        message = 'No user found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        message = 'The password is incorrect.';
      }

      setModalMessage(message);
      setModalVisible(true);
    } finally {
      setLoading(false);
      setLoaderVisible(false); // Hide loader
    }
  };

  return (
    <View style={styles.container}>
      <Image source={images.Welcome} style={styles.welcomeImage} />
      <Text style={styles.title}>Log In to Your Account</Text>

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

      <CustomButton title="Log In" onPress={handleLogin} />

      {/* Custom Modal for showing messages */}
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Alert"
        message={modalMessage}
      />

      {/* Custom Loader */}
      <CustomLoader
        visible={loaderVisible}
        message="Logging in, please wait..."
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
  loading: {
    marginTop: 20,
  },
  welcomeImage: {
    width: 250,
    height: 250,
  },
});

export default LoginScreen;
