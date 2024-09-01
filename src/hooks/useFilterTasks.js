import { useState, useEffect } from 'react';

const useFilterTasks = (tasks, users, filter) => {
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const tasksWithUserNames = tasks.map(task => ({
      ...task,
      userName: users[task.assignedTo] || 'Unknown User',
    }));
    console.log('Tasks with user names:', tasksWithUserNames); 

    setFilteredTasks(tasksWithUserNames);
  }, [tasks, users]);

  useEffect(() => {
    applyFilter();
  }, [filter, tasks, users]);

  const applyFilter = () => {
    let filtered = [...tasks];

    switch (filter) {
      case 'Due Date':
        filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        break;
      case 'Priority':
        filtered.sort((a, b) => {
          if (a.priority === 'High' && b.priority !== 'High') return -1;
          if (a.priority !== 'High' && b.priority === 'High') return 1;
          return 0;
        });
        break;
      case 'Assigned User':
        filtered.sort((a, b) => {
          const userA = users[a.assignedTo] || 'Unknown User';
          const userB = users[b.assignedTo] || 'Unknown User';
          return userA.localeCompare(userB);
        });
        break;
      case 'Completed':
        filtered = filtered.filter(task => task.status === 'complete');
        break;
      default:
        break;
    }

    setFilteredTasks(filtered);
  };

  
  // Map usernames to tasks
  const tasksWithUserNames = filteredTasks.map(task => ({
    ...task,
    userName: users[task.assignedTo] || 'Unknown User',
  }));

  return { filteredTasks: tasksWithUserNames };
};

export default useFilterTasks;
