import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MemberTaskDetails = ({ route }) => {
  const { task } = route.params; // Get task data from route params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Details</Text>
      <Text style={styles.label}>Title:</Text>
      <Text style={styles.value}>{task.title}</Text>
      <Text style={styles.label}>Due Date:</Text>
      <Text style={styles.value}>{task.dueDate}</Text>
      <Text style={styles.label}>Status:</Text>
      <Text style={styles.value}>{task.status}</Text>
      <Text style={styles.label}>Description:</Text>
      <Text style={styles.value}>{task.description || 'No description provided'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
  },
});

export default MemberTaskDetails;
