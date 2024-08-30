import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TaskDetails = ({ route }) => {
  const { task } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.title}>Assigned to :{task.userName}</Text>
      <Text style={styles.label}>Description:</Text>
      <Text style={styles.text}>{task.description}</Text>
      <Text style={styles.label}>Due Date:</Text>
      <Text style={styles.text}>{task.dueDate}</Text>
      <Text style={styles.label}>Priority:</Text>
      <Text style={styles.text}>{task.priority}</Text>
      <Text style={styles.label}>Status:</Text>
      <Text style={styles.text}>{task.status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default TaskDetails;
