import VoterContants from '../constants/VoterConstants';
import voterService from '../services/VoterService';
import appDataTypes from '../constants/AppDataTypes';

export function loadVoterList() {
    return (dispatch, getState) => {
        dispatch(actionRequest());
        setTimeout(() => {
            const { id, username } = getState().app[appDataTypes.profile].data;
            voterService.loadVoterList(id, username).then(
                response => {
                    dispatch(actionSuccess(response.data.voters));
                },
                error => {
                    dispatch(actionError(error.response.data.message));
                });
        }, 2000);
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
