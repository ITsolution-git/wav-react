import VoterContants from '../constants/VoterConstants';
import InitialState from '../constants/InitialState';

export default function voterListReducer(state = InitialState.voterList, action) {
    switch (action.type) {
        case VoterContants.VOTER_LIST_REQUEST: {
            return { ...state, isFetching: true };
        }
        case VoterContants.VOTER_LIST_SUCCESS: {
            return { ...state, ...{ voters: action.voters, isFetching: false, isSuccess: true }};
        }
        case VoterContants.VOTER_LIST_ERROR: {
            return { ...state, ...{ error: action.error, isFetching: false, isSuccess: false }};
        }
        default:
            return state
    }
}