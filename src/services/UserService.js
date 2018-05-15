import config from '../config/ApiConfig';
import { getAsync, postAsync } from '../helpers/RequestHelper';
import authStorage from "../storage/AuthStorage";

const UserService = {
    loadUser,
    checkForUniqueEmail
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

function getHeaders() {
    return { 'x-key': authStorage.getLoggedUser().username };
}

export default UserService