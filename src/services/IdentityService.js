import config from '../config/ApiConfig';
import { getAsync } from '../helpers/RequestHelper';

const IdentityService = {
	getUser,
};

function getUser(email, token) {
	const getHeaders = () => token ? { 'Authorization': `Bearer ${token}`} : {};

	return getAsync({
		url: `${config.apiHost}/user`,
		params: { email },
		headers: getHeaders(),
		includeToken: !token,
		failRedirect: !token
	});
}

export default IdentityService