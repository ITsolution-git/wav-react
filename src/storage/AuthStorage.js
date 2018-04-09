import localStorage from 'localStorage';
import roles from '../constants/Roles';
import { parseJwt } from '../helpers/TokenHelper';

export default {
    saveTokenInfo,
    getLoggedUser,
    isAuthenticated,
    getToken,
    getCurrentRole
};

const sessionKeys = {
    token: 'token',
    user: 'user'
};

function saveTokenInfo(token) {
    const userObj = parseJwt(token);
    userObj.role = userObj.role || roles.captain;
    localStorage.setItem(sessionKeys.token, token);
    localStorage.setItem(sessionKeys.user, JSON.stringify(userObj));
}

function getLoggedUser() {
    return JSON.parse(localStorage.getItem(sessionKeys.user)) || {};
}

function getToken() {
    return localStorage.getItem(sessionKeys.token);
}

function getCurrentRole() {
    return getLoggedUser().role || roles.guest;
}

function isAuthenticated() {
    return !!getLoggedUser().email;
}