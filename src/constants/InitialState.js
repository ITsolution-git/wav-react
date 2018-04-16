import appDataTypes from './AppDataTypes';

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
        currentNumber: 1,
        matchListError: null,
        matchListFetching: false,
        matchList: []
    },
    voterList: {
        voters: [],
        count: 0,
        isFetching: false,
        isSuccess: false,
        error: null,
        updateVoterError: null,
        addVoterError: null,
        deleteVoterError: null
    },
    taskList: {
        tasks: [],
        count: 0,
        isFetching: false,
        isSuccess: false,
        error: null
    }
}