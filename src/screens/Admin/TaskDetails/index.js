import React from 'react';
import { View, Image, ScrollView, TouchableOpacity,Text } from 'react-native';
import images from '../../../images';
import AppAlert from '../../../components/AppAlert';
import AppLoader from '../../../components/AppLoader';
import styles from './styles';
import useAdminTaskDetails from '../../../hooks/useAdminTaskDetails';
import TaskField from '../../../components/TaskField';

const AdminTaskDetails = ({ route }) => {
  const { task } = route.params;
  const {
    alertVisible,
    alertMessage,
    isDelete,
    loading,
    setAlertVisible,
    handleDeleteTask,
    confirmDelete,
    handleEditTask,
  } = useAdminTaskDetails(task);

  return (
    <View style={styles.container}>
      <Image source={images.SingleTodo} style={styles.SingleTodoImage} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TaskField label="Assigned to:" value={task.userName} />
        <TaskField label="Title:" value={task.title} />
        <TaskField label="Description:" value={task.description} />
        <TaskField label="Due Date:" value={task.dueDate} />
        <TaskField label="Priority:" value={task.priority} />
        <TaskField label="Status:" value={task.status} />
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
        onSelect={(option) => option === 'Yes' && confirmDelete()}
      />
      <AppLoader visible={loading} message="Deleting task, please wait..." />
    </View>
  );
};

export default AdminTaskDetails;
