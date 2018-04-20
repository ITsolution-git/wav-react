import UserConstants from '../constants/UserConstants';
import InitialState from '../constants/InitialState';

export default function userReducer(state = InitialState.user, action) {
    switch (action.type) {
        case UserConstants.LOAD_USER_REQUEST: {
            return { ...state, isFetching: true };
        }
        case UserConstants.LOAD_USER_SUCCESS: {
            const { id, user } = action;
            return { ...state, ...{ users: { [id]: user }, isFetching: false, isSuccess: true }};
        }
        case UserConstants.LOAD_USER_FAILURE: {
            return { ...state, ...{ error: action.error, isFetching: false, isSuccess: false }};
        }
        default:
            return state
    }
}