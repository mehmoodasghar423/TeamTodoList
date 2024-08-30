import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const TeamProgress = () => {
  const [teamProgress, setTeamProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mvp, setMVP] = useState(null); // State to store the Most Valuable Team Member

  useEffect(() => {
    const fetchTeamProgress = async () => {
      try {
        // Fetch all users with role 'Member'
        const usersSnapshot = await firestore()
          .collection('Users')
          .where('role', '==', 'Member')
          .get();

        const userList = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Fetch completed tasks for each member
        const teamProgressData = await Promise.all(
          userList.map(async user => {
            const tasksSnapshot = await firestore()
              .collection('tasks')
              .where('assignedTo', '==', user.id)
              .where('status', '==', 'complete')
              .get();

            return {
              name: user.name || 'Unknown User',
              completedTasks: tasksSnapshot.size,
            };
          })
        );

        // Find the member with the most completed tasks
        const topPerformer = teamProgressData.reduce((prev, current) =>
          prev.completedTasks > current.completedTasks ? prev : current
        );

        // Set the team progress and MVP
        setTeamProgress(teamProgressData);
        setMVP(topPerformer);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamProgress();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Team Progress</Text>
      <Text style={[styles.mvpText,{marginBottom:0}]}> Most Valuable Team Member: </Text>

      {mvp && (
        <Text style={styles.mvpText}>{mvp.name} ({mvp.completedTasks} completed tasks) </Text>
       
      )}

      <FlatList
        data={teamProgress}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <View style={styles.progressItem}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.completedTasks}>Completed Tasks: {item.completedTasks}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
  },
  progressItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    fontSize: 18,
  },
  completedTasks: {
    fontSize: 16,
    color: '#555',
  },
  mvpText: {
    fontSize: 18,
fontFamily:"TitilliumWeb-SemiBold",
    color: '#28a745',
    marginBottom: 10,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default TeamProgress;
