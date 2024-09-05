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
        filtered.sort((a, b) => {
          const dateA = new Date(a.dueDate);
          const dateB = new Date(b.dueDate);
          return dateA - dateB;
        });        break;
      case 'Priority':
        filtered.sort((a, b) => {
          const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
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
        filtered = filtered.filter(task => task.status === 'Complete');
        break;
      default:
        break;
    }

    setFilteredTasks(filtered);
  };

  
  const tasksWithUserNames = filteredTasks.map(task => ({
    ...task,
    userName: users[task.assignedTo] || 'Unknown User',
  }));

  return { filteredTasks: tasksWithUserNames };
};

export default useFilterTasks;
