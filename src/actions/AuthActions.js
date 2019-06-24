import PubSub from 'pubsub-js';

import identityService from '../services/IdentityService';
import authStorage  from '../storage/AuthStorage';
import appDataTypes from '../constants/AppDataTypes';
import pubsubConstants from '../constants/PubSubConstants';
import appConstants from '../constants/reducerConstants/AppConstants';
import routes from '../constants/Routes';
import Auth0Service from '../services/Auth0Service';
import { storageKeys, LocalStorageManager as lsManager } from '../storage';
import history from '../utility/History';

import {
	initializeRequest,
	loadDataSuccess,
	loadDataFailure
} from './AppAction';
import { logout } from '../helpers/AuthHelper';

const domain = window.location.origin;

export function signInWithToken(userInfo) {

	return dispatch => {
		if (parseInt(userInfo.expiresIn, 10) > 0) {
			authStorage.saveTokenInfo(userInfo);
			PubSub.publish(pubsubConstants.onAuthChange, true);
			if (lsManager.getItem(storageKeys.firstLogin)) {
				history.push(routes.welcome);
			}
			return dispatch(loadDataSuccess(appDataTypes.signOn, null));
		}
		return dispatch(loadDataFailure(appDataTypes.signOn, 'Invalid token.'));
	};
}

export function signInWithMail(email, password) {

	return dispatch => {
		const auth0Service = new Auth0Service(domain + routes.loginByMail);

		dispatch(initializeRequest(appDataTypes.signOn));

		return auth0Service.signIn({email, password}).then(
			() => {
	            dispatch(loadDataSuccess(appDataTypes.signOn, null));
			},
			error => {
				dispatch(loadDataFailure(appDataTypes.signOn, error));
			});
	};
}

export function signUpWitMail(identity) {

	return dispatch => {
		const auth0Service = new Auth0Service(domain + routes.registerByMail);

		dispatch(initializeRequest(appDataTypes.register));

		return auth0Service.signUp(identity).then(
			() => {
					const { email, password } = identity;
					lsManager.setItem(storageKeys.firstLogin, true);
					dispatch(signInWithMail(email, password));
				},
				error => {
					dispatch(loadDataFailure(appDataTypes.register, error));
				})
	};
}

export function signUpWithSocial(connection) {
	return dispatch => {
		const auth0Service = new Auth0Service(domain + routes.registerBySocial);

		dispatch(initializeRequest(appDataTypes.register));

		return auth0Service.socialSignUp(connection).then(
			() => {
				// const { email, password } = identity;
				// dispatch(signInWithMail(email, password, () => {
				// 	dispatch(loadDataSuccess(appDataTypes.register, null));
				// }));
			},
			error => {
				dispatch(loadDataFailure(appDataTypes.register, error));
			})
	};
}

export function getBtwUserProfile() {
	return dispatch => {
		dispatch(initializeRequest(appDataTypes.profile));

		return identityService.getUser({ email: authStorage.getLoggedUser().email }).then(
				response => {
					dispatch(loadDataSuccess(appDataTypes.profile, response.data.userInformation))
				},
				error => {
					dispatch(loadDataFailure(appDataTypes.profile, error));
				})
	};
}


export function btwLogout() {
	return dispatch => {
		dispatch(logoutAction());
        logout();
        function logoutAction() {
            return { type: appConstants.USER_LOGOUT };
        }
	}
}