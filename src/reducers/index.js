import voterReducer from './VoterReducer';
import voterListReducer from './VoterListReducer';
import appReducer from './AppReducer';
import taskListReducer from './TasksReducer';

//this is where you insert your reducers into the store
export default  {
    app: appReducer,
    voter: voterReducer,
    voterList: voterListReducer,
    taskList: taskListReducer
}