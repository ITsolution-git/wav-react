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
    user: {
        users: {},
        count: 0,
        isFetching: false,
        isSuccess: false,
        error: null
    }
}