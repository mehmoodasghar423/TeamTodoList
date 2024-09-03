import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  SingleTodoImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  checkboxText: {
    fontSize: 20,
    marginLeft: 10,
    fontFamily: 'TitilliumWeb-SemiBold',
    color: 'green',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginTop:20
  },
});

export default styles;
