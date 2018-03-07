import localStorage from 'localStorage';

import IdentityConstants from '../constants/IdentityConstants'
import IdentityService from '../services/IdentityService'
import History from '../utility/History'
import authStorage  from '../storage/AuthStorage';
import { redirectToHome } from '../helpers/AuthHelper';

const IdentityAction = {
	setRedirectUrl,
	btwSignOn,
	btwRegister,
	isSignedIn,
	getBtwUserProfile
};

function setRedirectUrl(currentURL) {
	return dispatch => {
		dispatch(success(currentURL))
	}

	function success(currentURL) {
		return {
			type: IdentityConstants.IDENTITY_REDIRECT_SUCCESS,
			url : currentURL
		}
	}

}

function btwSignOn(username, password, source) {
	return dispatch => {
		dispatch(request(username, password, source));
		IdentityService.login(username, password)
			.then(
				response => {
					dispatch(success(response, source));
                    authStorage.saveTokenInfo(response.token);
                    // TODO check for usages and remove this code
					localStorage.setItem('token', response.token);
					localStorage.setItem('issuedAt', response.issuedAt);
					localStorage.setItem('expires', response.expires);
					localStorage.setItem('loginSource', source);
					localStorage.setItem('isAuthenticated', 'true');
					localStorage.setItem('username', username);

					redirectToHome();
				},
				error => {
					dispatch(failure(error));
				})
	}

	function request(username, password) {
		return {
			type      : IdentityConstants.IDENTITY_LOGIN_REQUEST,
			isFetching: true,
			source    : source,
			identity  : {
				username,
				password
			}
		}
	}


	function success(response, source) {
		return {
			type      : IdentityConstants.IDENTITY_LOGIN_SUCCESS,
			isFetching: false,
			source    : source,
			response  : response,
			isError: false
		}
	}

	function failure(error, source) {
		return {
			type      : IdentityConstants.IDENTITY_LOGIN_FAILURE,
			isFetching: false,
			source    : source,
			error     : error,
			isError: true
		}
	}
}

function btwRegister(identity) {
	return dispatch => {
		dispatch(request(identity));
		return IdentityService.register(identity)
			.then(
				response => {
					dispatch(success(response));
					localStorage.setItem('username', identity.username);
					//show success page or redirect to login page with username
					History.push('/');
					History.go();
				},
				error => {
					dispatch(failure(error.response.data));
				})
	}

	function request(identity) {
		return {
			type           : IdentityConstants.IDENTITY_REGISTER_REQUEST,
			isFetching     : true,
			identity       : identity
		}
	}

	function success(response) {
		return {
			type           : IdentityConstants.IDENTITY_REGISTER_SUCCESS,
			isFetching     : false,
			response
		}
	}

	function failure(error) {
		return {
			type           : IdentityConstants.IDENTITY_REGISTER_FAILURE,
			isFetching     : false,
			error
		}
	}


}

function isSignedIn(page) {
	return dispatch => {
		dispatch(request(page));
		if (handleAuthCheckFromSource()) {
			dispatch(success(page));
			/*if (page === '/login'){
				History.push('landingPage/ContactsLandingPage');
				History.go();
			} else if (page === '/landingPage/ContactsLandingPage') {
				History.go();
			} else if (page === '/landingPage/votersList/VotersListDashboard'){
				History.push('landingPage/ContactsLandingPage');
				History.go();
			} else if (page === '/landingPage/votersList/ValidateVoter/:id'){
				History.push('landingPage/ContactsLandingPage');
				History.go();
			} else if (page === 'landingPage/manageVoters/manual/ManualVotersDashboard'){
				History.push('landingPage/ContactsLandingPage');
				History.go();
			}
		} else {
			dispatch(failure(page));
			History.push('/');
			History.go();
		}*/
		}else {
			dispatch(failure(page))
		}

		function request(page) {
			return {
				type           : IdentityConstants.IDENTITY_ISSIGNEDIN_REQUEST,
				isFetching     : true,
				isAuthenticated: false,
				page           : page
			}
		}

		function success(page) {
			return {
				type           : IdentityConstants.IDENTITY_ISSIGNEDIN_SUCCESS,
				isFetching     : false,
				isAuthenticated: true,
				page           : page
			}
		}

		function failure(page) {
			return {
				type           : IdentityConstants.IDENTITY_ISSIGNEDIN_FAILURE,
				isFetching     : false,
				isAuthenticated: false,
				page           : page
			}
		}
	}
}

function handleAuthCheckFromSource() {

	let id_token = localStorage.getItem('id_token');
	let access_token = localStorage.getItem('access_token');
	let isAuthenticated = localStorage.getItem('isAuthenticated');
	let expires_at = localStorage.getItem('expires_at');
	let token = localStorage.getItem('token');
	let expires = localStorage.getItem('expires');
	let source = localStorage.getItem('source');
	let issuedAt= localStorage.getItem('issuedAt');

	let stateOfAuth = false;

	switch (source) {

		case "btw":
			if (typeof token !== 'undefined' && validateTokenValidity(expires, issuedAt)) {
				stateOfAuth = true;
				return stateOfAuth;
			}
			break;
		case "google":
			if ((expires_at >= Date.now()) && (typeof id_token !== 'undefined') && (isAuthenticated === 'true')
				&& (typeof access_token !== 'undefined')) {
				stateOfAuth = true;
				return stateOfAuth
			}

			break;

		default:
			return stateOfAuth;

	}
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


export default IdentityAction