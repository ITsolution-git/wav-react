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
import boardingtypes from '../../constants/VoterBoardingType';
import InitialState from "../../constants/InitialState";
import config from "../../config/ApiConfig";
import userAuthenticator from '../shared/UserAuthenticator';

userAuthenticator.loginCaptain();

/* Voter List actions tests */
const votersResponse = {
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

const mockAdapter = new MockAdapter(axios);

describe('loadVoterList', () => {
    it('it should dispatch success', () => {
        mockAdapter.onGet(`${config.apiHost}/api/v1/getVoters?userid=5a6991bbd399dc000452cf9e&username=testUser`).reply(200, votersResponse );

        const expectedActions = [
            {
                type: VoterContants.VOTER_LIST_REQUEST
            },
            {
                type: VoterContants.VOTER_LIST_SUCCESS,
                voters: votersResponse.voters
            },
        ];
        const store = mockStore(InitialState);

        return store.dispatch(loadVoterList()).then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions)
        });
    });

    it('it should dispatch a failure', () => {
        const response = {
            "status": 422,
            "message": "Parameters mismatch"
        };

        mockAdapter.onGet(`${config.apiHost}/api/v1/getVoters?userid=5a6991bbd399dc000452cf9e&username=testUser`).reply(422, response);

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

        return store.dispatch(loadVoterList()).then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions)
        });
    })
});

describe('updateVoter', () => {
    const voterToUpdate = votersResponse.voters[0];
    it('it should dispatch success', () => {
        const response = {
            "status": 200,
            "message": "Voter update successful"
        };

        mockAdapter.onPatch(`${config.apiHost}/api/v1/updateVoter`).reply(200, response);

        const expectedActions = [
            {
                type: VoterContants.VOTER_UPDATE_SUCCESS,
                data: voterToUpdate
            }
        ];
        const store = mockStore(InitialState);

        return store.dispatch(updateVoter(voterToUpdate)).then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions)
        });
    });

    it('it should dispatch a failure', () => {
        const response = {
            "status": 401,
            "message": "Unauthorized"
        };

        mockAdapter.onPatch(`${config.apiHost}/api/v1/updateVoter`).reply(401, response);

        const expectedActions = [
            {
                type: VoterContants.VOTER_UPDATE_ERROR,
                error: response.message
            },
        ];
        const store = mockStore(InitialState);

        return store.dispatch(updateVoter()).then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions)
        });
    })
});


describe('addVoter', () => {
    const voterToAdd = votersResponse.voters[0];
    it('it should dispatch success', () => {
        const response = {
            "status": 200,
            "message": "Voter add successful"
        };

        mockAdapter.onPost(`${config.apiHost}/api/v1/addVoter`).reply(200, response);

        const expectedActions = [
            {
                type: VoterContants.VOTER_ADD_SUCCESS,
                data: voterToAdd
            },
            {
                type: VoterContants.VOTER_BOARDING_TYPE_PERSIST,
                boardingType: boardingtypes.voterList
            }
        ];
        const store = mockStore(InitialState);

        return store.dispatch(addVoter(voterToAdd)).then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions)
        });
    });

    it('it should dispatch a failure', () => {
        const response = {
            "status": 401,
            "message": "Unauthorized"
        };

        mockAdapter.onPost(`${config.apiHost}/api/v1/addVoter`).reply(401, response);

        const expectedActions = [
            {
                type: VoterContants.VOTER_ADD_ERROR,
                error: response.message
            },
        ];
        const store = mockStore(InitialState);

        return store.dispatch(addVoter({})).then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions)
        });
    })
});

describe('deleteVoter', () => {
    const voterToDelete = votersResponse.voters[0];
    it('it should dispatch success', () => {
        const response = {
            "status": 200,
            "message": "Voter delete successful"
        };

        mockAdapter.onDelete(`${config.apiHost}/api/v1/deleteVoter`).reply(200, response);

        const expectedActions = [
            {
                type: VoterContants.VOTER_DELETE_SUCCESS,
                data: voterToDelete
            }
        ];
        const store = mockStore(InitialState);

        return store.dispatch(deleteVoter(voterToDelete)).then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions)
        });
    });

    it('it should dispatch a failure', () => {
        const response = {
            "status": 401,
            "message": "Unauthorized"
        };

        mockAdapter.onDelete(`${config.apiHost}/api/v1/deleteVoter`).reply(401, response);

        const expectedActions = [
            {
                type: VoterContants.VOTER_DELETE_ERROR,
                error: response.message
            },
        ];
        const store = mockStore(InitialState);

        return store.dispatch(deleteVoter({})).then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions)
        });
    })
});