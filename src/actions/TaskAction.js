import taskService from '../services/TaskService';
import authStorage from '../storage/AuthStorage';
import { initializeRequest, loadDataSuccess, loadDataFailure } from './AppAction';
import appDataTypes from '../constants/AppDataTypes';

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
