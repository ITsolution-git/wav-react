import config from '../config/ApiConfig';
import { postAsync, getAsync } from '../helpers/RequestHelper';
import authStorage from '../storage/AuthStorage';

export default {
    searchVoters,
    searchCaptains
};

function searchVoters(data) {
    return postAsync({
        url: `${config.apiHost}/api/v1/voter/searchVoter`,
        data: data,
        headers: getHeaders()
    });
}

function searchCaptains(data) {
    return getAsync({
        url: `${config.apiHost}/api/v1/user/searchUser`,
        params: data,
        headers: getHeaders()
    });
}

function getHeaders() {
    return { 'x-key': authStorage.getLoggedUser().username };
}