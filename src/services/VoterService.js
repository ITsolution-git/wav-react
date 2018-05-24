import config from '../config/ApiConfig';
import { patchAsync, postAsync, deleteAsync } from '../helpers/RequestHelper';
import authStorage from '../storage/AuthStorage';

export default {
    loadVoterList,
    updateVoter,
    updateRegisteredVoter,
    generateTaskForUser,
    addVoter,
    retryAdd,
    deleteVoter
};



function loadVoterList(userId, username) {
    return postAsync({
        data: {
          userid: userId,
          username
        },
        url: `${config.apiHost}/api/v1/getVoters`,
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

function generateTaskForUser() {
    return postAsync({
        url: `${config.apiHost}/api/v1/task/generateTaskForUser`,
        headers: getHeaders(),
        data: {
            userid: authStorage.getLoggedUser().userid
        }
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