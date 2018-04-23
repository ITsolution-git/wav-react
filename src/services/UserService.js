import config from '../config/ApiConfig';
import { getAsync } from '../helpers/RequestHelper';
import authStorage from "../storage/AuthStorage";

const UserService = {
    loadUser
};

function loadUser(userId) {
    return getAsync({
        url: `${config.apiHost}/api/v1/getUserById?${userId}`,
        headers: getHeaders()
    });
}

function getHeaders() {
    return { 'x-key': authStorage.getLoggedUser().username };
}

export default UserService