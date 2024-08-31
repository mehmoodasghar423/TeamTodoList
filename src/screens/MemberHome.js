import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../images';
import AppAlert from '../components/AppAlert';

const MemberHome = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await firestore().collection('Users').doc(auth().currentUser.uid).get();
        if (userDoc.exists) {
          setUserName(userDoc.data().name);
        } else {
          console.error('User data not found!');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, []);

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
          console.log("taskstasks",tasks);
          
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

  const handleLogout = async () => {
    try {
      // await auth().signOut(); 
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth', state: { routes: [{ name: 'WelcomeScreen' }] } }],
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  const handleModalClose = () => {
    setModalVisible(false); // Close the modal
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

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
            handleLogout();
            handleModalClose();
          } else {
            handleModalClose(); // Close the modal if 'No' is selected
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  memberHomeImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  taskImage: {
    width: 50,
    height: 60,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 28,
    marginBottom: 1,
    fontFamily: 'TitilliumWeb-SemiBold',
    color: 'green',
    alignSelf: 'center',
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'TitilliumWeb-SemiBold',
    color: '#333',
    alignSelf: 'center',
  },
  subHeaderTitle: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily: 'TitilliumWeb-SemiBold',
    marginTop: 20,
    color: "#bc8f8f"
  },
  taskItemContainer: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: 10,
    position: 'absolute',
    right: 10,
  },
  taskDetails: {
    marginLeft: 10,
  },
  taskTitle: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-SemiBold',
    color:"#bc8f8f"
  },
  taskDueDate: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'TitilliumWeb-Regular',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'TitilliumWeb-Regular',
  },
  noTasksText: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Regular',
    color: '#555',
    marginTop: 20,
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FF5733',
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'TitilliumWeb-SemiBold',
  },
});

export default MemberHome;
