import VoterContants from '../constants/VoterConstants';
import voterService from '../services/VoterService';
import authStorage from '../storage/AuthStorage';

export function loadVoterList() {
    return dispatch => {
        dispatch(actionRequest());
        const { userid, username } = authStorage.getLoggedUser();
        voterService.loadVoterList(userid, username).then(
            response => {
                dispatch(actionSuccess(response.data.voters));
            },
            error => {
                dispatch(actionError(error.response.data.message));
            });
    };

    function actionRequest() {
        return { type: VoterContants.VOTER_LIST_REQUEST };
    }
    function actionSuccess(voters) {
        return { type: VoterContants.VOTER_LIST_SUCCESS, voters };
    }
    function actionError(error) {
        return { type: VoterContants.VOTER_LIST_ERROR, error };
    }
}


export function updateVoter(data) {
    return dispatch => {
        voterService.updateVoter(data).then(
            result => {
                dispatch(actionSuccess(data));
            },
            error => {
                dispatch(actionError(error));
            });
    };

    function actionSuccess(data) {
        return { type: VoterContants.VOTER_UPDATE_SUCCESS, data };
    }
    function actionError(error) {
        return { type: VoterContants.VOTER_UPDATE_ERROR, error };
    }
}

export function addVoter(data) {
    return dispatch => {
        data.userid = {
            oid: authStorage.getLoggedUser().userid
        };

        actionSuccess(data);
        // voterService.addVoter(data).then(
        //     result => {
        //         dispatch(actionSuccess(data));
        //     },
        //     error => {
        //         dispatch(actionError(error));
        //     });
    };

    function actionSuccess(data) {
        return { type: VoterContants.VOTER_ADD_SUCCESS, data };
    }
    function actionError(error) {
        return { type: VoterContants.VOTER_ADD_ERROR, error };
    }
}

export function deleteVoter(data) {
    return dispatch => {
        dispatch(actionSuccess(data));
        // voterService.deleteVoter(data).then(
        //     result => {
        //         dispatch(actionSuccess(data));
        //     },
        //     error => {
        //         dispatch(actionError(error));
        //     });
    };

    function actionSuccess(data) {
        return { type: VoterContants.VOTER_DELETE_SUCCESS, data };
    }
    function actionError(error) {
        return { type: VoterContants.VOTER_DELETE_ERROR, error };
    }
}