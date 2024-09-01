import React from 'react';
import { View } from 'react-native';
import Title from '../../../components/Title';
import PrimaryButton from '../../../components/PrimaryButton';
import AssignTaskModal from '../../../components/AssignTaskModal';
import AppAlert from '../../../components/AppAlert';
import useCreateTask from '../../../hooks/useCreateTask';
import TaskTitleInput from '../../../components/TaskTitelInput';
import TaskDescriptionInput from '../../../components/TaskDescriptionInput';
import DueDatePicker from '../../../components/DueDatePicker';
import PriorityPicker from '../../../components/PriorityPicker';
import AssignTaskPicker from '../../../components/AssignTaskPicker';

import styles from './styles';

const CreateTask = ({ navigation }) => {
  const {
    date,
    setDate,
    open,
    setOpen,
    users,
    showMembers,
    setShowMembers,
    selectedMember,
    taskTitle,
    setTaskTitle,
    taskDescription,
    setTaskDescription,
    priority,
    loading,
    modalVisible,
    setModalVisible,
    modalMessage,
    priorityModalVisible,
    setPriorityModalVisible,
    handleMemberPress,
    handlePrioritySelect,
    handleSubmit,
  } = useCreateTask(navigation);

  return (
    <View style={styles.container}>
      <Title text="Create a New Task" />

      <TaskTitleInput value={taskTitle} onChange={setTaskTitle} />
      <TaskDescriptionInput value={taskDescription} onChange={setTaskDescription} />
      <DueDatePicker date={date} setDate={setDate} open={open} setOpen={setOpen} />
      <PriorityPicker priority={priority} setPriorityModalVisible={setPriorityModalVisible} />
      <AssignTaskPicker selectedMember={selectedMember} setShowMembers={setShowMembers} />

      <PrimaryButton
        title={loading ? 'Creating...' : 'Create Task'}
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

export default CreateTask;
