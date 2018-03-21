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
    }
}