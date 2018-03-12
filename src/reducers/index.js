import voterReducer from './VoterReducer';
import appReducer from './AppReducer';

//this is where you insert your reducers into the store
export default  {
    app: appReducer,
    voter: voterReducer
}