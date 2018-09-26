import VoterContants from '../constants/reducerConstants/VoterConstants';
import BoardingTypes from '../constants/VoterBoardingType';
import voterService from '../services/VoterService';
import authStorage from '../storage/AuthStorage';
import { setBoardingType, voterDetailsPersist } from './VoterAction';
import routes from '../constants/Routes';
import history from '../utility/History';
import { initializeRequest, loadDataFailure, loadDataSuccess } from './AppAction';
import votingInfoConstants from '../constants/reducerConstants/VotingInfoConstants';

export function loadVoterList() {
    return dispatch => {
        dispatch(actionRequest());
        const { userid, email } = authStorage.getLoggedUser();
        return voterService.loadVoterList(userid, email).then(
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
        return voterService.updateVoter(data).then(
            result => {
                dispatch(actionSuccess(data));
            },
            error => {
                dispatch(actionError(error.response.data.message));
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
        data.userid = authStorage.getLoggedUser().userid;

        return voterService.addVoter(data).then(
            result => {
                dispatch(actionSuccess(data));
                dispatch(setBoardingType(BoardingTypes.voterList));
                const { ctRecords = [] } = result.data.data || {};
                if (ctRecords.length > 0) {
                    dispatch(voterDetailsPersist({ email: data.email }));
                    dispatch(addVotersToMatchList(ctRecords));
                    history.push(routes.matchList);
                    return;
                }
            },
            error => {
                dispatch(actionError(error.response.data.message));
            });
    };

    function addVotersToMatchList(data) {
        return { type: VoterContants.VOTER_MATCHLIST_PERSIST, matchList: data }
    }
    function actionSuccess(data) {
        return { type: VoterContants.VOTER_ADD_SUCCESS, data };
    }
    function actionError(error) {
        return { type: VoterContants.VOTER_ADD_ERROR, error };
    }
}

export function deleteVoter(data) {
    return dispatch => {
        return voterService.deleteVoter({ email: data.email }).then(
            result => {
                dispatch(actionSuccess(data));
            },
            error => {
                dispatch(actionError(error.response.data.message));
            });
    };

    function actionSuccess(data) {
        return { type: VoterContants.VOTER_DELETE_SUCCESS, data };
    }
    function actionError(error) {
        return { type: VoterContants.VOTER_DELETE_ERROR, error };
    }
}

export function loadVotingInfo(email, type) {
    return dispatch => {
        debugger;
        dispatch({
                type: votingInfoConstants.VOTING_INFO_REQUEST,
                dataType: type,
                email
            });

        let apiService = voterService.getReferendumInfo,
            resultsProp = 'results';

        switch (type) {
            case 'electionContest':
                apiService = voterService.getElectionInfo;
                resultsProp = 'electionContestsInfo';
                break;
            case 'pollingLocation':
                apiService = voterService.getPollingLocationInfo;
                resultsProp = 'pollingLocations';
                break;
        }

        return apiService(email).then(
            response => {
                dispatch({
                        type: votingInfoConstants.VOTING_INFO_SUCCESS,
                        data: response.data[resultsProp],
                        dataType: type,
                        email
                    });
            },
            error => {
                dispatch({
                        type: votingInfoConstants.VOTING_INFO_ERROR,
                        dataType: type,
                        error,
                        email
                    });
            })
    };
}
