import roles from '../constants/Roles';

export default {
    saveTokenInfo,
    getLoggedUser,
    getCurrentRole
};

function saveTokenInfo(token) {
    const userObj = parseJwt(token);
    userObj.role = userObj.role || roles.captain;
    localStorage.setItem('user', JSON.stringify(userObj));
}

function getLoggedUser() {
    return JSON.parse(localStorage.getItem('user')) || {};
}

function getCurrentRole() {
    return getLoggedUser().role || roles.guest;
}

function parseJwt (token) {
    const base64Url = token.split('.')[1],
          base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

