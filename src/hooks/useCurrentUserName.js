import { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const useCurrentUserName = () => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userId = auth().currentUser?.uid;
        if (userId) {
          const userDoc = await firestore().collection('Users').doc(userId).get();
          if (userDoc.exists) {
            setUserName(userDoc.data().name); 
          } else {
            setError('User document does not exist.');
          }
        } else {
          setError('User not authenticated.');
        }
      } catch (error) {
        setError('Error fetching user name.');
        console.error('Error fetching user name:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserName();
  }, []);

  return { userName, loading, error };
};

export default useCurrentUserName;
