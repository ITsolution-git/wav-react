import {combineReducers} from "redux";
import IdentityConstants from "../constants/IdentityConstants";
import dateFromNum from 'date-from-num';
import GoogleConstants from "../constants/GoogleConstants";
import VoterContants from "../constants/VoterConstants";

/*let token = localStorage.getItem('token');
let tokenExpiryEpoc = localStorage.getItem('expires');
let existingTokenExpiryDate = dateFromNum(tokenExpiryEpoc);
let isValidToken = existingTokenExpiryDate <= Date.now();


const initialState = token ? {isFetching: false, isAuthenticated: isValidToken} : {};*/

export function setRedirectUrl(state = null, action) {

	switch (action.type) {

		case IdentityConstants.IDENTITY_REDIRECT_SUCCESS:
			return Object.assign({}, state, {
				urlToRedirect: action.url
			});


		default:
			return state

	}
}

export function btwSignOn(state = {}, action) {
	switch (action.type) {

		case IdentityConstants.IDENTITY_LOGIN_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
				user      : action.identity,
				source    : action.source
			});

		case IdentityConstants.IDENTITY_LOGIN_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				response  : action.response,
				source    : action.source,
				isError: action.isError
			});

		case IdentityConstants.IDENTITY_LOGIN_FAILURE:
			return Object.assign({}, state, {
				isFetching: false,
				error     : action.error,
				isError: action.isError,
				source: action.source
			});

		default:
			return state

	}
}

export function btwRegister(state = {}, action) {
	switch (action.type) {

		case IdentityConstants.IDENTITY_REGISTER_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
				identity: action.identity
			});

		case IdentityConstants.IDENTITY_REGISTER_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				response  : action.response
			});

		case IdentityConstants.IDENTITY_REGISTER_FAILURE:
			return Object.assign({}, state, {
				isFetching  : false,
				errorMessage: action.error
			});

		default:
			return state

	}
}

export function btwMakelist(state = {}, action) {

	switch (action.type) {

		case VoterContants.VOTER_MAKELIST_PERSIST:
			return Object.assign({}, state, {
				makelist: action.makelist
			});

		default:
			return state

	}
}

export function isSignedIn(state = {
	isAuthenticated: false
}, action) {
	switch (action.type) {

		case IdentityConstants.IDENTITY_ISSIGNEDIN_REQUEST:
			return Object.assign({}, state, {
				isFetching     : action.isFetching,
				isAuthenticated: action.isAuthenticated,
				source         : action.page
			});

		case IdentityConstants.IDENTITY_ISSIGNEDIN_SUCCESS:
			return Object.assign({}, state, {
				isFetching     : action.isFetching,
				isAuthenticated: action.isAuthenticated,
				page           : action.page
			});

		case IdentityConstants.IDENTITY_ISSIGNEDIN_FAILURE:
			return Object.assign({}, state, {
				isFetching     : action.isFetching,
				isAuthenticated: action.isAuthenticated,
				page           : action.page
			});

		default:
			return state

	}
}

export function getBtwUserProfile(state = {}, action) {
	switch (action.type) {

		case IdentityConstants.IDENTITY_BTW_USERPROFILE_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
				token     : action.token
			});

		case IdentityConstants.IDENTITY_BTW_USERPROFILE_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				response  : action.response
			});

		case IdentityConstants.IDENTITY_BTW_USERPROFILE_FAILURE:
			return Object.assign({}, state, {
				isFetching: false,
				error     : action.error
			});

		default:
			return state

	}
}


const IdentityReducer = combineReducers({
	setRedirectUrl,
	btwSignOn,
	btwRegister,
	isSignedIn,
	btwMakelist,
	getBtwUserProfile
})

export default IdentityReducer