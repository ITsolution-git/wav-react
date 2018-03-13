import axios from 'axios';

import authStorage from '../storage/AuthStorage';
import { isTokenValid } from '../helpers/TokenHelper';
import { logout } from '../helpers/AuthHelper';

export function postAsync({ url, data = {}, headers = {}, includeToken = true }) {
    const requestData = {
        url,
        data,
        method: 'POST',
        headers: mergeHeaders(headers)
    };
    return makeRequest(requestData, includeToken);
}

export function getAsync({ url, params = {}, headers = {}, includeToken = true }) {
    const requestData = {
        url,
        params,
        method: 'GET',
        headers: mergeHeaders(headers),
    };
    return makeRequest(requestData, includeToken);
}

function makeRequest(requestData, includeToken) {
    if (includeToken) {
        const token = authStorage.getToken();
        if (!isTokenValid(token)) {
            logout();
            return Promise.reject();
        }
        requestData.headers['x-access-token'] = token;
    }
    return axios(requestData);
}

function mergeHeaders(headers = {}) {
    let defaultHeader =  { "Content-Type": "application/json" };
    return Object.assign({}, defaultHeader, headers);
}