import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const AppAlert = ({ visible, onClose, title, message, options, onSelect, closeButtonText }) => {
  const renderOption = ({ item }) => (
    <TouchableOpacity onPress={() => onSelect(item)} style={styles.optionButton}>
      <Text style={styles.optionText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          {message && <Text style={styles.message}>{message}</Text>}
          
          {options && (
            <FlatList
              data={options}
              renderItem={renderOption}
              keyExtractor={(item) => item}
              style={styles.optionsList}
            />
          )}
          
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>
              {closeButtonText || 'Ok'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'TitilliumWeb-SemiBold',
  },
  optionsList: {
    width: '100%',
    marginBottom: 20,
  },
  optionButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'TitilliumWeb-SemiBold',
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#FF5733',
    borderRadius: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'TitilliumWeb-Bold',
  },
});

export default AppAlert;
