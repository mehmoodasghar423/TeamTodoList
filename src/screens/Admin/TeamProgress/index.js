import React from 'react';
import { View, Text, FlatList } from 'react-native';
import AppLoader from '../../../components/AppLoader';
import Title from '../../../components/Title';
import useTeamProgress from '../../../hooks/useTeamProgress';
import styles from './styles';

// Utility function to truncate text
const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text;
};

const TeamProgress = () => {
  const { teamProgress, loading, error, mvp } = useTeamProgress();

  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Title text="Whole Team Progress" />
      <Text style={[styles.mvpText, { marginBottom: 0 }]}>
        Most Valuable Team Member:
      </Text>
      {mvp && (
        <Text style={styles.mvpText}>
          {truncateText(mvp.name, 14)} ({mvp.completedTasks} tasks completed)
        </Text>
      )}
      <FlatList
        data={teamProgress}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <View style={styles.progressItem}>
            <Text style={styles.userName}>
              {truncateText(item.name, 12)}
            </Text>
            <Text style={styles.completedTasks}>
              {item.completedTasks} Tasks Completed
            </Text>
          </View>
        )}
        showsVerticalScrollIndicator={false} 
      />
      <AppLoader visible={loading} message="Loading, please wait..." />
    </View>
  );
};

export default TeamProgress;
