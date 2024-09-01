import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  SingleTodoImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  label: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-SemiBold',
    color: '#bc8f8f',
    marginTop: 15,
  },
  value: {
    fontSize: 17,
    fontFamily: 'TitilliumWeb-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#d9534f',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#0275d8',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'TitilliumWeb-SemiBold',
  },
});
