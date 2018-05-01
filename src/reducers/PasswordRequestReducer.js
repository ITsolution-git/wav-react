import PasswordRequestConstants from '../constants/reducerConstants/PasswordRequestConstants';
import InitialState from '../constants/InitialState';

export default function passwordRequestReducer(state = InitialState.request, action) {
    switch (action.type) {
        case PasswordRequestConstants.PASSWORD_RESET_REQUEST: {
            return { ...state, isFetching: true };
        }
        case PasswordRequestConstants.PASSWORD_RESET_SUCCEEDED: {
            return { ...state, isUserFound: action.isUserFound, isFetching: false };
        }
        case PasswordRequestConstants.PASSWORD_RESET_FAILED: {
            return { ...state, isUserFound: false, isFetching: false, err: action.err };
        }
        case PasswordRequestConstants.VERIFY_USER_SUCCEEDED:  {
            return { ...state, isSuccess: true, user: action.user };
        }
        case PasswordRequestConstants.VERIFY_USER_FAILED:  {
            return { ...state, isSuccess: false };
        }
        case PasswordRequestConstants.CHANGE_PASSWORD_SUCCEEDED:  {
            return { ...state, isChangedPassword: true };
        }
        case PasswordRequestConstants.CHANGE_PASSWORD_FAILED:  {
            return { ...state, isChangedPassword: false };
        }
        default:
            return state
    }
}