import config from '../config/ApiConfig';
import { getAsync, postAsync } from '../helpers/RequestHelper';

export default {
    forgotPasswordRequest
};

function forgotPasswordRequest(data) {
    return postAsync({
        url: `${config.apiHost}/request/forgotPassword`,
        data,
        headers: {},
        includeToken: false
    });
}