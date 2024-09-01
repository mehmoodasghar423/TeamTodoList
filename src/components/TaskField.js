import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TaskField = ({ label, value }) => (
  <View>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);



const styles = StyleSheet.create({
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
  });
  
export default TaskField;
  