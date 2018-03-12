import isEqual from 'lodash/isequal'
import { expect } from 'chai';

import appReducer from '../../reducers/AppReducer';
import AppConstants from '../../constants/AppConstants';
import AppDataTypes from '../../constants/AppDataTypes';
import initialState from '../../constants/InitialState';

const identity = {
    username: "testUser",
    password: "password"
};
const response = {
    status: 200,
    message: 'success'
};

const error = {
    status: 503,
    message: 'something went wrong'
};

describe('getBtwUserProfile', () => {
    it('should return the appReducer initial state', () => {
        expect(isEqual(appReducer(initialState.app, {}), initialState.app)).to.be.true
    });

    it('should handle getUserProfile request', () => {
        expect(isEqual(appReducer(initialState.app, {
            type: AppConstants.INITIALIZE_REQUEST,
            dataType: AppDataTypes.profile
            }).profile.isFetching, true
        )).to.be.true
    });

    it('should handle getUserProfile success', () => {
        expect(isEqual(appReducer(initialState.app, {
            type: AppConstants.LOAD_DATA_SUCCESS,
            dataType: AppDataTypes.profile,
            data: response
        }).profile, {
            isFetching: false,
            data: response,
            isSuccess: true,
            error: ''
        })).to.be.true
    });


    it('should handle getUserProfile failure', () => {
        expect(isEqual(appReducer(initialState.app, {
            type: AppConstants.LOAD_DATA_FAILURE,
            dataType: AppDataTypes.profile,
            error
        }).profile, {
            isFetching: false,
            data: {},
            isSuccess: false,
            error
        })).to.be.true
    });
});

describe('btwRegister', () => {

    it('should return the btwRegister request', () => {
        expect(isEqual(appReducer(initialState.app, {
                type: AppConstants.INITIALIZE_REQUEST,
                dataType: AppDataTypes.register
            }).register.isFetching, true
        )).to.be.true
    });

    it('should return the btwRegister success', () => {
        expect(isEqual(appReducer(initialState.app, {
            type: AppConstants.LOAD_DATA_SUCCESS,
            dataType: AppDataTypes.register,
            data: response
        }).register, {
            isFetching: false,
            data: response,
            isSuccess: true,
            error: ''
        })).to.be.true
    });

    it('should return the btwRegister failure', () => {
        expect(isEqual(appReducer(initialState.app, {
            type: AppConstants.LOAD_DATA_FAILURE,
            dataType: AppDataTypes.register,
            error
        }).register, {
            isFetching: false,
            data: {},
            isSuccess: false,
            error
        })).to.be.true
    });

});

describe('btwSignOn', ()=> {
    it('should return the btwSignOn request ', () => {
        expect(isEqual(appReducer(initialState.app, {
                type: AppConstants.INITIALIZE_REQUEST,
                dataType: AppDataTypes.signOn
            }).signOn.isFetching, true
        )).to.be.true
    });

    it('should return the btwSignOn success ', () => {
        expect(isEqual(appReducer(initialState.app, {
            type: AppConstants.LOAD_DATA_SUCCESS,
            dataType: AppDataTypes.signOn,
            data: response
        }).signOn, {
            isFetching: false,
            data: response,
            isSuccess: true,
            error: ''
        })).to.be.true
    });

    it('should return the btwSignOn failure ', () => {
        expect(isEqual(appReducer(initialState.app, {
            type: AppConstants.LOAD_DATA_FAILURE,
            dataType: AppDataTypes.signOn,
            error
        }).signOn, {
            isFetching: false,
            data: {},
            isSuccess: false,
            error
        })).to.be.true
    });
});