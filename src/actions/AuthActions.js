import PubSub from 'pubsub-js';

import identityService from '../services/IdentityService';
import UserService from '../services/UserService';
import authStorage  from '../storage/AuthStorage';
import appDataTypes from '../constants/AppDataTypes';
import pubsubConstants from '../constants/PubSubConstants';
import appConstants from '../constants/reducerConstants/AppConstants';
import routes from '../constants/Routes';
import Auth0Service from '../services/Auth0Service';

import { storageKeys, LocalStorageManager as lsManager } from '../storage';
import history from '../utility/History';
import {postAsync, getAsync} from '../helpers/RequestHelper';

import {
	initializeState,
	initializeRequest,
	loadDataSuccess,
	loadDataFailure
} from './AppAction';
import { logout } from '../helpers/AuthHelper';
import config from "../config/ApiConfig";

const domain = window.location.origin;

export function signInWithToken(userInfo) {
	return dispatch => {
		if (parseInt(userInfo.expiresIn, 10) > 0) {
			authStorage.saveTokenInfo(userInfo);
			dispatch(checkCurrentUserStatus(true))
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
	            dispatch(getBtwUserProfile())
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
		dispatch(signInWithToken(userInfo))
		dispatch(initializeRequest(appDataTypes.register));

		return identityService.getUser(email, token)
			.then(({ user }) => {
				const { registrationDate, lastLoginTime } = user;
				if (registrationDate === lastLoginTime) {
					lsManager.setItem(storageKeys.firstLogin, true);
				}
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

export function checkCurrentUserStatus(isRoute=false) {
    return dispatch => {
        dispatch(initializeRequest(appDataTypes.profile));
        return UserService.getCurrentUser().then(
            (data) => {
            	const { user } = data
                dispatch(loadDataSuccess(appDataTypes.profile, data));
                authStorage.getUserMoreInfo(user)
            	isRoute && history.push(authorizeRoute(user, routes.captainsDashboard))
            },
            error => {
                dispatch(loadDataFailure(appDataTypes.profile, error));
                authStorage.clearStorage()
            });
    };
}

export function authorizeRoute(user, toRoute='') {
	let redirectRoute = ''
	const { onboarding } = user
	if (!onboarding)
		return redirectRoute
	if (lsManager.getItem(storageKeys.firstLogin)) {
		redirectRoute = routes.welcome
	} else if (!onboarding.district) {
		redirectRoute = routes.selectDistrict
	} else if (!onboarding.importSource) {
		if ([routes.sendToGoogle, routes.sendToTwitter, routes.connectGoogle, routes.connectTwitter].includes(history.location.pathname))
			redirectRoute = history.location.pathname
		else			
			redirectRoute = routes.socialConnect
	} else if (!onboarding.addTenVoters) {
		redirectRoute = routes.selectVoters
	}
	if (!redirectRoute && toRoute) {
		redirectRoute = toRoute
	}
	return redirectRoute
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

export function initializeAuthState() {
	return dispatch => {
		dispatch(initializeState(appDataTypes.register))		
	}
}

export async function getTwitterRequestTokens() {
	const { token } = await getAsync({
		url: `${config.apiHost}/oauth/twitter/get_request_token`,
	});
	return token;
}

export async function getTwitterFriends(oauth_token, oauth_verifier) {
	return await getAsync({
		url: `${config.apiHost}/oauth/twitter/friends/list`,
		// headers: {},
		params: { oauth_token, oauth_verifier }
	});
}

export async function importContactsFromGoogle(accessToken) {
	return await getAsync({
		url: `${config.apiHost}/oauth/google/friends/list?access_token=${accessToken}`,
		// headers: {},
		// includeToken: false
	});
}
