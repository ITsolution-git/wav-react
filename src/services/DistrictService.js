import config from '../config/ApiConfig';
import { getAsync } from '../helpers/RequestHelper';
import authStorage from '../storage/AuthStorage';

export default {
	getDistrictByAddress
}

function getDistrictByAddress(address) {
	return getAsync({
	    url: `${config.apiHost}/districts?address=${address}`,
	});
}

