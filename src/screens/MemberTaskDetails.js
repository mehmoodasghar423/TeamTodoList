import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import images from '../images';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MemberTaskDetails = ({ route }) => {
  const { task } = route.params; 
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

  return (
    <View style={styles.container}>
      <Image source={images.SingleTodo} style={styles.SingleTodoImage} /> 

      <Text style={styles.label}>Title:</Text>
      <Text style={styles.value}>{task.title}</Text>
      <Text style={styles.label}>Description:</Text>
      <Text style={styles.value}>{task.description || 'No description provided'}</Text>
      <Text style={styles.label}>Due Date:</Text>
      <Text style={styles.value}>{task.dueDate}</Text>
      <Text style={styles.label}>Status:</Text>
      <Text style={[styles.value,{color:"green"}]}>{taskStatus}</Text>

      <TouchableOpacity onPress={toggleTaskStatus} style={styles.checkbox}>
        <Icon
          name={taskStatus === 'Complete' ? 'check-box' : 'check-box-outline-blank'}
          size={30}
          color={taskStatus === 'Complete' ? '#4caf50' : '#777'}
        />
        <Text style={styles.checkboxText}>
          {taskStatus === 'Complete' ? 'Mark as Incomplete' : 'Mark as Complete'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-SemiBold',
    color:"#bc8f8f",
    marginTop: 15,
  },
  value: {
    fontSize: 17,
    fontFamily: 'TitilliumWeb-Regular',
  },
  SingleTodoImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  checkboxText: {
    fontSize: 20,
    marginLeft: 10,
    fontFamily: 'TitilliumWeb-SemiBold',
    color:"green"
  },
});

export default MemberTaskDetails;
