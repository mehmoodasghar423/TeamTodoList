import React from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../../images';
import AppAlert from '../../../components/AppAlert';
import styles from './styles'; 
import useLogout from '../../../hooks/useLogout';
import useTasks from '../../../hooks/useTasks';
import useFetchUserData from '../../../hooks/useFetchUserData';
import AppLoader from '../../../components/AppLoader';

const MemberHome = ({ navigation }) => {
  const { tasks, loading: tasksLoading, error: tasksError, toggleTaskStatus } = useTasks();
  const { userName, loading: userLoading, error: userError } = useFetchUserData();
  const { logout } = useLogout();
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleTaskPress = (task) => {
    navigation.navigate('MemberTaskDetails', { task });
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  if (tasksLoading || userLoading) return <AppLoader />;
  if (tasksError) return <Text style={styles.errorText}>{tasksError}</Text>;
  if (userError) return <Text style={styles.errorText}>{userError}</Text>;

  return (
    <View style={styles.container}>
      <Image source={images.MemberHome} style={styles.memberHomeImage} />

      <Text style={styles.headerTitle}>Member Account</Text>
      <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
      <Text style={styles.subHeaderTitle}>Tasks Assigned to You</Text>

      {tasks.length === 0 ? (
        <Text style={styles.noTasksText}>No tasks assigned yet.</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleTaskPress(item)} style={styles.taskItemContainer}>
              <Image source={images.SingleTodo} style={styles.taskImage} />

              <View style={styles.taskDetails}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text style={styles.taskDueDate}>{item.dueDate}</Text>
              </View>
              <TouchableOpacity onPress={() => toggleTaskStatus(item.id, item.status)} style={styles.checkboxContainer}>
                <Icon
                  name={item.status === 'complete' ? 'check-box' : 'check-box-outline-blank'}
                  size={30}
                  color={item.status === 'complete' ? '#4caf50' : '#777'}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <AppAlert
        visible={modalVisible}
        onClose={handleModalClose}
        title="Logout Confirmation"
        message="Are you sure you want to logout?"
        options={['Yes', 'No']}
        onSelect={(option) => {
          if (option === 'Yes') {
            logout();
            handleModalClose();
          } else {
            handleModalClose();
          }
        }}
      />
    </View>
  );
};

export default MemberHome;
