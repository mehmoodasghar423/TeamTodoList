import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import GlobalTextInput from '../../../components/GlobalTextInput';
import PrimaryButton from '../../../components/PrimaryButton';
import AppAlert from '../../../components/AppAlert';
import AppLoader from '../../../components/AppLoader';
import images from '../../../images';
import Title from '../../../components/Title';
import useLogin from '../../../hooks/useLogin';
import commonStyles from '../../../styles/common';
import WelcomeImage from '../../../components/WelcomeImage';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    loading,
    modalVisible,
    modalMessage,
    loaderVisible,
    handleLogin,
    setModalVisible,
  } = useLogin();

  return (
    <View style={commonStyles.container}>
       <WelcomeImage />

      <Title text="Log In to Your Account" />

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

      <PrimaryButton
        title="Log In"
        backgroundColor="#4169e1"
        onPress={() => handleLogin(email, password, navigation)}
      />

      <AppAlert
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Alert"
        message={modalMessage}
      />

      <AppLoader
        visible={loaderVisible}
        message="Logging in, please wait..."
      />
    </View>
  );
};


export default Login;
