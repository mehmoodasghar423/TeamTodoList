import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const useSignUp = (navigation) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    modalVisible: false,
  });
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [loaderVisible, setLoaderVisible] = useState(false);

  const handleSignUp = async () => {
    const { name, email, password, role } = formState;

    if (!name || !email || !password || !role) {
      setModalMessage('Please fill in all fields.');
      setFormState(prevState => ({ ...prevState, modalVisible: true }));
      return;
    }

    if (password.length < 6) {
      setModalMessage('Password should be at least 6 characters.');
      setFormState(prevState => ({ ...prevState, modalVisible: true }));
      return;
    }

    if (name.length < 4) {
      setModalMessage('Name should be at least 4 characters.');
      setFormState(prevState => ({ ...prevState, modalVisible: true }));
      return;
    }

    setLoaderVisible(true);

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;

      await firestore().collection('Users').doc(userId).set({
        name,
        email,
        role,
      });

      // setModalMessage('Your account has been created successfully, Now You can Login!');
      setFormState({
        name: '',
        email: '',
        password: '',
        role: '',
        modalVisible: true,
      });
      setLoaderVisible(false);
      navigation.navigate('Login' ,{messsge:"Your account has been created successfully, Now You can Login!"});
    } catch (error) {
      setLoaderVisible(false);
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
      setFormState(prevState => ({ ...prevState, modalVisible: true }));
    }
  };

  const handleRoleSelect = (selectedRole) => {
    setFormState(prevState => ({ ...prevState, role: selectedRole }));
    setRoleModalVisible(false);
  };

  return {
    formState,
    roleModalVisible,
    modalMessage,
    loaderVisible,
    handleSignUp,
    handleRoleSelect,
    setRoleModalVisible,
    setFormState,
  };
};

export default useSignUp;
