import PubSub from 'pubsub-js';

import IdentityService from '../services/IdentityService';
import authStorage  from '../storage/AuthStorage';
import appDataTypes from '../constants/AppDataTypes';
import pubsubConstants from '../constants/PubSubConstants';
import appConstants from '../constants/reducerConstants/AppConstants';
import routes from '../constants/Routes';
import Auth0Service from '../services/Auth0Service';

import {
	initializeRequest,
	loadDataSuccess,
	loadDataFailure
} from './AppAction';
import { logout } from '../helpers/AuthHelper';

const domain = window.location.origin;

export function signinWithMail(email, password, onSuccess = () => {}) {
	const auth0Service = new Auth0Service(domain + routes.loginByMail);
	auth0Service.signIn({ email, password });

	// return dispatch => {
	// 	dispatch(initializeRequest(appDataTypes.signOn));
	// 	return IdentityService.login(email, password).then(
	// 		response => {
	//             authStorage.saveTokenInfo(response.token);
	//             PubSub.publish(pubsubConstants.onAuthChange, true);
	//             dispatch(loadDataSuccess(appDataTypes.signOn, response));
	//             onSuccess();
	// 		},
	// 		error => {
	// 			const { response } = error;
	// 			const msgError = response ? response.data.message : 'Something went wrong while signing in';
	// 			dispatch(loadDataFailure(appDataTypes.signOn, msgError));
	// 		});
	// };

	// return dispatch => {
	// 	dispatch(initializeRequest(appDataTypes.signOn));
	// 	return IdentityService.login(email, password).then(
	// 		response => {
    //             authStorage.saveTokenInfo(response.token);
    //             PubSub.publish(pubsubConstants.onAuthChange, true);
    //             dispatch(loadDataSuccess(appDataTypes.signOn, response));
    //             onSuccess();
	// 		},
	// 		error => {
	// 			const { response } = error;
	// 			const msgError = response ? response.data.message : 'Something went wrong while signing in';
	// 			dispatch(loadDataFailure(appDataTypes.signOn, msgError));
	// 		});
	// };
}

export function signupWitMail(identity) {

	return dispatch => {
		const auth0Service = new Auth0Service(domain + routes.registerByMail);

		dispatch(initializeRequest(appDataTypes.register));

		return auth0Service.signUp(identity).then(
			() => {
					const { email, password } = identity;
					dispatch(signinWithMail(email, password, () => {
	                    dispatch(loadDataSuccess(appDataTypes.register, null));
					}));
				},
				error => {
					dispatch(loadDataFailure(appDataTypes.register, error));
				})
	};
}

export function getBtwUserProfile() {
	return dispatch => {
		dispatch(initializeRequest(appDataTypes.profile));
		return IdentityService.getUserProfile(authStorage.getLoggedUser().email).then(
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