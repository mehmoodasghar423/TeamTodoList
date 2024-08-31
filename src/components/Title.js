import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Title = ({ text, color = "#4169e1" }) => {
  return <Text style={[styles.title, { color }]}>{text}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'TitilliumWeb-Bold',
  },
});

export default Title;
