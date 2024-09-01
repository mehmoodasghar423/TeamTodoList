import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import PrimaryButton from '../../../components/PrimaryButton';
import AppAlert from '../../../components/AppAlert';
import images from '../../../images';
import HomeImage from '../../../components/HomeImage';
import useCurrentUserName from '../../../hooks/useCurrentUserName'; 
import useLogout from '../../../hooks/useLogout'; 
import Title from '../../../components/Title';
import styles from './styles'; 

const AdminHome = () => {
  const [modalVisible, setModalVisible] = useState(false); 
  const navigation = useNavigation();
  const { userName, loading, error } = useCurrentUserName(); 
  const { logout } = useLogout(); 

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.goBackContainer}
      >
        <Image source={images.GoBackIcon} style={styles.GoBackIcon} />
      </TouchableOpacity>

      <HomeImage />
      <Title text="Admin Account" />

      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
      )}

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
        onClose={() => setModalVisible(false)} 
        title="Logout Confirmation"
        message="Are you sure you want to logout?"
        options={['Yes', 'No']}
        onSelect={(option) => {
          if (option === 'Yes') {
            logout();
          }
          setModalVisible(false); 
        }}
      />
    </View>
  );
};

export default AdminHome;
