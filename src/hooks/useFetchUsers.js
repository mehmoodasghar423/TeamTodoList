import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

const useFetchUsers = () => {
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Users')
      .onSnapshot(
        snapshot => {
          const userList = snapshot.docs.reduce((acc, doc) => {
            acc[doc.id] = doc.data().name;
            return acc;
          }, {});
          setUsers(userList);
          setLoading(false);
        },
        err => {
          console.error('Error fetching users:', err);
          setError('Failed to fetch users');
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  return { users, loading, error };
};

export default useFetchUsers;
