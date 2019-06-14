import config from '../config/ApiConfig';
import { postAsync } from '../helpers/RequestHelper';

export default {
    forgotPasswordRequest,
    verifyUserRequest,
    changePasswordRequest
};

// TODO: we change staging-host url
// https://btw-api-staging-2019.herokuapp.com'

function forgotPasswordRequest(data) {

    console.log('forgotPasswordRequest')
    return postAsync({
        url: `${config.apiHost}/user/resetPassword/sendEmail`,
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