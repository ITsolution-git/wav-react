import voterReducer from './VoterReducer';
import voterListReducer from './VoterListReducer';
import appReducer from './AppReducer';
import taskListReducer from './TasksReducer';
import chatsReducer from './ChatsReducer';
import messagesReducer from './MessagesReducer';
import userReducer from './UserReducer';

//this is where you insert your reducers into the store
export default  {
    app: appReducer,
    voter: voterReducer,
    voterList: voterListReducer,
    taskList: taskListReducer,
    chats: chatsReducer,
    messages: messagesReducer,
    user: userReducer
}