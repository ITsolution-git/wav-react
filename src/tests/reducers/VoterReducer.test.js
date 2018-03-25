import isEqual from 'lodash/isequal'
import { expect } from 'chai';
import voterReducer from '../../reducers/VoterReducer';
import VoterContants from '../../constants/VoterConstants';
import InitialState from '../../constants/InitialState';

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

describe('initialState', () => {
    it('should return the voter initial state', () => {
        expect(isEqual(voterReducer(InitialState.voter, {}), InitialState.voter)).to.be.true
    });
});

describe('makeList', () => {
	it('should return the makeList persist', () => {
		expect(isEqual(voterReducer(InitialState.voter, {
			type: VoterContants.VOTER_MAKELIST_PERSIST,
			makeList: makelist
			}), {... InitialState.voter, ... { makeList: makelist }}
		)).to.be.true
	});
});

describe('nextNumber', () => {
    it('should return the next voter number persist', () => {
        expect(isEqual(voterReducer(InitialState.voter, {
                type: VoterContants.VOTER_NEXT_MUMBER_PERSIST,
            }), {... InitialState.voter, ... { currentNumber: 2 }}
        )).to.be.true
    });
});

describe('voterDetails', () => {
    it('should return voter details persist', () => {
        expect(isEqual(voterReducer(InitialState.voter, {
                type: VoterContants.VOTER_DETAILS_PERSIST,
                voterDetails
            }), {... InitialState.voter, ... { voterDetails: { 1: voterDetails } }}
        )).to.be.true
    });
});

describe('matchList', () => {
    it('should return match list persist', () => {
        expect(isEqual(voterReducer(InitialState.voter, {
                type: VoterContants.VOTER_MATCHLIST_PERSIST,
                matchList
            }), {... InitialState.voter, ... { matchList }}
        )).to.be.true
    });
});