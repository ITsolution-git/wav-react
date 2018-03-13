import axios from 'axios';

import { ApiHost } from '../config/ApiConfig';
import { getAsync, postAsync } from '../helpers/RequestHelper';

const IdentityService = {
	login,
	register,
	getUserProfile,
};


function login(username, password) {
	return postAsync({
		url: `${ApiHost}/user/login`,
		data: {
			username,
			password
		},
		includeToken: false
	}).then(response => {
		if (!response.data.token) {
            return Promise.reject(response.data);
        }
        return response.data;
	});
}

function register({ username, password, email, firstname, lastname}) {
	return postAsync({
		url: `${ApiHost}/user/register`,
		data: {
			username,
			password,
			email,
			firstname,
			lastname
		},
		includeToken: false
	});
}


function getUserProfile(username) {
	return getAsync({
		url: `${ApiHost}/api/v1/getUser`,
		headers: {'x-key': username }
	});
}


export default IdentityService