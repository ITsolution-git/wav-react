import VoterContants from '../constants/reducerConstants/VoterConstants';
import voterService from '../services/VoterService';
import authStorage from '../storage/AuthStorage';
import boardingTypes from '../constants/VoterBoardingType';
import routes from '../constants/Routes';
import history from '../utility/History';

let boardingInfo = {
    noResultsCount: 0,
    maxEmptyCount: 2
};

export function makeListPersist(makeList) {
	return dispatch => {
	    dispatch(resetVoterState());
        dispatch(persist(makeList));
        dispatch(setBoardingType(boardingTypes.register));
	};

	function persist(makeList) {
		return { type: VoterContants.VOTER_MAKELIST_PERSIST, makeList: makeList }
	}
}

export function voterDetailsPersist(details) {
    return dispatch => {
        dispatch(persist(details));
    };

    function persist(details) {
        return { type: VoterContants.VOTER_DETAILS_PERSIST, voterDetails: details }
    }
}

export function resetMatchList() {
    return dispatch => {
        dispatch(actionReset());
    };

    function actionReset() {
        return { type: VoterContants.VOTER_MATCHLIST_RESET }   ;
    }
}

export function matchListPersist(voterDetails, resubmit = false) {
    return (dispatch, getState) => {
    	const { currentNumber, makeList } = getState().voter,
    		firstName = makeList[`${VoterContants.FIRST_NAME_PREIX}${currentNumber}`],
			lastName = makeList[`${VoterContants.LAST_NAME_PREFIX}${currentNumber}`];

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
                    boardingInfo.noResultsCount = data.count === 0 ? boardingInfo.noResultsCount + 1 : 0;
                    if (boardingInfo.noResultsCount >= boardingInfo.maxEmptyCount) {
                        boardingInfo.noResultsCount = 0;
                        history.push(routes.voterError);
                        return;
                    }

                    dispatch(actionSuccess(data.ctRecords));
                }
           },
           error => {
               dispatch(actionError(error.response.data.message));
           }
        );
    };

    function actionRequest() {
        return { type: VoterContants.VOTER_MATCHLIST_REQUEST };
    }
    function actionSuccess(matchList) {
        return { type: VoterContants.VOTER_MATCHLIST_PERSIST, matchList }
    }
    function actionError(error) {
        return { type: VoterContants.VOTER_MATCHLIST_ERROR, error }
    }
}

export function registerVoter(voter) {
    return (dispatch, getState) => {
        const { voterDetails, boardingType } = getState().voter;

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
        if (boardingType !== boardingTypes.tasks ) {
            voterService.generateTaskForUser().then(response => {}, error => {});
        }
    };

    function updateVoter(data) {
        return { type: VoterContants.VOTER_UPDATE_SUCCESS, data };
    }
}

export function nextNumberPersist() {
    return dispatch => {
        dispatch(persist());
    };

    function persist() {
        return { type: VoterContants.VOTER_NEXT_MUMBER_PERSIST }
    }
}

export function resetVoterState() {
    return dispatch => {
        dispatch(persist());
    };

    function persist() {
        return { type: VoterContants.VOTER_RESET_STATE }
    }
}


export function setBoardingType(type) {
    return dispatch => {
        dispatch(persist(type));
    };

    function persist(type) {
        return { type: VoterContants.VOTER_BOARDING_TYPE_PERSIST, boardingType: type }
    }
}