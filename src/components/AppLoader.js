import React from 'react';
import { Modal, View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const AppLoader = ({ visible, message }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.message}>{message}</Text>
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
  message: {
    marginTop: 15,
    fontSize: 16,
    color: '#000',
    fontFamily: 'TitilliumWeb-SemiBold',

  },
});

export default AppLoader;
