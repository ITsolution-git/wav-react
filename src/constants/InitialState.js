import appDataTypes from './AppDataTypes';
import voterBoardingType from './VoterBoardingType';
import errorTypes from './ErrorTypesConstants';

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
    chats: {
        chats: [],
        selectedChatId: 0,
        isFetching: false,
        isSuccess: false,
        error: null
    },
    messages: {},
    request: {},
    user: {
        users: {},
        isFetching: false,
        isSuccess: false,
        isDeleteSuccess: false,
        isDeleting: false,
        error: null
    },
    userSearch: {
        voters: [],
        captains: [],
        isFetching: false,
        isVoterSuccess: false,
        isCaptainSuccess: false,
        voterError: null,
        captainError: null
    },
    transaction: {},
    error: {
        [errorTypes.emailExists]: false
    }
}