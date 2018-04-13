import config from '../config/ApiConfig';
import { getAsync, postAsync } from '../helpers/RequestHelper';
import authStorage from '../storage/AuthStorage';

export default {
    loadTaskList,
    sendHelpQuestion
};

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
function getHeaders() {
    return { 'x-key': authStorage.getLoggedUser().username };
}