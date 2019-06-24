import VoterConstants from '../constants/reducerConstants/VoterConstants';
import voterService from '../services/VoterService';
import authStorage from '../storage/AuthStorage';
import boardingTypes from '../constants/VoterBoardingType';
import routes from '../constants/Routes';
import history from '../utility/History';
import { isDesktop } from '../helpers/DeviceHelper';

let boardingInfo = {
    noResultsCount: 0,
    maxEmptyCount: 2,
    generateTask: true
};

export function makeListPersist(makeList) {
	return dispatch => {
	    dispatch(resetVoterState());
        dispatch(persist(makeList));
        dispatch(setBoardingType(boardingTypes.register));
	};

	function persist(makeList) {
		return { type: VoterConstants.VOTER_MAKELIST_PERSIST, makeList: makeList }
	}
}

export function voterDetailsPersist(details) {
    return dispatch => {
        dispatch(persist(details));
    };

    function persist(details) {
        return { type: VoterConstants.VOTER_DETAILS_PERSIST, voterDetails: details }
    }
}

export function resetMatchList() {
    return dispatch => {
        dispatch(actionReset());
    };

    function actionReset() {
        return { type: VoterConstants.VOTER_MATCHLIST_RESET }   ;
    }
}

export function matchListPersist(voterDetails, resubmit = false) {
    return (dispatch, getState) => {
    	const {
    	    currentNumber,
            makeList,
            boardingType
            } = getState().voter,
    		firstName = makeList[`${VoterConstants.FIRST_NAME_PREIX}${currentNumber}`],
			lastName = makeList[`${VoterConstants.LAST_NAME_PREFIX}${currentNumber}`];

    	voterDetails.firstname = voterDetails.firstname || firstName;
    	voterDetails.lastname = voterDetails.lastname || lastName;
    	voterDetails.userid = authStorage.getLoggedUser().userid;

        dispatch(actionRequest());
        const addVoterService = resubmit
            ? voterService.retryAdd
            : voterService.addVoter;

        return addVoterService(voterDetails).then(
           result => {
                const { data } = result.data;
                if (data) {
                    if (data.count === 0) {
                        boardingInfo.noResultsCount += 1;
                        let noResults = true;
                        if (boardingInfo.noResultsCount >= boardingInfo.maxEmptyCount) {
                            boardingInfo.noResultsCount = 0;
                            noResults = false;
                        }
                        if (isDesktop && boardingType !== boardingTypes.tasks) {
                            history.push(`${routes.voterNotFoundError}?noResults=${noResults}`);
                        } else {
                            dispatch(actionNoResults(noResults));
                        }
                        return;
                    }
                    dispatch(actionSuccess(data.ctRecords ));
                }
           },
           error => {
               dispatch(actionError(error.response.data.message));
           }
        );
    };

    function actionRequest() {
        return { type: VoterConstants.VOTER_MATCHLIST_REQUEST };
    }
    function actionSuccess(matchList) {
        return { type: VoterConstants.VOTER_MATCHLIST_PERSIST, matchList }
    }
    function actionNoResults(noResults) {
        return { type: VoterConstants.VOTER_MATCHLIST_PERSIST, noResults }
    }
    function actionError(error) {
        return { type: VoterConstants.VOTER_MATCHLIST_ERROR, error }
    }
}

export function registerVoter(voter) {
    return (dispatch, getState) => {
        const { voterDetails } = getState().voter;

        const patchData = {
            userid: authStorage.getLoggedUser().userid,
            email: voterDetails.email,
            catalist_voter_information: voter,
            registration_metadata: {
                isRegistered: true,
                voterStatus: voter.voterstatus
            }
        };
        voterService.updateRegisteredVoter(patchData).then(
            result => {
                dispatch(updateVoter(patchData));
            },
            error => {}
        );
        boardingInfo.generateTask = false;
    };

     function updateVoter(data) {
        return { type: VoterConstants.VOTER_UPDATE_SUCCESS, data };
    }
}

function generateTaskForUser(boardingType, resubmit) {
    if (boardingType === boardingTypes.register && !resubmit) {
        voterService.generateTaskForUser().then(response => {}, error => {});
    }
}

export function nextNumberPersist() {
    if (boardingInfo.generateTask) {
        generateTaskForUser(boardingTypes.register);
    }
    boardingInfo.generateTask = true;
    boardingInfo.noResultsCount = 0;
    return dispatch => {
        dispatch(persist());
    };

    function persist() {
        return { type: VoterConstants.VOTER_NEXT_MUMBER_PERSIST }
    }
}

export function resetVoterState() {
    return dispatch => {
        dispatch(persist());
    };

    function persist() {
        return { type: VoterConstants.VOTER_RESET_STATE }
    }
}


export function setBoardingType(type) {
    return dispatch => {
        dispatch(persist(type));
    };

    function persist(type) {
        return { type: VoterConstants.VOTER_BOARDING_TYPE_PERSIST, boardingType: type }
    }
}

export function selectVoter(voter) {
    return dispatch => {
        dispatch(persist(voter))
    }

    function persist(voter) {
        return { type: VoterConstants.VOTER_SELECT, payload: voter }
    }
}

export function deSelectVoter() {
    return dispatch => {
        dispatch(persist())
    }

    function persist() {
        return { type: VoterConstants.VOTER_UN_SELECT }
    }
}