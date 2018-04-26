import InitialState from '../constants/InitialState';
import UserSearchConstants from '../constants/reducerConstants/UserSearchConstants';

export default function userSearchReducer(state = InitialState.userSearch, action) {

    switch (action.type) {
        case UserSearchConstants.USER_SEARCH_REQUEST: {
            return { ...state, isFetching: true };
        }
        case UserSearchConstants.VOTER_SEARCH_SUCCESS: {
            return { ...state, ...{ voters: action.voters, isFetching: false, isVoterSuccess: true }};
        }
        case UserSearchConstants.VOTER_SEARCH_ERROR: {
            return { ...state, ...{ voterError: action.error, isFetching: false, isVoterSuccess: false }};
        }
        case UserSearchConstants.CAPTAIN_SEARCH_SUCCESS: {
            return { ...state, ...{ captains: action.captains, isFetching: false, isCaptainSuccess: true }};
        }
        case UserSearchConstants.CAPTAIN_SEARCH_ERROR: {
            return { ...state, ...{ captainError: action.error, isFetching: false, isCaptainSuccess: false }};
        }
        default:
            return state
    }
}