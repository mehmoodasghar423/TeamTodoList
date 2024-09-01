import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Title from '../../../components/Title';
import GlobalTextInput from '../../../components/GlobalTextInput';
import AssignTaskModal from '../../../components/AssignTaskModal';
import PrimaryButton from '../../../components/PrimaryButton';
import AppAlert from '../../../components/AppAlert';
import { useEditTask } from '../../../hooks/useEditTask';
import styles from './styles';

const EditTask = ({ route, navigation }) => {
  const { task } = route.params;
  const {
    date, setDate, open, setOpen, users, showMembers, setShowMembers,
    selectedMember, handleMemberPress, taskTitle, setTaskTitle,
    taskDescription, setTaskDescription, priority, handlePrioritySelect,
    loading, handleSubmit, modalVisible, setModalVisible, modalMessage,
    priorityModalVisible, setPriorityModalVisible,
  } = useEditTask(task, navigation);

  return (
    <View style={styles.container}>
      <Title text="Edit this Task" />
      <Text style={styles.label}>Task Title</Text>
      <GlobalTextInput
        style={styles.input}
        placeholder="Enter task title"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />
      <Text style={styles.label}>Task Description</Text>
      <GlobalTextInput
        style={styles.input}
        placeholder="Enter task description"
        value={taskDescription}
        onChangeText={setTaskDescription}
      />
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
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Priority</Text>
        <TouchableOpacity onPress={() => setPriorityModalVisible(true)}>
          <Text style={styles.fieldValue}>{priority}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Assign Task To</Text>
        <TouchableOpacity onPress={() => setShowMembers(true)}>
          <Text style={styles.fieldValue}>
            {selectedMember ? selectedMember.name : 'Select Member'}
          </Text>
        </TouchableOpacity>
      </View>
      <PrimaryButton
        title={loading ? "Editing..." : "Edit Task"}
        backgroundColor="#4169e1"
        onPress={handleSubmit}
      />
      <AssignTaskModal
        visible={showMembers}
        users={users}
        onClose={() => setShowMembers(false)}
        onSelectMember={handleMemberPress}
      />
      <AppAlert
        visible={priorityModalVisible}
        title="Select Priority"
        options={['High', 'Medium', 'Low']}
        onClose={() => setPriorityModalVisible(false)}
        onSelect={handlePrioritySelect}
      />
      <AppAlert
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Alert"
        message={modalMessage}
      />
    </View>
  );
};

export default EditTask;
