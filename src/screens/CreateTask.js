import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList, Modal, TextInput, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
import firestore from '@react-native-firebase/firestore';

const CreateTask = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [showMembers, setShowMembers] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [priority, setPriority] = useState('Select Priority');
  const [loading, setLoading] = useState(false);

//   console.log("date",date);
  
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
    setShowMembers(false); // Close the modal after selection
  };

  const handlePriorityPress = () => {
    Alert.alert('Select Priority', 'Choose the priority', [
      { text: 'High', onPress: () => setPriority('High') },
      { text: 'Low', onPress: () => setPriority('Low') },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  const handleSubmit = async () => {
    if (!taskTitle || !taskDescription || !selectedMember) {
      Alert.alert('Error', 'Please fill in all fields and select a member.');
      return;
    }

    setLoading(true);
    try {
      // Create a new task in Firestore
      await firestore().collection('tasks').add({
        title: taskTitle,
        description: taskDescription,
        dueDate: date.toDateString(),
        priority,
        assignedTo: selectedMember.id,
        status: 'incomplete'
      });
      Alert.alert('Success', 'Task has been created successfully!');
      // Reset form fields
      setTaskTitle('');
      setTaskDescription('');
      setPriority('Select Priority');
      setSelectedMember(null);

      navigation.navigate('AdminHome')
    } catch (err) {
      Alert.alert('Error', 'Failed to create task: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create a New Task</Text>

      <Text style={styles.label}>Task Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />

      <Text style={styles.label}>Task Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task description"
        value={taskDescription}
        onChangeText={setTaskDescription}
      />

      <Text style={styles.label}>Due Date</Text>
      <Button title="Open Date Picker" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Text style={styles.label}>{date.toDateString()}</Text>

      <TouchableOpacity style={styles.priorityButton} onPress={handlePriorityPress}>
        <Text style={styles.priorityText}>{priority}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Assign Task To</Text>
      <TouchableOpacity style={styles.button} onPress={() => setShowMembers(true)}>
        <Text style={styles.buttonText}>Select Member</Text>
      </TouchableOpacity>

      {selectedMember && (
        <Text style={styles.selectedMember}>Selected: {selectedMember.name}</Text>
      )}

      <Button title={loading ? "Submitting..." : "Submit Task"} onPress={handleSubmit} disabled={loading} />

      <Modal
        visible={showMembers}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowMembers(false)}
      >
        <View style={styles.overlay} />
        <View style={styles.modalContainer}>
          <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleMemberPress(item)} style={styles.memberItem}>
                <Text style={styles.memberName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <Button title="Close" onPress={() => setShowMembers(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 22,
    marginVertical: 20,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  priorityButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  priorityText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedMember: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    marginTop: '50%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black with 50% opacity
    zIndex: 0,
  },
  memberItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  memberName: {
    fontSize: 16,
  },
});

export default CreateTask;
