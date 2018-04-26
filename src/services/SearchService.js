import config from '../config/ApiConfig';
import { postAsync } from '../helpers/RequestHelper';
import authStorage from '../storage/AuthStorage';
import roles from '../constants/Roles';

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
    return postAsync({
        url: `${config.apiHost}/api/v1/user/searchUser`,
        data: data,
        headers: getHeaders()
    });
}

function getHeaders() {
    return { 'x-key': authStorage.getLoggedUser().username };
}