import localStorage from 'localStorage';
import roles from '../constants/Roles';
import { parseJwt } from '../helpers/TokenHelper';
import cookies from 'js-cookie';

export default {
    saveTokenInfo,
    getLoggedUser,
    isAuthenticated,
    getTokenInfo,
    getCurrentRole
};

const storageKeys = {
    tokenInfo: 'tokenInfo',
    user: 'user'
};

function saveTokenInfo(tokenInfo) {
    let user = parseJwt(tokenInfo.idToken);
    user.role = roles.captain;
    cookies.set(storageKeys.tokenInfo, JSON.stringify(tokenInfo));
    localStorage.setItem(storageKeys.user, JSON.stringify(user));
}

function getLoggedUser() {
    return JSON.parse(localStorage.getItem(storageKeys.user)) || {};
}

function getTokenInfo() {
    return JSON.parse(cookies.get(storageKeys.tokenInfo)) || {};
}

function getCurrentRole() {
    return getLoggedUser().role || roles.guest;
}

function isAuthenticated() {
    return !!getLoggedUser().email;
}