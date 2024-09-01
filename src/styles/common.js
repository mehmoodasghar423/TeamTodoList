
import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'TitilliumWeb-Bold',
  },
  signupImage: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  loading: {
    marginTop: 20,
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

export default commonStyles;
