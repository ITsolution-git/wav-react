import { expect } from 'chai';

import appReducer from '../../reducers/AppReducer';
import AppConstants from '../../constants/AppConstants';
import AppDataTypes from '../../constants/AppDataTypes';
import initialState from '../../constants/InitialState';

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
        expect(appReducer(initialState.app, {})).to.deep.equal(initialState.app)
    });

    it('should handle getUserProfile request', () => {
        expect(appReducer(initialState.app, {
            type: AppConstants.INITIALIZE_REQUEST,
            dataType: AppDataTypes.profile
            }).profile.isFetching).to.be.true
    });

    it('should handle getUserProfile success', () => {
        expect(appReducer(initialState.app, {
            type: AppConstants.LOAD_DATA_SUCCESS,
            dataType: AppDataTypes.profile,
            data: response
        }).profile).to.deep.equal({
            isFetching: false,
            data: response,
            isSuccess: true,
            error: ''
        })
    });


    it('should handle getUserProfile failure', () => {
        expect(appReducer(initialState.app, {
            type: AppConstants.LOAD_DATA_FAILURE,
            dataType: AppDataTypes.profile,
            error
        }).profile).to.deep.equal({
            isFetching: false,
            data: {},
            isSuccess: false,
            error
        })
    });
});

describe('btwRegister', () => {

    it('should return the btwRegister request', () => {
        expect(appReducer(initialState.app, {
                type: AppConstants.INITIALIZE_REQUEST,
                dataType: AppDataTypes.register
            }).register.isFetching).to.be.true
    });

    it('should return the btwRegister success', () => {
        expect(appReducer(initialState.app, {
            type: AppConstants.LOAD_DATA_SUCCESS,
            dataType: AppDataTypes.register,
            data: response
        }).register).to.deep.equal({
            isFetching: false,
            data: response,
            isSuccess: true,
            error: ''
        })
    });

    it('should return the btwRegister failure', () => {
        expect(appReducer(initialState.app, {
            type: AppConstants.LOAD_DATA_FAILURE,
            dataType: AppDataTypes.register,
            error
        }).register).to.deep.equal({
            isFetching: false,
            data: {},
            isSuccess: false,
            error
        })
    });

});

describe('btwSignOn', ()=> {
    it('should return the btwSignOn request ', () => {
        expect(appReducer(initialState.app, {
                type: AppConstants.INITIALIZE_REQUEST,
                dataType: AppDataTypes.signOn
            }).signOn.isFetching).to.be.true
    });

    it('should return the btwSignOn success ', () => {
        expect(appReducer(initialState.app, {
            type: AppConstants.LOAD_DATA_SUCCESS,
            dataType: AppDataTypes.signOn,
            data: response
        }).signOn).to.deep.equal({
            isFetching: false,
            data: response,
            isSuccess: true,
            error: ''
        })
    });

    it('should return the btwSignOn failure ', () => {
        expect(appReducer(initialState.app, {
            type: AppConstants.LOAD_DATA_FAILURE,
            dataType: AppDataTypes.signOn,
            error
        }).signOn).to.deep.equal({
            isFetching: false,
            data: {},
            isSuccess: false,
            error
        })
    });
});