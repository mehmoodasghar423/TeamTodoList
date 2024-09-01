import { useState } from 'react';
import firestore from '@react-native-firebase/firestore';

export const useToggleTaskStatus = (task) => {
  const [taskStatus, setTaskStatus] = useState(task.status);

  const toggleTaskStatus = async () => {
    try {
      const newStatus = taskStatus === 'Complete' ? 'Uncomplete' : 'Complete';
      await firestore().collection('tasks').doc(task.id).update({
        status: newStatus,
      });
      setTaskStatus(newStatus);
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  };

  return { taskStatus, toggleTaskStatus };
};
