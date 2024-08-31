import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AppLoader from '../components/AppLoader';
import images from '../images'; // Ensure you have images imported correctly
import Title from '../components/Title';

const AdminAllTasks = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All'); // Default active button

  useEffect(() => {
    const unsubscribeTasks = firestore()
      .collection('tasks')
      .onSnapshot(
        snapshot => {
          const taskList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Update task names with user names
          const unsubscribeUsers = firestore()
            .collection('Users')
            .onSnapshot(usersSnapshot => {
              const userList = usersSnapshot.docs.reduce((acc, doc) => {
                acc[doc.id] = doc.data().name;
                return acc;
              }, {});

              const tasksWithUserNames = taskList.map(task => ({
                ...task,
                userName: userList[task.assignedTo] || 'Unknown User',
              }));

              setTasks(tasksWithUserNames);
              setFilteredTasks(tasksWithUserNames);
              setLoading(false);
            }, err => {
              console.error('Error fetching users:', err);
              setError('Failed to fetch users');
              setLoading(false);
            });

          return () => unsubscribeUsers();
        },
        err => {
          console.error('Error fetching tasks:', err);
          setError('Failed to fetch tasks');
          setLoading(false);
        }
      );

    return () => unsubscribeTasks();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [filter, tasks]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  const truncateText = (text, length) => {
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

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

  if (loading) return <AppLoader message="Loading, please wait..." />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  const handleTaskPress = task => {
    navigation.navigate('TaskDetails', { task });
  };

  const handleFilter = filterType => {
    setFilter(filterType);
  };

  return (
    <View style={styles.container}>
      <Title text='All Tasks ' />
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'All' && styles.selectedFilter,
          ]}
          onPress={() => handleFilter('All')}>
          <Text
            style={[
              styles.filterText,
              filter === 'All' && styles.selectedFilterText,
            ]}>
            All Tasks
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'Due Date' && styles.selectedFilter,
          ]}
          onPress={() => handleFilter('Due Date')}>
          <Text
            style={[
              styles.filterText,
              filter === 'Due Date' && styles.selectedFilterText,
            ]}>
            Due Date
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'Priority' && styles.selectedFilter,
          ]}
          onPress={() => handleFilter('Priority')}>
          <Text
            style={[
              styles.filterText,
              filter === 'Priority' && styles.selectedFilterText,
            ]}>
            Priority
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'Completed' && styles.selectedFilter,
          ]}
          onPress={() => handleFilter('Completed')}>
          <Text
            style={[
              styles.filterText,
              filter === 'Completed' && styles.selectedFilterText,
            ]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {filteredTasks.length === 0 ? (
        <Text style={styles.noTasksText}>No tasks available</Text>
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleTaskPress(item)}
              style={styles.taskItemContainer}>
              <Image source={images.SingleTodo} style={styles.taskImage} />
              <View style={styles.taskDetails}>
                <Text style={styles.taskTitle}>
                  {truncateText(item.title, 10)}
                </Text>
                <Text style={styles.taskUserName}>
                  Assigned to: {truncateText(item.userName, 12)}
                </Text>
              </View>
              <View style={styles.taskDetails2}>
                <Text style={styles.taskDueDate}>
                  {formatDate(item.dueDate)}
                </Text>
                <Text style={styles.taskPriority}>
                  {filter === 'Priority' ? item.priority : item.status}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 20,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  selectedFilter: {
    backgroundColor: '#4169e1',
  },
  selectedFilterText: {
    color: '#fff',
  },
  filterText: {
    fontSize: 14,
    color: '#4169e1',
    fontFamily: 'TitilliumWeb-SemiBold',
  },
  taskItemContainer: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskImage: {
    width: 50,
    height: 60,
    resizeMode: 'contain',
  },
  taskDetails: {
    marginLeft: 10,
  },
  taskDetails2: {
    position: 'absolute',
    right: 2,
    width: '23%',
  },
  taskTitle: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-SemiBold',
    color: '#bc8f8f',
  },
  taskDueDate: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'TitilliumWeb-Regular',
  },
  taskPriority: {
    fontSize: 14,
    color: '#777',
    fontFamily: 'TitilliumWeb-Regular',
  },
  taskUserName: {
    fontSize: 14,
    color: '#007BFF',
    fontFamily: 'TitilliumWeb-Regular',
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'TitilliumWeb-Regular',
  },
  noTasksText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'TitilliumWeb-SemiBold',
  },
});

export default AdminAllTasks;
