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
        currentNumber: 1,
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