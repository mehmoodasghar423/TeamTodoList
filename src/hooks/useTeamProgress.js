import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

const useTeamProgress = () => {
  const [teamProgress, setTeamProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mvp, setMVP] = useState(null);

  useEffect(() => {
    const unsubscribeUsers = firestore()
      .collection('Users')
      .where('role', '==', 'Member')
      .onSnapshot(
        async (usersSnapshot) => {
          try {
            const userList = usersSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            const unsubscribeTasks = userList.map((user) => {
              return firestore()
                .collection('tasks')
                .where('assignedTo', '==', user.id)
                .where('status', '==', 'Complete')
                .onSnapshot(
                  (tasksSnapshot) => {
                    const completedTasksCount = tasksSnapshot.size;

                    setTeamProgress((prevProgress) => {
                      const updatedProgress = prevProgress.map((progress) =>
                        progress.id === user.id
                          ? { ...progress, completedTasks: completedTasksCount }
                          : progress
                      );

                      const topPerformer = updatedProgress.reduce((prev, current) =>
                        prev.completedTasks > current.completedTasks ? prev : current
                      );

                      setMVP(topPerformer);
                      return updatedProgress;
                    });
                  },
                  (err) => {
                    console.error('Error fetching tasks:', err);
                  }
                );
            });

            setTeamProgress(
              userList.map((user) => ({
                id: user.id,
                name: user.name || 'Unknown User',
                completedTasks: 0, 
              }))
            );

            setLoading(false);

            // Clean up task listeners
            return () => {
              unsubscribeTasks.forEach((unsubscribe) => unsubscribe());
            };
          } catch (err) {
            setError(err.message);
            setLoading(false);
          }
        },
        (err) => {
          setError(err.message);
          setLoading(false);
        }
      );

    return () => unsubscribeUsers(); 
  }, []);

  return { teamProgress, loading, error, mvp };
};

export default useTeamProgress;
