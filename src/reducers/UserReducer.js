import UserConstants from '../constants/reducerConstants/UserConstants';
import InitialState from '../constants/InitialState';

export default function userReducer(state = InitialState.user, action) {
    switch (action.type) {
        // load user
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
        // delete user
        case UserConstants.DELETE_USER_REQUEST: {
            return { ...state, isDeleting: true, isDeleteSuccess: false };
        }
        case UserConstants.DELETE_USER_SUCCESS: {
            return { ...state, ...{ isDeleting: false, isDeleteSuccess: true }};
        }
        case UserConstants.DELETE_USER_FAILURE: {
            return { ...state, ...{ isDeleting: false, isDeleteSuccess: false }};
        }
        // unsubscribe
        case UserConstants.UNSUBSCRIBE_REQUEST: {
            return { ...state, ...{ isUnsubscribing: false, isUnsubscribed: false }};
        }
        case UserConstants.UNSUBSCRIBE_SUCCESS: {
            return { ...state, ...{ data: action.data, isUnsubscribing: false, isUnsubscribed: true }};
        }
        case UserConstants.UNSUBSCRIBE_FAILURE: {
            return { ...state, ...{ isUnsubscribing: false, isUnsubscribed: false }};
        }
        default:
            return state
    }
}