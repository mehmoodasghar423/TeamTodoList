import { useNavigation } from '@react-navigation/native'; 
import auth from '@react-native-firebase/auth'; 

const useLogout = () => {
  const navigation = useNavigation();

  const logout = async () => {
    try {
    //   await auth().signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth', state: { routes: [{ name: 'WelcomeScreen' }] } }],
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return { logout };
};

export default useLogout;
