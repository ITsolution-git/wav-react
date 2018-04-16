import { expect } from 'chai';
import voterListReducer from '../../reducers/VoterListReducer';
import VoterContants from '../../constants/VoterConstants';
import InitialState from '../../constants/InitialState';

const voters = [
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
];

describe('initialState', () => {
    it('should return the voter list initial state', () => {
        expect(voterListReducer(InitialState.voterList, {})).to.deep.equal(InitialState.voterList)
    });
});

describe('loadVoterList', () => {
    it('should return loadVoterList request pending', () => {
        const actualResult = voterListReducer(InitialState.voterList, {
                type: VoterContants.VOTER_LIST_REQUEST
            }),
            expectedResult = {... InitialState.voterList, ...{ isFetching: true }};

        expect(actualResult).to.deep.equal(expectedResult)
    });

    it('should return loadVoterList success', () => {
        const actualResult = voterListReducer(InitialState.voterList, {
                type: VoterContants.VOTER_LIST_SUCCESS,
                voters
            }),
            expectedResult = {... InitialState.voterList, ...{ isFetching: false, isSuccess: true, voters, count: 2 }};

        expect(actualResult).to.deep.equal(expectedResult)
    });

    it('should return loadVoterList failure', () => {
        const  error = 'Something went wrong';
        const actualResult = voterListReducer(InitialState.voterList, {
                type: VoterContants.VOTER_LIST_ERROR,
                error
            }),
            expectedResult = {... InitialState.voterList, ...{ isFetching: false, isSuccess: false, error }};

        expect(actualResult).to.deep.equal(expectedResult)
    });
});

describe('add voter', () => {
    it('should return addVoter success', () => {
        const actualResult = voterListReducer(InitialState.voterList, {
                type: VoterContants.VOTER_ADD_SUCCESS,
                data: voters[0]
            }),
            expectedResult = {...InitialState.voterList, ...{ voters: [voters[0]] }};
        expect(actualResult).to.deep.equal(expectedResult)
    });

    it('should return addVoter failure', () => {
        const  error = 'Something went wrong';
        const actualResult = voterListReducer(InitialState.voterList, {
                type: VoterContants.VOTER_ADD_ERROR,
                error
            }),
            expectedResult = {... InitialState.voterList, ...{ addVoterError: error }};

        expect(actualResult).to.deep.equal(expectedResult)
    });
});

describe('delete voter', () => {
    it('should return deleteVoter success', () => {
        const actualResult = voterListReducer({...InitialState.voterList, voters }, {
                type: VoterContants.VOTER_DELETE_SUCCESS,
                data: voters[0]
            }),
            expectedResult = {...InitialState.voterList, ...{ voters: [voters[1]] }};

        expect(actualResult).to.deep.equal(expectedResult)
    });

    it('should return deleteVoter failure', () => {
        const  error = 'Something went wrong';
        const actualResult = voterListReducer(InitialState.voterList, {
                type: VoterContants.VOTER_DELETE_ERROR,
                error
            }),
            expectedResult = {... InitialState.voterList, ...{ deleteVoterError: error }};

        expect(actualResult).to.deep.equal(expectedResult)
    });
});


describe('update voter', () => {
    it('should return updateVoter success', () => {
        const voterToUpdate = voters[0];
              voterToUpdate.firstname = 'test1';
              voterToUpdate.lastname = 'test2';
        const expectedVoters = [...voters];
              expectedVoters[0] = voterToUpdate;

        const actualResult = voterListReducer({...InitialState.voterList, voters }, {
                type: VoterContants.VOTER_UPDATE_SUCCESS,
                data: voterToUpdate
            }),
            expectedResult = {...InitialState.voterList, ...{ voters: expectedVoters }};

        expect(actualResult).to.deep.equal(expectedResult)
    });

    it('should return updateVoter failure', () => {
        const  error = 'Something went wrong';
        const actualResult = voterListReducer(InitialState.voterList, {
                type: VoterContants.VOTER_UPDATE_ERROR,
                error
            }),
            expectedResult = {... InitialState.voterList, ...{ updateVoterError: error }};

        expect(actualResult).to.deep.equal(expectedResult)
    });
});
