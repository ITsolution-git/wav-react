import taskService from '../services/TaskService';
import { TaskConstants } from '../constants/reducerConstants/TaskConstants';
import authStorage from '../storage/AuthStorage';
import { initializeRequest, loadDataSuccess, loadDataFailure } from './AppAction';
import appDataTypes from '../constants/AppDataTypes';
import { loadTaskList } from './TaskListAction';
import history from '../utility/History';
import routes from '../constants/Routes';

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

export function updateTask(data) {
    return dispatch => {
        dispatch(initializeRequest(appDataTypes.updateTask));
        data.userid = authStorage.getLoggedUser().userid;
        return taskService.updateTask(data).then(
            response => {
                dispatch(loadDataSuccess(appDataTypes.updateTask, response));
                dispatch(loadTaskList());
                history.push(routes.tasksList);
            },
            response => {
                dispatch(loadDataFailure(appDataTypes.updateTask, 'Something went wrong...'));
            });
    };
}

export function getStateInfo(state) {
    return dispatch => {
        
        dispatch(actionRequest())
        return taskService.getStateInfo(state).then(
            response => {
                dispatch(actionSuccess(response.data.state_info));
            },
            error => {
                dispatch(actionError(error));
            })
    };


    function actionRequest() {
        return { type: TaskConstants.TASK_STATE_INFO_REQUEST };
    }
    function actionSuccess(state_info) {
        return { type: TaskConstants.TASK_STATE_INFO_SUCCESS, state_info };
    }
    function actionError(err) {
        return { type: TaskConstants.TASK_STATE_INFO_ERROR, err };
    }
}
