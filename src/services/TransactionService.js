import config from '../config/ApiConfig';
import { getAsync } from '../helpers/RequestHelper';
import authStorage from "../storage/AuthStorage";

const TransactionService = {
    getLogList
};

function getLogList(searchFilter) {
    return getAsync({
        url: `${config.apiHost}/api/v1/transaction/getLogs?filter=${searchFilter}`,
        headers: getHeaders()
    });
}

function getHeaders() {
    return { 'x-key': authStorage.getLoggedUser().email};
}

export default TransactionService