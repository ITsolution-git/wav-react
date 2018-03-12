import localStorage from 'localStorage';

import IdentityConstants from '../constants/IdentityConstants'
import IdentityService from '../services/IdentityService'
import History from '../utility/History'
import authStorage  from '../storage/AuthStorage';
import { redirectToHome } from '../helpers/AuthHelper';
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
				dispatch(loadDataSuccess(appDataTypes.signOn, response));
				authStorage.saveTokenInfo(response.token);
				redirectToHome();
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
					dispatch(loadDataSuccess(appDataTypes.register, response));
					//show success page or redirect to login page with username
					History.push(routes.makelist);
					History.go();
				},
				error => {
					dispatch(loadDataFailure(appDataTypes.register, error.response.data));
				})
	};
}

function getBtwUserProfile() {
	return dispatch => {
		let token = localStorage.getItem('token');
		let username = localStorage.getItem('username');
		dispatch(request(token));
		return IdentityService.getUserProfile(token, username)
			.then(
				response => {
					dispatch(success(response))
				},
				error => {
					dispatch(failure(error.data));
				})
	}
	//if at this point, Token has expired, Clear the cookies, Route the user to login page

	function request(token) {
		return {
			type: IdentityConstants.IDENTITY_BTW_USERPROFILE_REQUEST,
			token: token
		}
	}

	function success(response) {
		return {
			type: IdentityConstants.IDENTITY_BTW_USERPROFILE_SUCCESS,
			response: response
		}
	}

	function failure(error) {
		return {
			type: IdentityConstants.IDENTITY_BTW_USERPROFILE_FAILURE,
			error: error

		}
	}
}

function validateTokenValidity(expires, issuedAt){
	let isTokenValid = false;
	let twentyMinutes = new Date();
	twentyMinutes.setDate(twentyMinutes.getDate()+ 0.0098);

	if (expires >=issuedAt){
		if ((expires - issuedAt) > (twentyMinutes)){
			isTokenValid = true;
			return isTokenValid;
		}
	}
	return isTokenValid;
}