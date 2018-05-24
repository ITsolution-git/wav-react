import PubSub from 'pubsub-js';

import IdentityService from '../services/IdentityService';
import authStorage  from '../storage/AuthStorage';
import appDataTypes from '../constants/AppDataTypes';
import pubsubConstants from '../constants/PubSubConstants';
import appStorage from '../storage/AppStorage';
import appConstants from '../constants/reducerConstants/AppConstants';

import {
	initializeRequest,
	loadDataSuccess,
	loadDataFailure
} from './AppAction';
import { logout } from '../helpers/AuthHelper';


export function btwSignOn(username, password, onSuccess = () => {}) {
	return dispatch => {
		dispatch(initializeRequest(appDataTypes.signOn));
		return IdentityService.login(username, password).then(
			response => {
                authStorage.saveTokenInfo(response.token);
                appStorage.setSplashShown();
                PubSub.publish(pubsubConstants.onAuthChange, true);
                dispatch(loadDataSuccess(appDataTypes.signOn, response));
                onSuccess();
			},
			error => {
				const { response } = error;
				const msgError = response ? response.data.message : 'Something went wrong while signing in';
				dispatch(loadDataFailure(appDataTypes.signOn, msgError));
			});
	};
}

export function btwRegister(identity) {
	return dispatch => {
		dispatch(initializeRequest(appDataTypes.register));
		return IdentityService.register(identity).then(
				response => {
					const { data } = response;
					if (data.message === 'A user with that email address already exists') {
						dispatch(loadDataFailure(appDataTypes.register, data.message));
						return;
					}
					const { username, password } = identity;
					dispatch(btwSignOn(username, password, () => {
                        dispatch(loadDataSuccess(appDataTypes.register, response.data));
					}));
				},
				error => {
					dispatch(loadDataFailure(appDataTypes.register, error.response.data));
				})
	};
}

export function getBtwUserProfile() {
	return dispatch => {
		dispatch(initializeRequest(appDataTypes.profile));
		return IdentityService.getUserProfile(authStorage.getLoggedUser().username).then(
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