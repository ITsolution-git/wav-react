import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import {
    loadVoterList,
    addVoter,
    updateVoter,
    deleteVoter
} from '../../actions/VoterListAction';
import VoterContants from '../../constants/VoterConstants';
import InitialState from "../../constants/InitialState";
import {testApiHost} from "../../config/ApiConfig";
import userAuthenticator from '../shared/UserAuthenticator';

userAuthenticator.loginCaptain();

/* Voter List actions tests */
describe('loadVoterList', () => {
     it('it should dispatch success', () => {
         const response = {
                 "status": 200,
                 "message": "voters retrieval successful",
                 "voters": [
                     {
                         "_id": "5ab9c40e233f1a0460c4dbf0",
                         "email": "test1Voter@shane.com",
                         "firstname": "Laur",
                         "lastname": "MCCAIN",
                         "state": "AZ",
                         "gender": "female",
                         "city": "San Ramon",
                         "address": "San Ramon",
                         "phonenumber": "6657746453",
                         "userid": {
                             "oid": "5a6991bbd399dc000452cf9e"
                         },
                         "registration_metadata": {
                             "isRegistered": false,
                             "voterStatus": null
                         }
                     },
                     {
                         "_id": "5ab9c45a233f1a0460c4dbf2",
                         "email": "testThreeVoter@shane.com",
                         "firstname": "peter",
                         "lastname": "haliday",
                         "state": "TX",
                         "gender": "male",
                         "city": "San Ramon",
                         "address": "1 aCme street",
                         "phonenumber": "6657746453",
                         "userid": {
                             "oid": "5a6991bbd399dc000452cf9e"
                         },
                         "registration_metadata": {
                             "isRegistered": false,
                             "voterStatus": null
                         }
                     }
                 ]
             };

         let mockAdapter = new MockAdapter(axios);
         mockAdapter.onGet(`${testApiHost}/api/v1/getVoters?userid=5a6991bbd399dc000452cf9e&username=testUser`).reply(200, {
             data: {
                 response
             }
         });

        const expectedActions = [
            {
                type: VoterContants.VOTER_LIST_REQUEST
            },
            {
                type: VoterContants.VOTER_LIST_SUCCESS,
                voters: response.voters
            },
        ];
        const store = mockStore(InitialState);

        store.dispatch(loadVoterList()).then(() => {
             expect(expectedActions).to.deep.equal(expectedActions)
        });
    });

    it('it should dispatch a failure', () => {
        const response = {
            "status": 422,
            "message": "Parameters mismatch"
        };

        let mockAdapter = new MockAdapter(axios);
        mockAdapter.onGet(`${testApiHost}/api/v1/getVoters?userid=5a6991bbd399dc000452cf9e&username=testUser`).reply(422, {
            data: {
                response
            }
        });

        const expectedActions = [
            {
                type: VoterContants.VOTER_LIST_REQUEST
            },
            {
                type: VoterContants.VOTER_LIST_ERROR,
                error: response.message
            },
        ];
        const store = mockStore(InitialState);

        store.dispatch(loadVoterList()).then(() => {
            expect(expectedActions).to.deep.equal(expectedActions)
        });
    })
});

