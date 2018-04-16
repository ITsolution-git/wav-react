import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import { btwRegister, getBtwUserProfile } from '../../actions/SignOnAction';
import AppConstants from '../../constants/AppConstants';
import AppDataTypes from '../../constants/AppDataTypes';
import config from '../../config/ApiConfig';

import userAuthenticator from '../shared/UserAuthenticator';
import VoterContants from "../../constants/VoterConstants";
import boardingTypes from "../../constants/VoterBoardingType";

describe('getBtwUserProfile tests', () => {
    userAuthenticator.loginCaptain();
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
	};

	it('it should dispatch a success', () => {
		let mockAdapter = new MockAdapter(axios);
		mockAdapter.onGet(`${config.apiHost}/api/v1/getUser`).reply(200, response);

		const expectedActions = [
            {
                dataType: AppDataTypes.profile,
                type: AppConstants.INITIALIZE_REQUEST
            },
            {
                dataType: AppDataTypes.profile,
                type: AppConstants.LOAD_DATA_SUCCESS,
                data: response.userInformation
            }
		];
		const store = mockStore({response : []});
		return store.dispatch(getBtwUserProfile()).then(() => {
			expect(store.getActions()).to.deep.equal(expectedActions)
		})
	})

});

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
				"username": "testing",
        		"email": "testUser@test.com",
				"firstname": "john",
				"lastname": "test",
				"role": "captain",
				"dateofbirth": "2000-01-22T03:39:04.459Z",
				"address": "1550 Acme street",
				"phonenumber": "7765564732"
			}
		}

		it('it should dispatch a success', () => {
			let mockAdapter = new MockAdapter(axios);
			mockAdapter.onPost(`${config.apiHost}/user/login`).reply(200, {});
			mockAdapter.onPost(`${config.apiHost}/user/register`).reply(200, response);

			const expectedActions = [
				{
                    dataType: AppDataTypes.register,
                    type: AppConstants.INITIALIZE_REQUEST
				},
				{
                    dataType: AppDataTypes.signOn,
                    type: AppConstants.INITIALIZE_REQUEST
				},
                {
                    type: VoterContants.VOTER_BOARDING_TYPE_PERSIST,
                    boardingType: boardingTypes.voterList
                }
			];

			const store = mockStore({response : []});
			return store.dispatch(btwRegister( request ) ).then( () => {
				expect(store.getActions()).to.deep.equal(expectedActions)
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
			mockAdapter.onPost(`${config.apiHost}/user/register`).reply(400,error);

			const expectedActions = [
                {
                    dataType: AppDataTypes.register,
                    type: AppConstants.INITIALIZE_REQUEST
                },
                {
                    dataType: AppDataTypes.register,
                    type: AppConstants.LOAD_DATA_FAILURE,
					data: undefined,
                    error
                }
			]
			const store = mockStore({response : []});
			return store.dispatch(btwRegister( request ) ).then( () => {
				expect(store.getActions()).to.deep.equal(expectedActions)
			})
		})
	})
})