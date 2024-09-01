import React from 'react';
import { Text, StyleSheet } from 'react-native';
import GlobalTextInput from './GlobalTextInput';
const TaskTitleInput = ({ value, onChange }) => (
  <>
    <Text style={styles.label}>Task Title</Text>
    <GlobalTextInput
      style={styles.input}
      placeholder="Enter task title"
      value={value}
      onChangeText={onChange}
    />
  </>
);

const styles = StyleSheet.create({
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
});

export default TaskTitleInput;
