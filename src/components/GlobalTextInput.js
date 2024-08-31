import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const GlobalTextInput = ({ placeholder, value, onChangeText, secureTextEntry = false, keyboardType = 'default' }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15,
    height:47,
    fontSize:16,
    fontFamily: 'TitilliumWeb-Regular',
    color:"black"

  },
});

export default GlobalTextInput;
