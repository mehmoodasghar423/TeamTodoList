import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

export const useEditTask = (task, navigation) => {
  const [date, setDate] = useState(task.dueDate ? new Date(task.dueDate) : null);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [showMembers, setShowMembers] = useState(false);
  const [selectedMember, setSelectedMember] = useState(users.find(user => user.id === task.assignedTo) || null);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [priorityModalVisible, setPriorityModalVisible] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await firestore().collection('Users').get();
        const userList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        const members = userList.filter(user => user.role === 'Member');
        setUsers(members);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  const handleMemberPress = (member) => {
    setSelectedMember(member);
    setShowMembers(false);
  };

  const handlePrioritySelect = (selectedPriority) => {
    setPriority(selectedPriority);
    setPriorityModalVisible(false);
  };

  const handleSubmit = async () => {
    if (!taskTitle || !taskDescription || !selectedMember) {
      setModalMessage('Please fill in all fields and select a member');
      setModalVisible(true);
      return;
    }

    setLoading(true);
    try {
      await firestore().collection('tasks').doc(task.id).update({
        title: taskTitle,
        description: taskDescription,
        dueDate: date ? date.toDateString() : null,
        priority,
        assignedTo: selectedMember.id,
        status: 'Uncomplete',
      });
      navigation.navigate('AdminAllTasks');
    } catch (err) {
      Alert.alert('Error', 'Failed to update task: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    date,
    setDate,
    open,
    setOpen,
    users,
    showMembers,
    setShowMembers,
    selectedMember,
    handleMemberPress,
    taskTitle,
    setTaskTitle,
    taskDescription,
    setTaskDescription,
    priority,
    handlePrioritySelect,
    loading,
    handleSubmit,
    modalVisible,
    setModalVisible,
    modalMessage,
    priorityModalVisible,
    setPriorityModalVisible,
  };
};
