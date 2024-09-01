import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const useFetchUserData = () => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await firestore().collection('Users').doc(auth().currentUser.uid).get();
        if (userDoc.exists) {
          setUserName(userDoc.data().name);
        } else {
          console.error('User data not found!');
          setError('User data not found');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Error fetching user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { userName, loading, error };
};

export default useFetchUserData;
