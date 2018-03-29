import { ApiHost } from '../config/ApiConfig';
import { getAsync, patchAsync } from '../helpers/RequestHelper';
import authStorage from '../storage/AuthStorage';

export default {
    loadVoterList,
    updateVoter,
    addVoter,
    deleteVoter
};



function loadVoterList(userId, username) {
    return getAsync({
        url: `${ApiHost}/api/v1/getVoters?userid=${userId}&username=${username}`,
        headers: getHeaders()
    });
}

function updateVoter(data) {
    return patchAsync({
        url: `${ApiHost}/api/v1/updateVoter`,
        headers: getHeaders(),
        data
    })
}

function addVoter(data) {
    return patchAsync({
        url: `${ApiHost}/api/v1/updateVoter`,
        headers: getHeaders(),
        data
    })
}

function deleteVoter(data) {
    return patchAsync({
        url: `${ApiHost}/api/v1/updateVoter`,
        headers: getHeaders(),
        data
    })
}


function getHeaders() {
    return { 'x-key': authStorage.getLoggedUser().username };
}