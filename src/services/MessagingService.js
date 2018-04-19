import config from '../config/ApiConfig';
import { getAsync, postAsync } from '../helpers/RequestHelper';
import authStorage from '../storage/AuthStorage';

export default {
    loadChats,
    loadConversation
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

function getHeaders() {
    return { 'x-key': authStorage.getLoggedUser().username };
}