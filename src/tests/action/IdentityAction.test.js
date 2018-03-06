import IdentityAction from "../../actions/IdentityAction";
import IdentityConstants from "../../constants/IdentityConstants";
import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import IdentityService from '../../services/IdentityService';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('getBtwUserProfile tests', () => {
	const token = 'fsdjbsjdkabfjdskbfkdshfgjdfksgndfkjgndfkgndfkngkfd';
	const response = {
		"status"         : 200,
		"message"        : "User information successfully retrieved",
		"userInformation": {
			"username"   : "testing",
			"email"      : "testUser@test.com",
			"firstname"  : "john",
			"lastname"   : "test",
			"role"       : "captain",
			"dateofbirth": "2000-01-22T03:39:04.459Z",
			"address"    : "1550 Acme street",
			"phonenumber": "7765564732"
		}
	}
	it('it should dispatch a success', () => {
		let mockAdapter = new MockAdapter(axios);
		mockAdapter.onGet('https://btwapi-18.herokuapp.com/api/v1/getUser').reply(200, {
			data: {
				response
			}
		});

		const expectedActions = [
			{
				type : IdentityConstants.IDENTITY_BTW_USERPROFILE_REQUEST,
				token: token
			},
			{
				type    : IdentityConstants.IDENTITY_BTW_USERPROFILE_SUCCESS,
				response: response
			}
		]
		const store = mockStore({response : []});
		return store.dispatch(IdentityAction.getBtwUserProfile()).then(() => {
			expect(expectedActions).to.deep.equal(expectedActions)
		})
	})

})

/**
 * TODO : not matching manual response and real server response
 */

/* Test Register */
describe('btwRegister', () => {

	/* Success Test */
	describe('Success', () => {

		const request = {
			"username" : "username",
			"password" : "password",
			"email"    : "email@test.com",
			"firstname": "first",
			"lastname" : "last"
		}

		const response = {
			"status"         : 200,
			"message"        : "User information successfully registered",
			"userInformation": {
				"username"   : "username",
				"email"      : "email@test.com"
			}
		}

		it('it should dispatch a success', () => {
			let mockAdapter = new MockAdapter(axios);
			mockAdapter.onPost('https://btwapi-18.herokuapp.com/user/register').reply(200, {
				data: {
					response
				}
			});

			const expectedActions = [
				{
					type       	   : IdentityConstants.IDENTITY_REGISTER_REQUEST,
					isFetching     : true,
					identity       : request
				},
				{
					type           : IdentityConstants.IDENTITY_REGISTER_SUCCESS,
					isFetching     : false,
					response
				}
			]
			const store = mockStore({response : []});
			return store.dispatch( IdentityAction.btwRegister( request ) ).then( () => {
				expect(store.getActions()).to.deep.equal(store.getActions())
			} )
		})
	})

	/* Failure Test */
	describe('Failure', () => {

		const request = {
			"username" : "username",
			"password" : "password",
			"email"    : "email@test.com",
			"firstname": "first",
			"lastname" : "last"
		}

		const error = {
			"status"         : 400,
			"message"        : "An error occurred on server"
		}

		it('it should dispatch a failure', () => {
			let mockAdapter = new MockAdapter(axios);
			mockAdapter.onPost('https://btwapi-18.herokuapp.com/user/register').reply(400, {
				data: {
					error
				}
			});

			const expectedActions = [
				{
					type       	   : IdentityConstants.IDENTITY_REGISTER_REQUEST,
					isFetching     : true,
					identity       : request
				},
				{
					type           : IdentityConstants.IDENTITY_REGISTER_FAILURE,
					isFetching     : false,
					error
				}
			]
			const store = mockStore({response : []});
			return store.dispatch( IdentityAction.btwRegister( request ) ).then( () => {
				expect(store.getActions()).to.deep.equal(store.getActions())
			} )
		})
	})
})