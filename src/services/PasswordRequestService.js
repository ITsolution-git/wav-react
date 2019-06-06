import config from '../config/ApiConfig';
import { postAsync } from '../helpers/RequestHelper';

export default {
    forgotPasswordRequest,
    verifyUserRequest,
    changePasswordRequest
};

function forgotPasswordRequest(data) {
    return postAsync({
        url: `${config.apiHost}/request/forgotPassword`,
        data,
        headers: {},
        includeToken: false
    });
}

function verifyUserRequest(data) {
    return postAsync({
        url: `${config.apiHost}/request/verifyUser`,
        data,
        headers: {},
        includeToken: false
    });
}

function changePasswordRequest(data) {
    return postAsync({
        url: `${config.apiHost}/request/changePassword`,
        data,
        headers: {},
        includeToken: false
    });
}