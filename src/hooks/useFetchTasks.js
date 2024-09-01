import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

const useFetchTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('tasks')
      .onSnapshot(
        snapshot => {
          const taskList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTasks(taskList);
          setLoading(false);
        },
        err => {
          console.error('Error fetching tasks:', err);
          setError('Failed to fetch tasks');
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  return { tasks, loading, error };
};

export default useFetchTasks;
