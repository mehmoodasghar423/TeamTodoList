import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import auth from '@react-native-firebase/auth'; // Import Firebase Authentication
import firestore from '@react-native-firebase/firestore'; // Import Firestore
import PrimaryButton from '../components/PrimaryButton';
import images from '../images';
import AppAlert from '../components/AppAlert'; // Import AppAlert

const AdminHome = () => {
  const [userName, setUserName] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        // Get the current user ID from Firebase Authentication
        const userId = auth().currentUser.uid;
        if (userId) {
          // Fetch the user's name from Firestore
          const userDoc = await firestore().collection('Users').doc(userId).get();
          if (userDoc.exists) {
            setUserName(userDoc.data().name); // Assuming the name field in Firestore is 'name'
          }
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    fetchUserName();
  }, []);

  const handleGoBack = () => {
    setModalVisible(true); // Show the modal when the GoBackIcon is clicked
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

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.goBackContainer}>
        <Image source={images.GoBackIcon} style={styles.GoBackIcon} />
      </TouchableOpacity>

      <Image source={images.MemberHome} style={styles.memberHomeImage} />

      <Text style={styles.headerTitle}>Admin Account</Text>
      <Text style={styles.welcomeText}>Welcome, {userName}!</Text> 

      <PrimaryButton title="View All Tasks" onPress={() => navigation.navigate('AdminAllTasks')} />
      <PrimaryButton
        title="Add a new Task"
        backgroundColor="#4169e1"
        buttonStyle={{ marginTop: 20 }}
        onPress={() => navigation.navigate('CreateTask')}
      />
      <PrimaryButton
        title="Check Team Progress"
        backgroundColor="#4169e1"
        buttonStyle={{ marginTop: 20 }}
        onPress={() => navigation.navigate('TeamProgress')}
      />

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
            handleModalClose(); 
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
  GoBackIcon: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
  },
  goBackContainer: {
    padding: 10, // Add padding for better touch area
  },
  headerTitle: {
    fontSize: 28,
    marginBottom: 1,
    fontFamily: 'TitilliumWeb-SemiBold',
    color: "#4169e1",
    alignSelf: 'center',
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'TitilliumWeb-SemiBold',
    color: '#333',
    alignSelf: 'center',
  },
});

export default AdminHome;
