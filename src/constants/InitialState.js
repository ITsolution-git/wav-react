import appDataTypes from './AppDataTypes';
import voterBoardingType from './VoterBoardingType';

export default {
    app: {
        [appDataTypes.signOn]: {},
        [appDataTypes.register]: {},
        [appDataTypes.profile]: {}
    },
    voter: {
        makeList: {},
        voterDetails: {},
        voterRoute: '',
        boardingType: voterBoardingType.register,
        currentNumber: 1,
        matchListError: null,
        matchListFetching: false,
        matchList: []
    },
    voterList: {
        voters: [],
        isFetching: false,
        isSuccess: false,
        error: null,
        updateVoterError: null,
        addVoterError: null,
        deleteVoterError: null
    },
    taskList: {
        tasks: [],
        isFetching: false,
        isSuccess: false,
        error: null
    }
}