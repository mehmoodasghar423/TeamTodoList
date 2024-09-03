import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [loaderVisible, setLoaderVisible] = useState(false);

  const handleLogin = async (email, password, navigation) => {
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

        const route = userData.role === 'Admin' ? 'AdminHome' : 'MemberHome';

        navigation.reset({
          index: 0,
          routes: [{ name: 'App', state: { routes: [{ name: route }] } }],
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
      } else if (error.code === 'auth/invalid-email') {
        message = 'The email address is badly formatted. Please enter a valid email address.';
      } else if (error.code === 'auth/wrong-password') {
        message = 'The password is incorrect.';
      }

      setModalMessage(message);
      setModalVisible(true);
    } finally {
      setLoading(false);
      setLoaderVisible(false);
    }
  };

  return {
    loading,
    modalVisible,
    modalMessage,
    loaderVisible,
    handleLogin,
    setModalVisible,
  };
};

export default useLogin;
