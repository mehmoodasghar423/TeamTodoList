import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

const useTeamProgress = () => {
  const [teamProgress, setTeamProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mvp, setMVP] = useState(null); 

  useEffect(() => {
    const fetchTeamProgress = async () => {
      try {
        const usersSnapshot = await firestore()
          .collection('Users')
          .where('role', '==', 'Member')
          .get();

        const userList = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

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

        const topPerformer = teamProgressData.reduce((prev, current) =>
          prev.completedTasks > current.completedTasks ? prev : current
        );

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

  return { teamProgress, loading, error, mvp };
};

export default useTeamProgress;
