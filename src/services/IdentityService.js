import config from '../config/ApiConfig';
import { postAsync } from '../helpers/RequestHelper';

const IdentityService = {
	getUser,
};

function getUser(data) {
	return postAsync({
		url: `${config.apiHost}/auth/getUser`,
		data
	});
}


export default IdentityService