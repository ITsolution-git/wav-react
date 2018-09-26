import config from '../config/ApiConfig';
import { patchAsync, postAsync, deleteAsync, getAsync } from '../helpers/RequestHelper';
import authStorage from '../storage/AuthStorage';

export default {
    loadVoterList,
    updateVoter,
    updateRegisteredVoter,
    generateTaskForUser,
    addVoter,
    retryAdd,
    deleteVoter,
    getReferendumInfo,
    getElectionInfo,
    getPollingLocationInfo
};



function loadVoterList(userId, email) {
    return postAsync({
        data: {
          userid: userId,
          email
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

function getReferendumInfo(email) {
    return getAsync({
        url: `${config.apiHost}/api/v1/civic/getReferendumInfo?email=${email}`,
        headers: getHeaders()
    })
}

function getElectionInfo(email) {
    return getAsync({
        url: `${config.apiHost}/api/v1/civic/getElectioncontestsInfo?email=${email}`,
        headers: getHeaders()
    })
}

function getPollingLocationInfo(email) {
    return getAsync({
        url: `${config.apiHost}/api/v1/civic/getPollingLocationInfo?email=${email}`,
        headers: getHeaders()
    })
}

function getHeaders() {
    return { 'x-key': authStorage.getLoggedUser().email };
}