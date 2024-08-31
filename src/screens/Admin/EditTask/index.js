import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
import firestore from '@react-native-firebase/firestore';
import Title from '../../../components/Title';
import GlobalTextInput from '../../../components/GlobalTextInput';
import AssignTaskModal from '../../../components/AssignTaskModal';
import PrimaryButton from '../../../components/PrimaryButton';
import AppAlert from '../../../components/AppAlert';

const EditTask = ({ route, navigation }) => {
  const { task } = route.params; // Get task data from params
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
          ...doc.data()
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
      // Update the existing task in Firestore
      await firestore().collection('tasks').doc(task.id).update({
        title: taskTitle,
        description: taskDescription,
        dueDate: date ? date.toDateString() : null,
        priority,
        assignedTo: selectedMember.id,
        status: 'Uncomplete'
      });
      navigation.navigate('AdminAllTasks');
    } catch (err) {
      Alert.alert('Error', 'Failed to update task: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Title text="Edit this Task" />
      <Text style={styles.label}>Task Title</Text>
      <GlobalTextInput
        style={styles.input}
        placeholder="Enter task title"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />
      <Text style={styles.label}>Task Description</Text>
      <GlobalTextInput
        style={styles.input}
        placeholder="Enter task description"
        value={taskDescription}
        onChangeText={setTaskDescription}
      />
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Due Date</Text>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Text style={styles.fieldValue}>
            {date ? date.toDateString() : 'Select a Date'}
          </Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={open}
          date={date || new Date()}
          onConfirm={(selectedDate) => {
            setOpen(false);
            setDate(selectedDate);
          }}
          onCancel={() => setOpen(false)}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Priority</Text>
        <TouchableOpacity onPress={() => setPriorityModalVisible(true)}>
          <Text style={styles.fieldValue}>{priority}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Assign Task To</Text>
        <TouchableOpacity onPress={() => setShowMembers(true)}>
          <Text style={styles.fieldValue}>
            {selectedMember ? selectedMember.name : 'Select Member'}
          </Text>
        </TouchableOpacity>
      </View>
      <PrimaryButton
        title={loading ? "Editing..." : "Edit Task"}
        backgroundColor="#4169e1"
        onPress={handleSubmit}
      />
      <AssignTaskModal
        visible={showMembers}
        users={users}
        onClose={() => setShowMembers(false)}
        onSelectMember={handleMemberPress}
      />
      <AppAlert
        visible={priorityModalVisible}
        title="Select Priority"
        options={['High', 'Medium', 'Low']}
        onClose={() => setPriorityModalVisible(false)}
        onSelect={handlePrioritySelect}
      />
      <AppAlert
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Alert"
        message={modalMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
    fontFamily: 'TitilliumWeb-SemiBold',
    color: 'grey',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    fontFamily: 'TitilliumWeb-Regular',
    color: 'black',
  },
  fieldContainer: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldLabel: {
    fontSize: 16,
    fontFamily: 'TitilliumWeb-SemiBold',
    color: 'grey',
  },
  fieldValue: {
    fontSize: 16,
    fontFamily: 'TitilliumWeb-Regular',
    color: 'black',
  },
});

export default EditTask;
