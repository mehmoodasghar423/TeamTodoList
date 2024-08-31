import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import GlobalTextInput from '../../components/GlobalTextInput'; 
import PrimaryButton from '../../components/PrimaryButton'; 
import AppAlert from '../../components/AppAlert'; 
import AppLoader from '../../components/AppLoader'; 
import images from '../../images'; 

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [roleModalVisible, setRoleModalVisible] = useState(false); // Role modal state
  const [modalMessage, setModalMessage] = useState('');
  const [loaderVisible, setLoaderVisible] = useState(false);

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setRoleModalVisible(false); 
  };


  
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
  
      setModalMessage('User signed up and data saved to Database!');
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
  
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'The email address is already in use. Please use a different email address.';
          break;
        case 'auth/invalid-email':
          message = 'The email address is badly formatted. Please enter a valid email address.';
          break;
        case 'auth/weak-password':
          message = 'Password should be at least 6 characters.';
          break;
        default:
          message = error.message;
          break;
      }
  
      setModalMessage(message);
      setModalVisible(true);
    }
  };
  

  return (
    <View style={styles.container}>
      <Image source={images.Welcome} style={styles.signupImage} /> 
      <Text style={styles.title}>Register Your Account Here !</Text>

      <GlobalTextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <GlobalTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <GlobalTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
    
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Select A Role</Text>
        <TouchableOpacity onPress={() => setRoleModalVisible(true)}>
          <Text style={styles.fieldValue}>{role || 'Select your role'}</Text>
        </TouchableOpacity>
      </View>

      <PrimaryButton title="Sign Up" onPress={handleSignUp} />

      {/* Custom Modal for Role Selection */}
      <AppAlert

visible={roleModalVisible}
title="Select A Role"
options={['Member', 'Admin']}
onClose={() => setRoleModalVisible(false)}
onSelect={handleRoleSelect}


    
      />

      <AppAlert
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Alert"
        message={modalMessage}
      />

      <AppLoader
        visible={loaderVisible}
        message="Creating Account, please wait..."
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
  fieldContainer: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldLabel: {
    fontSize: 16,
    fontFamily: 'TitilliumWeb-SemiBold',
    color: 'grey',
  },
  fieldValue: {
    fontSize: 16,
    fontFamily: 'TitilliumWeb-Regular',
    color: 'black',
  },
  roleOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  roleText: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Regular',
    textAlign: 'center',
  },
});

export default SignUpScreen;
