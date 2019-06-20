import taskService from '../services/TaskService';
import { TaskConstants } from '../constants/reducerConstants/TaskConstants';
import authStorage from '../storage/AuthStorage';
import { initializeRequest, loadDataSuccess, loadDataFailure } from './AppAction';
import appDataTypes from '../constants/AppDataTypes';
import { loadTaskList } from './TaskListAction';
import history from '../utility/History';
import routes from '../constants/Routes';
import { getBtwUserProfile } from './AuthActions';

export function sendHelpQuestion(message) {
    return dispatch => {
        dispatch(initializeRequest(appDataTypes.helpQuestion));
        const data = {
          userid: authStorage.getLoggedUser().userid,
          message
        };
        return taskService.sendHelpQuestion(data).then(
            response => {
                dispatch(loadDataSuccess(appDataTypes.helpQuestion, response));
            },
            response => {
                dispatch(loadDataFailure(appDataTypes.helpQuestion, response.data.message));
            });
    };
}

export function updateTask(data, withFile) {
    return dispatch => {
        dispatch(initializeRequest(appDataTypes.updateTask));
        if (!withFile) {
            data.userid = authStorage.getLoggedUser().userid;
        }
        const updateEndpoint = withFile ? taskService.updateTaskWithFile : taskService.updateTask;
        return updateEndpoint(data).then(
            response => {
                dispatch(loadDataSuccess(appDataTypes.updateTask, response));
                dispatch(loadTaskList());
                dispatch(getBtwUserProfile());
                history.push(routes.tasksList);
            },
            response => {
                dispatch(loadDataFailure(appDataTypes.updateTask, 'Something went wrong...'));
            });
    };
}

export function getStateInfo(state) {
    return dispatch => {
        if (state) {
            dispatch(actionRequest());
            return taskService.getStateInfo(state).then(
                response => {
                    dispatch(actionSuccess(response.data.state_info));
                },
                error => {
                    dispatch(actionError(error));
                })
        }
    };


    function actionRequest() {
        return { type: TaskConstants.TASK_STATE_INFO_REQUEST };
    }
    function actionSuccess(stateInfo) {
        return { type: TaskConstants.TASK_STATE_INFO_SUCCESS, stateInfo };
    }
    function actionError(error) {
        return { type: TaskConstants.TASK_STATE_INFO_ERROR, error };
    }
}

