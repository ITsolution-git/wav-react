import { TaskConstants } from '../constants/TaskConstants';
import taskService from '../services/TaskService';
import authStorage from '../storage/AuthStorage';

export function loadTaskList() {
    return dispatch => {
        dispatch(actionRequest());
        const { userid } = authStorage.getLoggedUser();
        return taskService.loadTaskList(userid).then(
            response => {
                dispatch(actionSuccess(response.data));
            },
            error => {
                dispatch(actionError(error.response.data.message));
            });
    };

    function actionRequest() {
        return { type: TaskConstants.TASK_LIST_REQUEST };
    }
    function actionSuccess(data) {
        return { type: TaskConstants.TASK_LIST_SUCCESS, data };
    }
    function actionError(error) {
        return { type: TaskConstants.TASK_LIST_ERROR, error };
    }
}
