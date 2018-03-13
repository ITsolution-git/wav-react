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

function saveTokenInfo(token) {
    const userObj = parseJwt(token);
    userObj.role = userObj.role || roles.captain;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userObj));
}

function getLoggedUser() {
    return JSON.parse(localStorage.getItem('user')) || {};
}

function getToken() {
    return localStorage.getItem('token');
}

function getCurrentRole() {
    return getLoggedUser().role || roles.guest;
}

function isAuthenticated() {
    return !!getLoggedUser().email;
}