import PasswordRequestConstants from '../constants/reducerConstants/PasswordRequestConstants';
import InitialState from '../constants/InitialState';

export default function passwordRequestReducer(state = InitialState.request, action) {
    switch (action.type) {
        case PasswordRequestConstants.PASSWORD_RESET_REQUEST: {
            return { ...state, isSuccess: true };
        }
        default:
            return state
    }
}