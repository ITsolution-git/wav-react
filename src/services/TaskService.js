import config from '../config/ApiConfig';
import { getAsync, postAsync } from '../helpers/RequestHelper';
import authStorage from '../storage/AuthStorage';

export default {
    loadTaskList,
    sendHelpQuestion,
    updateTask,
    updateTaskWithFile,
    getStateInfo
};

function getStateInfo(state) {
    return getAsync({
        url: `${config.apiHost}/api/v1/task/getStateInfo?state=${state}`,
        headers: getHeaders()
    });
}

function loadTaskList(userId) {
    return getAsync({
        url: `${config.apiHost}/api/v1/task/getTasks?userid=${userId}`,
        headers: getHeaders()
    });
}

function sendHelpQuestion(data) {
    return postAsync({
        url: `${config.apiHost}/api/v1/message/createMessage`,
        data,
        headers: getHeaders()
    });
}

function updateTask(data) {
    return postAsync({
        url: `${config.apiHost}/api/v1/task/updateTask`,
        data,
        headers: getHeaders()
    });
}

function updateTaskWithFile(data) {
    return postAsync({
        url: `${config.apiHost}/api/v1/task/updateTask`,
        data,
        headers: {
            'x-key': authStorage.getLoggedUser().username,
            'Content-Type': 'multipart/form-data'
        }
    });
}

function getHeaders() {
    return { 'x-key': authStorage.getLoggedUser().username };
}