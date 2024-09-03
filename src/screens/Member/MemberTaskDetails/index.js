import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import images from '../../../images';
import CheckBox from '../../../components/CheckBox';
import TaskField from '../../../components/TaskField';
import { useToggleTaskStatus } from '../../../hooks/useToggleTaskStatus'; 
import styles from './styles'; 

const MemberTaskDetails = ({ route }) => {
  const { task } = route.params;
  const { taskStatus, toggleTaskStatus } = useToggleTaskStatus(task);

  return (
    <View style={styles.container}>
      <Image source={images.SingleTodo} style={styles.SingleTodoImage} />

      <TaskField label="Title:" value={task.title} />
      <TaskField label="Description:" value={task.description || 'No description provided'} />
      <TaskField label="Due Date:" value={task.dueDate} />
      <TaskField label="Priority:" value={task.priority} />
      <TaskField label="Status:" value={taskStatus} />

      <TouchableOpacity onPress={toggleTaskStatus} style={styles.checkboxContainer}>
        <CheckBox
          checked={taskStatus === 'Complete'}
          onPress={toggleTaskStatus}
          borderColor="green"
          backgroundColor="green"
        />
        <Text style={styles.checkboxText}>
          {taskStatus === 'Complete' ? 'Mark as Uncomplete' : 'Mark as Complete'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MemberTaskDetails;
