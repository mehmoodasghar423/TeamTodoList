import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import images from '../images'; // Ensure this path is correct
import firestore from '@react-native-firebase/firestore'; // Import Firestore
import AppAlert from '../components/AppAlert';
import AppLoader from '../components/AppLoader'; 

const TaskDetails = ({ route }) => {
  const { task } = route.params;
  const navigation = useNavigation();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isDelete, setIsDelete] = useState(false);
  const [loading, setLoading] = useState(false); // Add state for loading

  // Function to handle task deletion
  const handleDeleteTask = () => {
    setIsDelete(true);
    setAlertMessage('Are you sure you want to delete this task?');
    setAlertVisible(true);
  };

  // Confirm deletion
  const confirmDelete = async () => {
    setAlertVisible(false); // Close the delete confirmation modal
    setLoading(true); // Show the loader

    try {
      await firestore().collection('tasks').doc(task.id).delete();
      setAlertMessage('Task deleted successfully');
      setAlertVisible(true);
      setLoading(false); // Hide the loader
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting task:', error);
      setAlertMessage('Failed to delete task');
      setAlertVisible(true);
      setLoading(false); // Hide the loader
    }
  };

  // Function to handle navigation to EditTask screen
  const handleEditTask = () => {
    navigation.navigate('EditTask', { task });
  };

  return (
    <View style={styles.container}>
      <Image source={images.SingleTodo} style={styles.SingleTodoImage} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Assigned to:</Text>
        <Text style={styles.value}>{task.userName}</Text>
        <Text style={styles.label}>Title:</Text>
        <Text style={styles.value}>{task.title}</Text>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{task.description || 'No description provided'}</Text>
        <Text style={styles.label}>Due Date:</Text>
        <Text style={styles.value}>{task.dueDate}</Text>
        <Text style={styles.label}>Priority:</Text>
        <Text style={styles.value}>{task.priority}</Text>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{task.status}</Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleDeleteTask}>
          <Text style={styles.buttonText}>Delete Task</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.editButton]} onPress={handleEditTask}>
          <Text style={styles.buttonText}>Edit Task</Text>
        </TouchableOpacity>
      </View>
      <AppAlert
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        title={isDelete ? 'Delete Task' : 'Status'}
        message={alertMessage}
        options={isDelete ? ['Yes', 'No'] : []}
        onSelect={option => {
          if (option === 'Yes') {
            confirmDelete();
            setAlertVisible(false);
          } else {
            setAlertVisible(false);
          }
        }}
      />
      <AppLoader
        visible={loading} // Show loader based on loading state
        message="Deleting task, please wait..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  SingleTodoImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  label: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-SemiBold',
    color: "#bc8f8f",
    marginTop: 15,
  },
  value: {
    fontSize: 17,
    fontFamily: 'TitilliumWeb-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,

  },
  button: {
    backgroundColor: '#d9534f', // Red color for delete button
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#0275d8', 
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'TitilliumWeb-SemiBold',
  },
});

export default TaskDetails;
