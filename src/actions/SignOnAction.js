import IdentityService from '../services/IdentityService'
import History from '../utility/History'
import authStorage  from '../storage/AuthStorage';
import routes from '../constants/Routes';
import appDataTypes from '../constants/AppDataTypes';
import {
	initializeRequest,
	loadDataSuccess,
	loadDataFailure
} from './AppAction';

export function btwSignOn(username, password, source) {
	return dispatch => {
		dispatch(initializeRequest(appDataTypes.signOn));
		IdentityService.login(username, password).then(
			response => {
                authStorage.saveTokenInfo(response.token);
				dispatch(loadDataSuccess(appDataTypes.signOn, response));
			},
			error => {
				dispatch(loadDataFailure(appDataTypes.signOn, error.response.data.message));
			});
	};
}

export function btwRegister(identity) {
	return dispatch => {
		dispatch(initializeRequest(appDataTypes.register));
		return IdentityService.register(identity).then(
				response => {
					dispatch(loadDataSuccess(appDataTypes.register, response.data));
					//show success page or redirect to login page with username
					History.push(routes.makelist);
					History.go();
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
