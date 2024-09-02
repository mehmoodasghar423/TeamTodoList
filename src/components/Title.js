import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Title = ({ text, color = "#4169e1" }) => {
  return <Text style={[styles.title, { color }]}>{text}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'TitilliumWeb-SemiBold',
  },
});

export default Title;
