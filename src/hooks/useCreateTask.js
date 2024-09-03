import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

const useCreateTask = (navigation) => {
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [showMembers, setShowMembers] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [priority, setPriority] = useState('Select Priority');
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
          ...doc.data()
        }));
        setUsers(userList.filter(user => user.role === 'Member'));
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

    if (date && new Date(date) < new Date()) {
      setModalMessage('Please select a valid future date.');
      setModalVisible(true);
      return;
    }

    setLoading(true);
    try {
      await firestore().collection('tasks').add({
        title: taskTitle,
        description: taskDescription,
        dueDate: date ? date.toDateString() : null,
        priority,
        assignedTo: selectedMember.id,
        status: 'Uncomplete',
      });
      setTaskTitle('');
      setTaskDescription('');
      setPriority('Select Priority');
      setSelectedMember(null);
      setDate(null);
      navigation.navigate('AdminAllTasks');
    } catch (err) {
      console.error('Error creating task:', err.message);
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
    taskTitle,
    setTaskTitle,
    taskDescription,
    setTaskDescription,
    priority,
    setPriority,
    loading,
    modalVisible,
    setModalVisible,
    modalMessage,
    priorityModalVisible,
    setPriorityModalVisible,
    handleMemberPress,
    handlePrioritySelect,
    handleSubmit,
  };
};

export default useCreateTask;
