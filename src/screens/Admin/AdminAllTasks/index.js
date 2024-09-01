import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import AppLoader from '../../../components/AppLoader';
import Title from '../../../components/Title';
import images from '../../../images';
import styles from './styles';
import useFetchTasks from '../../../hooks/useFetchTasks';
import useFetchUsers from '../../../hooks/useFetchUsers'; 

const AdminAllTasks = ({ navigation }) => {
  const { tasks, loading: tasksLoading, error: tasksError } = useFetchTasks();
  const { users, loading: usersLoading, error: usersError } = useFetchUsers();
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (!tasksLoading && !usersLoading) {
      const tasksWithUserNames = tasks.map(task => ({
        ...task,
        userName: users[task.assignedTo] || 'Unknown User',
      }));
      setFilteredTasks(tasksWithUserNames);
    }
  }, [tasks, users, tasksLoading, usersLoading]);

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

  const formatDate = dateString => {
    const date = new Date(dateString);
    const options = { month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  const truncateText = (text = '', length) => {
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };
  

  if (tasksLoading || usersLoading) return <AppLoader message="Loading, please wait..." />;
  if (tasksError || usersError) return <Text style={styles.error}>{tasksError || usersError}</Text>;

  const handleTaskPress = task => {
    navigation.navigate('TaskDetails', { task });
  };

  const handleFilter = filterType => {
    setFilter(filterType);
  };

  return (
    <View style={styles.container}>
      <Title text="All Tasks" />
      <View style={styles.filterContainer}>
        {['All', 'Due Date', 'Priority', 'Completed'].map(filterType => (
          <TouchableOpacity
            key={filterType}
            style={[styles.filterButton, filter === filterType && styles.selectedFilter]}
            onPress={() => handleFilter(filterType)}>
            <Text
              style={[
                styles.filterText,
                filter === filterType && styles.selectedFilterText,
              ]}>
              {filterType}
            </Text>
          </TouchableOpacity>
        ))}
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
                <Text style={styles.taskDueDate}>{formatDate(item.dueDate)}</Text>
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

export default AdminAllTasks;
