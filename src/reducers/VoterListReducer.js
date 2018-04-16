import update from 'immutability-helper';

import VoterContants from '../constants/VoterConstants';
import InitialState from '../constants/InitialState';

export default function voterListReducer(state = InitialState.voterList, action) {
    const getVoterIndex = (data) => {
        return state.voters.findIndex(voter => voter._id === data._id);
    };
    switch (action.type) {
        case VoterContants.VOTER_LIST_REQUEST: {
            return { ...state, isFetching: true };
        }
        case VoterContants.VOTER_LIST_SUCCESS: {
            return { ...state, ...{ voters: action.voters, isFetching: false, isSuccess: true, count: action.voters.length }};
        }
        case VoterContants.VOTER_LIST_ERROR: {
            return { ...state, ...{ error: action.error, isFetching: false, isSuccess: false }};
        }
        case VoterContants.VOTER_UPDATE_SUCCESS: {
            const { data } = action;
            const voterIndex = getVoterIndex(data);
            return update(state, { voters: { [voterIndex]: { $set: data } } });
        }
        case VoterContants.VOTER_UPDATE_ERROR: {
            return { ...state, updateVoterError: action.error };
        }
        case VoterContants.VOTER_ADD_SUCCESS: {
            return update(state, { voters: { $push: [action.data] }});
        }
        case VoterContants.VOTER_ADD_ERROR: {
            return { ...state, addVoterError: action.error };
        }
        case VoterContants.VOTER_DELETE_SUCCESS: {
            const { data } = action;
            const voterIndex = getVoterIndex(data);
            return update(state, { voters: { $splice: [[ voterIndex, 1 ]] } });
        }
        case VoterContants.VOTER_DELETE_ERROR: {
            return { ...state, deleteVoterError: action.error };
        }
        default:
            return state
    }
}