import config from '../config/ApiConfig';
import { getAsync, postAsync } from '../helpers/RequestHelper';

const IdentityService = {
	login,
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

function getUserProfile(email) {
	return getAsync({
		url: `${config.apiHost}/api/v1/getUser`,
		headers: {'x-key': email }
	});
}


export default IdentityService