import React from 'react';
import { Modal, View, FlatList, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';

const AssignTaskModal = ({ visible, users, onClose, onSelectMember }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay} />
      <View style={styles.modalContainer}>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onSelectMember(item)} style={styles.memberItem}>
              <Text style={styles.memberName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false} 
        />
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    marginTop: '50%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 0,
  },
  memberItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  memberName: {
    fontSize: 16,
    fontFamily: 'TitilliumWeb-SemiBold',

  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#FF5733',
    borderRadius: 20,
    justifyContent:"center",
    alignItems:"center"
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'TitilliumWeb-Bold',
  },
});

export default AssignTaskModal;
