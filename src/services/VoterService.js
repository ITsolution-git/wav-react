import { ApiHost } from '../config/ApiConfig';
import { getAsync, postAsync } from '../helpers/RequestHelper';

export default {
    loadVoterList
};


function loadVoterList(userId, username) {
    return getAsync({
        url: `${ApiHost}/api/v1/getVoters?userid=${userId}&username=${username}`,
        headers: {'x-key': username }
    });
}