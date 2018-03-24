import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
	makeListPersist,
    voterDetailsPersist,
    matchListPersist,
    nextNumberPersist,
    resetVoterState
} from '../../actions/VoterAction';
import VoterContants from '../../constants/VoterConstants';
import InitialState from "../../constants/InitialState";


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/* Voter actions tests */
describe('makelist', () => {

	describe('Persist makelist', () => {

		const makelist = {
			"firstname1" 	: "firstname1",
			"lastname1" 	: "lastname1",
			"firstname2"    : "firstname2",
			"lastname3"		: "lastname2",
			"firstname3" 	: "firstname3",
			"lastname3" 	: "lastname3",
			"firstname4"    : "firstname4",
			"lastname4"		: "lastname4",
		};

		it('it should dispatch two actions', () => {

			const expectedActions = [
				{
					type: VoterContants.VOTER_RESET_STATE
				},
				{
					type: VoterContants.VOTER_MAKELIST_PERSIST,
					makeList: makelist
				},
			];
			const store = mockStore(InitialState);

			store.dispatch( makeListPersist( makelist ) );
            expect(store.getActions()).to.deep.equal(expectedActions);
		})
	})
});

describe('voterDetails', () => {

    describe('Persist makelist', () => {

        const voterDetails = {
            address: "Morozna st. 21",
            birthday: "1988",
            city: "New York",
            email: "volod.vinichuk@gmail.com",
            gender: "Male",
            phone: "",
            state: "CA",
            zip: "79066"
        };

        it('it should dispatch action', () => {

            const expectedActions = [
                {
                    type: VoterContants.VOTER_DETAILS_PERSIST,
                    voterDetails: voterDetails
                },
            ];
            const store = mockStore(InitialState);

            store.dispatch( voterDetailsPersist( voterDetails ) );
            expect(store.getActions()).to.deep.equal(expectedActions);
        })
    })
});

describe('matchList', () => {

    describe('Persist matchList', () => {

        const voterDetails = {
            address: "Morozna st. 21",
            birthday: "1988",
            city: "New York",
            email: "volod.vinichuk@gmail.com",
            gender: "Male",
            phone: "",
            state: "CA",
            zip: "79066"
        };

        const matchList = [
            {
                "matchRate": 0.8076923,
                "firstname": "DIANE1",
                "lastname": "TURNER1",
                "regaddrline1": "922 E ADAMS BLVD",
                "regaddrline2": "APT 9",
                "regaddrcity": "LOS ANGELES",
                "regaddrstate": "CA",
                "voterstatus": "active"
            },
            {
                "matchRate": 0.9,
                "firstname": "DIANE2",
                "lastname": "TURNER2",
                "regaddrline1": "922 E ADAMS BLVD",
                "regaddrline2": "APT 9",
                "regaddrcity": "LOS ANGELES",
                "regaddrstate": "CA",
                "voterstatus": "active"
            },
            {
                "matchRate": 0.89,
                "firstname": "DIANE3",
                "lastname": "TURNER3",
                "regaddrline1": "922 E ADAMS BLVD",
                "regaddrline2": "APT 9",
                "regaddrcity": "LOS ANGELES",
                "regaddrstate": "CA",
                "voterstatus": "offline"
            },
            {
                "matchRate": 0.81,
                "firstname": "DIANE4",
                "lastname": "TURNER4",
                "regaddrline1": "922 E ADAMS BLVD",
                "regaddrline2": "APT 9",
                "regaddrcity": "LOS ANGELES",
                "regaddrstate": "CA",
                "voterstatus": "active"
            }
        ];

        it('it should dispatch two actions', () => {

            const expectedActions = [
				{
					type: VoterContants.VOTER_MATCHLIST_PERSIST,
                    matchList: []
				},
                {
                    type: VoterContants.VOTER_MATCHLIST_PERSIST,
                    matchList: matchList
                },
            ];
            const store = mockStore(InitialState);

            store.dispatch( matchListPersist( voterDetails ));
            expect(store.getActions()).to.deep.equal(expectedActions);
        })
    })
});

describe('nextNumber', () => {
    describe('nextNumber test', () => {
        it('it should dispatch action', () => {

            const expectedActions = [
                {
                    type: VoterContants.VOTER_NEXT_MUMBER_PERSIST,
                },
            ];
            const store = mockStore(InitialState);

            store.dispatch( nextNumberPersist() );
            expect(store.getActions()).to.deep.equal(expectedActions);
        })
    })
});

describe('resetVoterState', () => {

    describe('reset voter State ', () => {
        it('it should dispatch action', () => {

            const expectedActions = [
                {
                    type: VoterContants.VOTER_RESET_STATE,
                },
            ];
            const store = mockStore(InitialState);

            store.dispatch( resetVoterState() );
            expect(store.getActions()).to.deep.equal(expectedActions);
        })
    })
});
