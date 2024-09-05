import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import GlobalTextInput from '../../../components/GlobalTextInput';
import PrimaryButton from '../../../components/PrimaryButton';
import AppAlert from '../../../components/AppAlert';
import AppLoader from '../../../components/AppLoader';
import images from '../../../images';
import Title from '../../../components/Title';
import useSignUp from '../../../hooks/useSignUp';
import commonStyles from '../../../styles/common';

const SignUp = ({ navigation }) => {
  const {
    formState,
    roleModalVisible,
    modalMessage,
    loaderVisible,
    handleSignUp,
    handleRoleSelect,
    setRoleModalVisible,
    setFormState,
  } = useSignUp(navigation);

  return (
    <View style={commonStyles.container}>
      <Image source={images.Welcome} style={commonStyles.signupImage} />
      <Title text="Register Your Account Here!" />

      <GlobalTextInput
        placeholder="Name"
        value={formState.name}
        onChangeText={(text) => setFormState(prevState => ({ ...prevState, name: text }))}
      />
      <GlobalTextInput
        placeholder="Email"
        value={formState.email}
        onChangeText={(text) => setFormState(prevState => ({ ...prevState, email: text }))}
        keyboardType="email-address"
      />
      <GlobalTextInput
        placeholder="Password"
        value={formState.password}
        onChangeText={(text) => setFormState(prevState => ({ ...prevState, password: text }))}
        secureTextEntry
      />

      <View style={commonStyles.fieldContainer}>
        <Text style={commonStyles.fieldLabel}>Select A Role</Text>
        <TouchableOpacity onPress={() => setRoleModalVisible(true)}>
          <Text style={commonStyles.fieldValue}>{formState.role || 'Select your role'}</Text>
        </TouchableOpacity>
      </View>

      <PrimaryButton
        title="Sign Up"
        backgroundColor="#4169e1"
        onPress={handleSignUp}
      />

      <AppAlert
        visible={roleModalVisible}
        title="Select A Role"
        options={['Member', 'Admin']}
        onClose={() => setRoleModalVisible(false)}
        onSelect={handleRoleSelect}
      />

      <AppAlert
        visible={formState.modalVisible}
        onClose={() => setFormState(prevState => ({ ...prevState, modalVisible: false }))}
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

export default SignUp;
