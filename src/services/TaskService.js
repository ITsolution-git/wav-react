import config from '../config/ApiConfig';
import { getAsync } from '../helpers/RequestHelper';
import authStorage from '../storage/AuthStorage';

export default {
    loadTaskList
};

function loadTaskList(userId) {
    return getAsync({
        url: `${config.apiHost}/api/v1/task/getTasks?userid=${userId}`,
        headers: getHeaders()
    });
}

function getHeaders() {
    return { 'x-key': authStorage.getLoggedUser().username };
}