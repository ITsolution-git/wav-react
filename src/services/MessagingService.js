import config from '../config/ApiConfig';
import { getAsync, postAsync } from '../helpers/RequestHelper';
import authStorage from '../storage/AuthStorage';
import roles from '../constants/Roles';

export default {
    loadChats,
    closeChat,
    loadConversation,
    sendMessage
};

function closeChat(data) {
    return postAsync({
        url: `${config.apiHost}/api/v1/message/closeMessage`,
        data,
        headers: getHeaders()
    });
}

function loadChats() {
    return getAsync({
        url: `${config.apiHost}/api/v1/message/getMessageQueue?userid=${ authStorage.getLoggedUser().userid}&isAdmin=${ authStorage.getCurrentRole() === roles.admin }`,
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
    return { 'x-key': authStorage.getLoggedUser().email };
}