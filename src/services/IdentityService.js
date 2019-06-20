import config from '../config/ApiConfig';
import { getAsync } from '../helpers/RequestHelper';

const IdentityService = {
	getUserProfile,
};

function getUserProfile(email) {
	return getAsync({
		url: `${config.apiHost}/api/v1/getUser`,
		headers: {'x-key': email }
	});
}


export default IdentityService