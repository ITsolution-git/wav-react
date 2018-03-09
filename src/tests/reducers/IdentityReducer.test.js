
import {getBtwUserProfile, isSignedIn, btwRegister, btwSignOn, btwMakelist} from "../../reducers/IdentityReducer";
import IdentityConstants from '../../constants/IdentityConstants'
import isEqual from 'lodash/isequal'
import {expect} from 'chai';
import VoterContants from "../../constants/VoterConstants";


const identity = {
	username: "testUser",
	password: "password"
}
const response = {
	status: 200,
	message: 'success'
}

const error = {
	status: 503,
	message: 'something went wrong'
}

const makelist = {
	"firstname1" 	: "firstname1",
	"lastname1" 	: "lastname1",
	"firstname2"    : "firstname2",
	"lastname3"		: "lastname2",
	"firstname3" 	: "firstname3",
	"lastname3" 	: "lastname3",
	"firstname4"    : "firstname4",
	"lastname4"		: "lastname4",
}

describe('getBtwUserProfile', () => {

	const token = 'fdsbkfjsdbfkjbsdkfhbjskdfkjsdhkfds';

	it('should return the getUserProfile initial state', () => {
		expect(isEqual(getBtwUserProfile({}, {}), {})).to.be.true
	});

	it('should handle getUserProfile request', () => {
		expect(isEqual(getBtwUserProfile({}, {
			type : IdentityConstants.IDENTITY_BTW_USERPROFILE_REQUEST,
			token: token
		}), {
			isFetching: true,
			token     : token
		})).to.be.true
	});

	it('should handle getUserProfile success', () => {
		expect(isEqual(getBtwUserProfile({}, {
			type    : IdentityConstants.IDENTITY_BTW_USERPROFILE_SUCCESS,
			response: response
		}), {
			isFetching: false,
			response  : response
		})).to.be.true
	});

	it('should handle getUserProfile failure', () => {
		expect(isEqual(getBtwUserProfile({}, {
			type: IdentityConstants.IDENTITY_BTW_USERPROFILE_FAILURE,
			error: error
		}), {
			isFetching: false,
			error     : error
		})).to.be.true
	});


})

describe('btwRegister', () => {

	it('should return the btwRegister initial state', () => {
		expect(isEqual(btwRegister({}, {}), {})).to.be.true
	});

	it('should return the btwRegister request', () => {
		expect(isEqual(btwRegister({}, {
			type           : IdentityConstants.IDENTITY_REGISTER_REQUEST,
			isFetching     : true,
			identity       : identity
		}), {
			isFetching: true,
			identity     : identity
		})).to.be.true
	});

	it('should return the btwRegister success', () => {
		expect(isEqual(btwRegister({}, {
			type           : IdentityConstants.IDENTITY_REGISTER_SUCCESS,
			isFetching     : false,
			response
		}), {
			isFetching: false,
			response  : response
		})).to.be.true
	});

	it('should return the btwRegister failure', () => {
		expect(isEqual(btwRegister({}, {
			type           : IdentityConstants.IDENTITY_REGISTER_FAILURE,
			isFetching     : false,
			error
		}), {
			isFetching  : false,
			errorMessage: error
		})).to.be.true
	});

})

describe('btwMakelist', () => {

	it('should return the btwMakelist initial state', () => {
		expect(isEqual(btwMakelist({}, {}), {})).to.be.true
	});

	it('should return the btwMakelist persist', () => {
		expect(isEqual(btwMakelist({}, {
			type           : VoterContants.VOTER_MAKELIST_PERSIST,
			makelist	   : makelist
		}), {
			makelist       : makelist
		})).to.be.true
	});
})

describe('btwSignOn', ()=> {
	const source = 'btw';

	it('should return the btwRegister initial state', () => {
		expect(isEqual(btwSignOn({}, {}), {})).to.be.true
	});

	it('should return the btwRegister request ', () => {
		expect(isEqual(btwSignOn({}, {
			type      : IdentityConstants.IDENTITY_LOGIN_REQUEST,
			isFetching: true,
			source    : source,
			identity
		}), {
			isFetching: true,
			user      : identity,
			source    : source
		})).to.be.true
	});

	it('should return the btwRegister success ', () => {
		expect(isEqual(btwSignOn({}, {
			type      : IdentityConstants.IDENTITY_LOGIN_SUCCESS,
			isFetching: false,
			source    : source,
			response  : response,
			isError: false
		}), {
			isFetching: false,
			response  : response,
			source    : source,
			isError: false
		})).to.be.true
	});

	it('should return the btwRegister failure ', () => {
		expect(isEqual(btwSignOn({}, {
			type      : IdentityConstants.IDENTITY_LOGIN_FAILURE,
			isFetching: false,
			source    : source,
			error     : error,
			isError: true
		}), {
			isFetching: false,
			error     : error,
			isError: true,
			source: source
		})).to.be.true
	});

})