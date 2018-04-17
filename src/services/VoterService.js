import config from '../config/ApiConfig';
import { getAsync, patchAsync, postAsync, deleteAsync } from '../helpers/RequestHelper';
import authStorage from '../storage/AuthStorage';

export default {
    loadVoterList,
    updateVoter,
    updateRegisteredVoter,
    addVoter,
    retryAdd,
    deleteVoter
};



function loadVoterList(userId, username) {
    return getAsync({
        url: `${config.apiHost}/api/v1/getVoters?userid=${userId}&username=${username}`,
        headers: getHeaders()
    });
}

function updateRegisteredVoter(data) {
    return patchAsync({
        url: `${config.apiHost}/api/v1/updateVoterRegistration`,
        headers: getHeaders(),
        data,
        failRedirect: false
    })
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
        data,
        failRedirect: false
    })
}

function retryAdd(data) {
    return postAsync({
        url: `${config.apiHost}/api/v1/retryAddVoter`,
        headers: getHeaders(),
        data,
        failRedirect: false
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