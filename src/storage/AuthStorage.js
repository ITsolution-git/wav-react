import localStorage from 'localStorage';
import roles from '../constants/Roles';
import { parseJwt } from '../helpers/TokenHelper';

export default {
    saveTokenInfo,
    getLoggedUser,
    isAuthenticated,
    getTokenInfo,
    getCurrentRole
};

const sessionKeys = {
    tokenInfo: 'tokenInfo',
    user: 'user'
};

function saveTokenInfo(tokenInfo) {
    let user = parseJwt(tokenInfo.idToken);
    user.role = roles.captain;
    localStorage.setItem(sessionKeys.tokenInfo, JSON.stringify(tokenInfo));
    localStorage.setItem(sessionKeys.user, JSON.stringify(user));
}

function getLoggedUser() {
    return JSON.parse(localStorage.getItem(sessionKeys.user)) || {};
}

function getTokenInfo() {
    return JSON.parse(localStorage.getItem(sessionKeys.tokenInfo)) || {};
}

function getCurrentRole() {
    return getLoggedUser().role || roles.guest;
}

function isAuthenticated() {
    return !!getLoggedUser().email;
}