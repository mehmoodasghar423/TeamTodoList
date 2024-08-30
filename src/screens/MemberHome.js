import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MemberHome = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('tasks')
      .where('assignedTo', '==', auth().currentUser.uid)
      .onSnapshot(
        snapshot => {
          const taskList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTasks(taskList);
          console.log("tasks",tasks);
          
          setLoading(false);
        },
        err => {
          console.error('Error fetching tasks:', err);
          setError('Failed to fetch tasks');
          setLoading(false);
        }
      );

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  const toggleTaskStatus = async (taskId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'complete' ? 'incomplete' : 'complete';

      // Update task status in Firestore
      await firestore().collection('tasks').doc(taskId).update({
        status: newStatus,
      });

      // No need to update local state since Firestore will handle it
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  };

  const handleTaskPress = (task) => {
    navigation.navigate('MemberTaskDetails', { task });
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Member Home</Text>
      <Text style={styles.title}>Task Assigned to You</Text>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTaskPress(item)} style={styles.taskItem}>
            <TouchableOpacity onPress={() => toggleTaskStatus(item.id, item.status)} style={styles.checkbox}>
              <Icon
                name={item.status === 'complete' ? 'check-box' : 'check-box-outline-blank'}
                size={35}
                color={item.status === 'complete' ? '#4caf50' : '#777'}
              />
            </TouchableOpacity>
            <View style={styles.taskInfo}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskDueDate}>{item.dueDate}</Text>
              <Text style={styles.taskStatus}>{item.status}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontFamily:"TitilliumWeb-SemiBold"
  },
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
  },
  taskInfo: {
    marginLeft: 10,
  },
  taskTitle: {
    fontSize: 18,
  },
  taskDueDate: {
    fontSize: 16,
    color: '#555',
  },
  taskStatus: {
    fontSize: 16,
    color: '#777',
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
  },
});

export default MemberHome;
