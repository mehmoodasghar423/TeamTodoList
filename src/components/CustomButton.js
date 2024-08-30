import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, buttonStyle, textStyle, backgroundColor }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonStyle,
        { backgroundColor: backgroundColor || '#4CAF50' } 
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
    alignItems: 'center',
    width:"100%",
    marginTop:25
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'TitilliumWeb-Bold',
  },
});

export default CustomButton;
