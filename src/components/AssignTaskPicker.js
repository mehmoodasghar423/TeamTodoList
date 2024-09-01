import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AssignTaskPicker = ({ selectedMember, setShowMembers }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.fieldLabel}>Assign Task To</Text>
    <TouchableOpacity onPress={() => setShowMembers(true)}>
      <Text style={styles.fieldValue}>
        {selectedMember ? selectedMember.name : 'Select Member'}
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
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

export default AssignTaskPicker;
