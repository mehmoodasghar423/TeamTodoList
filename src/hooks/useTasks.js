import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('tasks')
      .where('assignedTo', '==', auth().currentUser.uid)
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

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  const toggleTaskStatus = async (taskId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Complete' ? 'Uncomplete' : 'Complete';
      await firestore().collection('tasks').doc(taskId).update({ status: newStatus });
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  };

  return { tasks, loading, error, toggleTaskStatus };
};

export default useTasks;
