// styles.js
import { StyleSheet } from 'react-native';

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
    color: "#bc8f8f",
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
    color:"#bc8f8f",
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

export default styles;
