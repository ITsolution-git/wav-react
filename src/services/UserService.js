import config from '../config/ApiConfig';
import { getAsync, postAsync, deleteAsync, patchAsync } from '../helpers/RequestHelper';
import authStorage from "../storage/AuthStorage";

const UserService = {
    loadUser,
    checkForUniqueEmail,
    deleteUser,
    unsubscribeUser,
    updateProfile,
    getCurrentUser
};

function loadUser(userId) {
    return getAsync({
        url: `${config.apiHost}/api/v1/getUserById?${userId}`,
        headers: getHeaders()
    });
}

function checkForUniqueEmail(data) {
    return postAsync({
        url: `${config.apiHost}/api/v1/isEmailUnique`,
        data,
        headers: getHeaders()
    })
}

function deleteUser(data) {
    return deleteAsync({
        url: `${config.apiHost}/api/v1/deleteUser`,
        data,
        headers: getHeaders()
    })
}

function unsubscribeUser(data) {
    return patchAsync({
        url: `${config.apiHost}/user/unsubscribe`,
        data,
        headers: getHeaders()
    })
}

function updateProfile(data) {
    return patchAsync({
        url: `${config.apiHost}/user`,
        data
    })
}

function getCurrentUser() {
    return getAsync({
        url: `${config.apiHost}/user`,
    });
}

function getHeaders() {
    return { 'x-key': authStorage.getLoggedUser().email };
}

export default UserService