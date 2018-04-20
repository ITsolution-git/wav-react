import config from '../config/ApiConfig';
import { getAsync, postAsync } from '../helpers/RequestHelper';
import authStorage from '../storage/AuthStorage';

export default {
    loadChats,
    loadConversation,
    sendMessage
};

function loadChats() {
    return getAsync({
        url: `${config.apiHost}/api/v1/message/getMessageQueue`,
        headers: getHeaders()
    });
}

function loadConversation(chatId) {
    return getAsync({
        url: `${config.apiHost}/api/v1/message/getMessageHistory?base_id=${chatId}`,
        headers: getHeaders()
    });
}

function sendMessage(data) {
    return postAsync({
        url: `${config.apiHost}/api/v1/message/sendMessage`,
        headers: getHeaders(),
        data
    });
}
function getHeaders() {
    return { 'x-key': authStorage.getLoggedUser().username };
}