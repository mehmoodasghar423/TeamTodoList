import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
    fontFamily: 'TitilliumWeb-SemiBold',
    color: 'grey',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    fontFamily: 'TitilliumWeb-Regular',
    color: 'black',
  },
  fieldContainer: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldLabel: {
    fontSize: 16,
    fontFamily: 'TitilliumWeb-SemiBold',
    color: 'grey',
  },
  fieldValue: {
    fontSize: 16,
    fontFamily: 'TitilliumWeb-Regular',
    color: 'black',
  },
});

export default styles;
