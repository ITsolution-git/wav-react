import { expect } from 'chai';
import voterReducer from '../../reducers/VoterReducer';
import VoterContants from '../../constants/VoterConstants';
import InitialState from '../../constants/InitialState';
import routes from '../../constants/Routes';

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
        expect(voterReducer(InitialState.voter, {})).to.deep.equal(InitialState.voter)
    });
});

describe('makeList', () => {
	it('should return the makeList persist', () => {
		expect(voterReducer(InitialState.voter, {
			type: VoterContants.VOTER_MAKELIST_PERSIST,
			makeList: makelist
			})).to.deep.equal({... InitialState.voter, ... { makeList: makelist }})
	});
});

describe('nextNumber', () => {
    it('should return the next voter number persist', () => {
        expect(voterReducer(InitialState.voter, {
                type: VoterContants.VOTER_NEXT_MUMBER_PERSIST,
            })).to.deep.equal({... InitialState.voter, ... { currentNumber: 2 }})
    });
});

describe('voterDetails', () => {
    it('should return voter details persist', () => {
        expect(voterReducer(InitialState.voter, {
                type: VoterContants.VOTER_DETAILS_PERSIST,
                voterDetails
            })).to.deep.equal({... InitialState.voter, ... { voterDetails: { 1: voterDetails } }})
    });
});

describe('matchList', () => {
    it('should return match list persist', () => {
        expect(voterReducer(InitialState.voter, {
                type: VoterContants.VOTER_MATCHLIST_PERSIST,
                matchList
            })).to.deep.equal({... InitialState.voter, ... {
                matchList,
                voterRoute: routes.matchList
            }})
    });
});