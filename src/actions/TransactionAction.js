import TransactionConstants from '../constants/reducerConstants/TransactionConstants';
import TransactionService from '../services/TransactionService';

export function getLogList(searchFilter) {
    return dispatch => {

            dispatch(actionRequest(searchFilter));
            return TransactionService.getLogList(searchFilter).then(
                response => {
                    dispatch(actionSuccess(response.data.logs));
                },
                error => {
                    dispatch(actionError(error.response.data.message));
                });
        }

    function actionRequest(searchFilter) {
        return { type: TransactionConstants.GET_LOG_LIST_REQUEST, searchFilter };
    }
    function actionSuccess(logs) {
        return { type: TransactionConstants.GET_LOG_LIST_SUCCESS, logs };
    }
    function actionError(error) {
        return { type: TransactionConstants.GET_LOG_LIST_FAILURE, error };
    }
}
