import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingHorizontal:10,
    backgroundColor: 'white',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width:"100%",
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    paddingHorizontal:16
  },
  selectedFilter: {
    backgroundColor: '#4169e1',
  },
  selectedFilterText: {
    color: '#fff',
  },
  filterText: {
    fontSize: 14,
    color: '#4169e1',
    fontFamily: 'TitilliumWeb-SemiBold',
  },
  taskItemContainer: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskImage: {
    width: 50,
    height: 60,
    resizeMode: 'contain',
  },
  taskDetails: {
    marginLeft: 10,
  },
  taskDetails2: {
    position: 'absolute',
    right: 2,
    width: '23%',
  },
  taskTitle: {
    fontSize: 18,
    fontFamily: 'TitilliumWeb-SemiBold',
    color: '#bc8f8f',
  },
  taskDueDate: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'TitilliumWeb-Regular',
  },
  taskPriority: {
    fontSize: 14,
    color: '#777',
    fontFamily: 'TitilliumWeb-Regular',
  },
  taskUserName: {
    fontSize: 14,
    color: '#007BFF',
    fontFamily: 'TitilliumWeb-Regular',
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'TitilliumWeb-Regular',
  },
  noTasksText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'TitilliumWeb-SemiBold',
  },
});
