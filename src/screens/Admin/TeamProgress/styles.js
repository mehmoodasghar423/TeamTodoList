import { StyleSheet,  } from 'react-native';

export default  styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    progressItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      flexDirection:"row",
      justifyContent:"space-between"
    },
    userName: {
      fontSize: 18,
      fontFamily:"TitilliumWeb-SemiBold",
    },
    completedTasks: {
      fontSize: 16,
      color: '#555',
      fontFamily:"TitilliumWeb-Regular",
      
    },
    mvpText: {
      fontSize: 18,
  fontFamily:"TitilliumWeb-SemiBold",
      color: '#28a745',
      marginBottom: 10,
      textAlign: 'center',
    },
    error: {
      color: 'red',
      fontSize: 16,
      marginTop: 20,
      textAlign: 'center',
    },
  });