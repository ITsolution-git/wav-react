import config from '../config/ApiConfig';
import { getAsync, patchAsync, postAsync, deleteAsync } from '../helpers/RequestHelper';
import authStorage from '../storage/AuthStorage';

export default {
    loadVoterList,
    updateVoter,
    addVoter,
    deleteVoter
};



function loadVoterList(userId, username) {
    return getAsync({
        url: `${config.apiHost}/api/v1/getVoters?userid=${userId}&username=${username}`,
        headers: getHeaders()
    });
}

function updateVoter(data) {
    return patchAsync({
        url: `${config.apiHost}/api/v1/updateVoter`,
        headers: getHeaders(),
        data
    })
}

function addVoter(data) {
    return postAsync({
        url: `${config.apiHost}/api/v1/addVoter`,
        headers: getHeaders(),
        data
    })
}

function deleteVoter(data) {
    return deleteAsync({
        url: `${config.apiHost}/api/v1/deleteVoter`,
        headers: getHeaders(),
        data
    })
}


function getHeaders() {
    return { 'x-key': authStorage.getLoggedUser().username };
}