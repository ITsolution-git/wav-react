import config from '../config/ApiConfig';
import { getAsync, postAsync } from '../helpers/RequestHelper';

const IdentityService = {
	login,
	register,
	getUserProfile,
};

function login(email, password) {
	return postAsync({
		url: `${config.apiHost}/user/login`,
		data: {
			email,
			password
		},
		includeToken: false,
		failRedirect: false
	}).then(response => {
		if (!response.data.token) {
            return Promise.reject(response.data);
        }
        return response.data;
	});
}

function register({ username, password, email, firstname, lastname}) {
	return postAsync({
		url: `${config.apiHost}/user/register`,
		data: {
			username,
			password,
			email,
			firstname,
			lastname
		},
		includeToken: false,
		failRedirect: false
	});
}


function getUserProfile(email) {
	return getAsync({
		url: `${config.apiHost}/api/v1/getUser`,
		headers: {'x-key': email }
	});
}


export default IdentityService