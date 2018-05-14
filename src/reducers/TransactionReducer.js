import TransactionConstants from '../constants/reducerConstants/TransactionConstants';
import InitialState from '../constants/InitialState';

export default function userReducer(state = InitialState.transaction, action) {
    switch (action.type) {
        case TransactionConstants.GET_LOG_LIST_REQUEST: {
            return { ...state, isFetching: true };
        }
        case TransactionConstants.GET_LOG_LIST_SUCCESS: {
            const { logs } = action;
            return { ...state, ...{ logs: logs, isFetching: false, isSuccess: true }};
        }
        case TransactionConstants.GET_LOG_LIST_FAILURE: {
            return { ...state, ...{ error: action.error, isFetching: false, isSuccess: false }};
        }
        default:
            return state
    }
}