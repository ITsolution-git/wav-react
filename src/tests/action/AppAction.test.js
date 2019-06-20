import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import { signUpWitMail, getBtwUserProfile } from '../../actions/AuthActions';
import AppConstants from '../../constants/reducerConstants/AppConstants';
import AppDataTypes from '../../constants/AppDataTypes';
import config from '../../config/ApiConfig';

import userAuthenticator from '../shared/UserAuthenticator';

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
		mockAdapter.onPost(`${config.apiHost}/auth/getUser`).reply(200, response);

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
