import voterListReducer from './VoterListReducer';
import appReducer from './AppReducer';
import taskListReducer from './TasksReducer';
import userReducer from './UserReducer';
import passwordRequestReducer from './PasswordRequestReducer';
import errorReducer from './ErrorReducer';

//this is where you insert your reducers into the store
export default  {
    app: appReducer,
    voterList: voterListReducer,
    taskList: taskListReducer,
    user: userReducer,
    request: passwordRequestReducer,
    error: errorReducer
}