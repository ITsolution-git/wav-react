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
			const redirectRoute = lsManager.getItem(storageKeys.firstLogin)
				? routes.welcome
				: routes.captainsDashboard;

			history.push(redirectRoute);
			PubSub.publish(pubsubConstants.onAuthChange, true);
			return dispatch(loadDataSuccess(appDataTypes.signOn, null));
		}
		return dispatch(loadDataFailure(appDataTypes.signOn, 'Invalid token.'));
	};
}

export function signInWithMail(email, password) {

	return dispatch => {
		const auth0Service = new Auth0Service(domain + routes.signIn);

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
		const auth0Service = new Auth0Service(domain + routes.signUp);

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

export function authorizeWithSocial(connection, isLogin = false) {
	return dispatch => {
		const subRoute = isLogin ? routes.signIn : routes.signUp;
		const type = isLogin ? appDataTypes.signOn : appDataTypes.register;

		const auth0Service = new Auth0Service(domain + subRoute);

		dispatch(initializeRequest(appDataTypes[type]));

		return auth0Service.socialAuthorize(connection).then(
			() => {
				dispatch(loadDataSuccess(appDataTypes[type], null));
			},
			error => {
				dispatch(loadDataFailure(appDataTypes[type], error));
			})
	};
}

export function signUpWithToken(userInfo) {
	const { token, idToken: { email }} = userInfo;

	return dispatch => {

		dispatch(initializeRequest(appDataTypes.register));

		return identityService.getUser(email, token)
			.then(({ user }) => {
				const { registrationDate, lastLoginTime } = user;
				if (registrationDate === lastLoginTime) {
					lsManager.setItem(storageKeys.firstLogin, true);
				}

				return dispatch(signInWithToken(userInfo))
			})
			.catch(({ data: { message } }) => {
				return dispatch(loadDataFailure(appDataTypes.register, message));
			})
	}
}

export function getBtwUserProfile() {
	return dispatch => {
		dispatch(initializeRequest(appDataTypes.profile));

		return identityService.getUser({ email: authStorage.getLoggedUser().email }).then(
			({ user }) => {
					dispatch(loadDataSuccess(appDataTypes.profile, user))
				},
				error => {
					dispatch(loadDataFailure(appDataTypes.profile, error));
				})
	};
}


export function btwLogout() {
	return dispatch => {
		const callBackUrl = domain + routes.signIn;
		const auth0Service = new Auth0Service(callBackUrl);

		auth0Service.signOut();
		dispatch(logoutAction());
		logout();

        function logoutAction() {
            return { type: appConstants.USER_LOGOUT };
        }
	}
}