import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assuming you're using Material Icons
import CustomButton from '../components/CustomButton';

const AdminHome = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchTasksAndUsers = async () => {
      try {
        // Fetch tasks
        const tasksSnapshot = await firestore().collection('tasks').get();
        const taskList = tasksSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Fetch users
        const usersSnapshot = await firestore().collection('Users').get();
        const userList = usersSnapshot.docs.reduce((acc, doc) => {
          acc[doc.id] = doc.data().name; // Use doc.id as the key to match assignedTo field
          return acc;
        }, {});

        // Map user names to tasks
        const tasksWithUserNames = taskList.map(task => ({
          ...task,
          userName: userList[task.assignedTo] || 'Unknown User'
        }));

        setTasks(tasksWithUserNames);
        setFilteredTasks(tasksWithUserNames);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasksAndUsers();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [filter, tasks]);

  const applyFilter = () => {
    let filtered = [...tasks];
    
    switch (filter) {
      case 'Due Date':
        filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        break;
      case 'Priority':
        filtered.sort((a, b) => {
          if (a.priority === 'High' && b.priority !== 'High') return -1;
          if (a.priority !== 'High' && b.priority === 'High') return 1;
          return 0;
        });
        break;
      case 'Assigned User':
        filtered.sort((a, b) => a.userName.localeCompare(b.userName));
        break;
      case 'Completed':
        filtered = filtered.filter(task => task.status === 'complete');
        break;
      default:
        break;
    }
    
    setFilteredTasks(filtered);
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  const handleTaskPress = (task) => {
    navigation.navigate('TaskDetails', { task });
  };

  const handleTeamProgress = () => {
    navigation.navigate('TeamProgress');
  };

  const handleFilter = (filterType) => {
    setFilter(filterType);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Home</Text>
      <CustomButton title="Team Progress" onPress={handleTeamProgress} />

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'All' && styles.selectedFilter]}
          onPress={() => handleFilter('All')}>
          <Icon name="task" size={24} color={filter === 'All' ? "#fff" : "#007BFF"} />
          <Text style={[styles.filterText, filter === 'All' && styles.selectedFilterText]}>All Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'Due Date' && styles.selectedFilter]}
          onPress={() => handleFilter('Due Date')}>
          <Icon name="date-range" size={24} color={filter === 'Due Date' ? "#fff" : "#007BFF"} />
          <Text style={[styles.filterText, filter === 'Due Date' && styles.selectedFilterText]}>Due Date</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'Priority' && styles.selectedFilter]}
          onPress={() => handleFilter('Priority')}>
          <Icon name="priority-high" size={24} color={filter === 'Priority' ? "#fff" : "#007BFF"} />
          <Text style={[styles.filterText, filter === 'Priority' && styles.selectedFilterText]}>Priority</Text>
        </TouchableOpacity>
       
        <TouchableOpacity
          style={[styles.filterButton, filter === 'Completed' && styles.selectedFilter]}
          onPress={() => handleFilter('Completed')}>
          <Icon name="check-circle" size={24} color={filter === 'Completed' ? "#fff" : "#007BFF"} />
          <Text style={[styles.filterText, filter === 'Completed' && styles.selectedFilterText]}>Completed</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTaskPress(item)} style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDueDate}>{item.dueDate}</Text>
            <Text style={styles.taskStatus}>{item.status}</Text>
            <Text style={styles.taskUserName}>Assigned to: {item.userName}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Add Task Button with Icon */}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreateTask')}>
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
      
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 20,
  },
  filterButton: {
    alignItems: 'center',
  },
  selectedFilter: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  selectedFilterText: {
    color: '#fff',
  },
  filterText: {
    fontSize: 14,
    color: '#007BFF',
    fontFamily: "TitilliumWeb-Regular",
  },
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
  taskUserName: {
    fontSize: 16,
    color: '#007BFF',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
  },
});

export default AdminHome;
