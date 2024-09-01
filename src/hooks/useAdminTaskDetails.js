import { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const useAdminTaskDetails = (task) => {
  const navigation = useNavigation();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isDelete, setIsDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteTask = () => {
    setIsDelete(true);
    setAlertMessage('Are you sure you want to delete this task?');
    setAlertVisible(true);
  };

  const confirmDelete = async () => {
    setAlertVisible(false);
    setLoading(true);

    try {
      await firestore().collection('tasks').doc(task.id).delete();
      setAlertMessage('Task deleted successfully');
      setAlertVisible(true);
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting task:', error);
      setAlertMessage('Failed to delete task');
      setAlertVisible(true);
      setLoading(false);
    }
  };

  const handleEditTask = () => {
    navigation.navigate('EditTask', { task });
  };

  return {
    alertVisible,
    alertMessage,
    isDelete,
    loading,
    setAlertVisible,
    handleDeleteTask,
    confirmDelete,
    handleEditTask,
  };
};

export default useAdminTaskDetails;
