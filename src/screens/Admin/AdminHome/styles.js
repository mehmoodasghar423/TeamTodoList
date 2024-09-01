import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  GoBackIcon: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
  },
  goBackContainer: {
    padding: 10, 
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'TitilliumWeb-SemiBold',
    color: '#333',
    alignSelf: 'center',
    marginTop: -20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default styles;
