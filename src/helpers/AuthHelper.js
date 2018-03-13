import History from '../utility/History';

import authStorage from '../storage/AuthStorage';
import roles from '../constants/Roles';
import routes from '../constants/Routes';

export function getHomeRoute() {
    const currentRole = authStorage.getCurrentRole();
    switch (currentRole) {
        case roles.captain:
            return routes.captainsDashboard;
        case roles.admin:
            return routes.adminDashboard;
        case roles.guest: {
            return routes.login;
        }
    }
}

export function redirectToHome() {
    History.push(getHomeRoute());
    History.go()
}

export function logout() {
    localStorage.clear();
    History.push(routes.login);
    History.go()
}