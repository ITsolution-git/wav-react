import appDataTypes from './AppDataTypes';
import errorTypes from './ErrorTypesConstants';

export default {
    app: {
        [appDataTypes.signOn]: {},
        [appDataTypes.register]: {},
        [appDataTypes.profile]: {}
    },
    request: {},
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
    },
    user: {
        users: {},
        isFetching: false,
        isSuccess: false,
        isDeleteSuccess: false,
        isDeleting: false,
        error: null
    },
    error: {
        [errorTypes.emailExists]: false
    }
}
