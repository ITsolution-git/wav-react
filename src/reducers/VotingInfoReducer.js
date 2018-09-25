import VotingInfoConstants from '../constants/reducerConstants/VotingInfoConstants';
import InitialState from '../constants/InitialState';

export default function votingInfoReducer(state = InitialState.votingInfo, action) {
    switch (action.type) {
        case VotingInfoConstants.VOTING_INFO_REQUEST: {
            const { email } = action;
            return { ...state, ... {[`${email}`]: { isFetching: true }}};
        }
        case VotingInfoConstants.VOTING_INFO_SUCCESS: {
            const { email, data } = action;
            return { ...state, ... {[`${email}`]: { isFetching: false, data, isSuccess: true }}};
        }
        case VotingInfoConstants.VOTING_INFO_ERROR: {
            const { email, error } = action;
            return { ...state, ... {[`${email}`]: { isFetching: false, error, isSuccess: false }}};
        }
        default:
            return state
    }
}