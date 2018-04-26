import InitialState from '../constants/InitialState';
import UserSearchConstants from '../constants/reducerConstants/UserSearchConstants';

export default function userSearchReducer(state = InitialState.userSearch, action) {

    switch (action.type) {
        case UserSearchConstants.USER_SEARCH_REQUEST: {
            return { ...state, isFetching: true };
        }
        case UserSearchConstants.USER_SEARCH_SUCCESS: {
            return { ...state, ...{ users: action.users, isFetching: false, isSuccess: true }};
        }
        case UserSearchConstants.USER_SEARCH_ERROR: {
            return { ...state, ...{ error: action.error, isFetching: false, isSuccess: false }};
        }
        default:
            return state
    }
}