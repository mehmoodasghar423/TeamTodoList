import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';

const DueDatePicker = ({ date, setDate, open, setOpen }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.fieldLabel}>Due Date</Text>
    <TouchableOpacity onPress={() => setOpen(true)}>
      <Text style={styles.fieldValue}>
        {date ? date.toDateString() : 'Select a Date'}
      </Text>
    </TouchableOpacity>
    <DatePicker
      modal
      open={open}
      date={date || new Date()}
      onConfirm={(selectedDate) => {
        setOpen(false);
        setDate(selectedDate);
      }}
      onCancel={() => setOpen(false)}
    />
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

export default DueDatePicker;
