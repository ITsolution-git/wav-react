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
    	const {
    	    currentNumber,
            makeList,
            boardingType
    	} = getState().voter,
    		firstName = makeList[`${VoterContants.FIRST_NAME_PREIX}${currentNumber}`],
			lastName = makeList[`${VoterContants.LAST_NAME_PREFIX}${currentNumber}`];

    	voterDetails.firstname = voterDetails.firstname || firstName;
    	voterDetails.lastname = voterDetails.lastname || lastName;
    	voterDetails.userid = authStorage.getLoggedUser().userid;

        dispatch(actionRequest());
        const addVoterService = resubmit
            ? voterService.retryAdd
            : voterService.addVoter;

        generateTaskForUser(boardingType, resubmit);

        return addVoterService(voterDetails).then(
           result => {
                result = {
                    "data": {
                        "status": 200,
                        "message": "voter verification process was successful",
                        "data": {
                            "count": 2,
                            "ctRecords": [
                                {
                                    "dwid": "98513356",
                                    "matchRate": 0.91818184,
                                    "distanceScore": null,
                                    "distance": null,
                                    "matchMethod": "name",
                                    "firstname": "DIANE",
                                    "middlename": "T",
                                    "lastname": "SCHUSTER",
                                    "namesuffix": null,
                                    "gender": "female",
                                    "birthdate": "1944-08-29",
                                    "regaddrline1": "347 TAYLOR DR",
                                    "regaddrline2": "",
                                    "regaddrcity": "CLAREMONT",
                                    "regaddrstate": "CA",
                                    "regaddrzip": "91711",
                                    "mailaddrline1": "347 TAYLOR DR",
                                    "mailaddrline2": "",
                                    "mailaddrcity": "CLAREMONT",
                                    "mailaddrstate": "CA",
                                    "mailaddrzip": "91711",
                                    "phone": null,
                                    "voterstatus": "active",
                                    "additionalProperties": {}
                                },
                                {
                                    "dwid": "186301137",
                                    "matchRate": 0.91818184,
                                    "distanceScore": null,
                                    "distance": null,
                                    "matchMethod": "name",
                                    "firstname": "DIANE",
                                    "middlename": "LOUISE",
                                    "lastname": "SCHUSTER",
                                    "namesuffix": null,
                                    "gender": "female",
                                    "birthdate": "1935-01-16",
                                    "regaddrline1": "254 CLOVER WAY",
                                    "regaddrline2": "",
                                    "regaddrcity": "NAPA",
                                    "regaddrstate": "CA",
                                    "regaddrzip": "94558",
                                    "mailaddrline1": "254 CLOVER WAY",
                                    "mailaddrline2": "",
                                    "mailaddrcity": "NAPA",
                                    "mailaddrstate": "CA",
                                    "mailaddrzip": "94558",
                                    "phone": null,
                                    "voterstatus": "active",
                                    "additionalProperties": {}
                                }
                            ]
                        }
                    },
                    "status": 200,
                    "statusText": "OK",
                    "headers": {
                        "content-type": "application/json; charset=utf-8"
                    },
                    "config": {
                        "transformRequest": {},
                        "transformResponse": {},
                        "timeout": 0,
                        "xsrfCookieName": "XSRF-TOKEN",
                        "xsrfHeaderName": "X-XSRF-TOKEN",
                        "maxContentLength": -1,
                        "headers": {
                            "Accept": "application/json, text/plain, */*",
                            "Content-Type": "application/json",
                            "x-key": "test@test.com",
                            "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3N1ZXIiOiJodHRwczovL3N0YWdpbmctYnR3LXVpLTE4Lmhlcm9rdWFwcC5jb20iLCJpc3N1ZWRBdCI6MTUzNjE2MjY5MTIyOSwiZXhwaXJlc0F0IjoxNTM2MjQ5MDkxMjI5LCJyb2xlIjoiY2FwdGFpbiIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInVzZXJpZCI6IjVhNjk5MWJiZDM5OWRjMDAwNDUyY2Y5ZSJ9.RLacPoCj-VOJEeXjhWEP4PrR_Ncq1ZBZGB8GbyPwKZQ"
                        },
                        "method": "post",
                        "url": "https://staging-btw-api-18.herokuapp.com/api/v1/retryAddVoter",
                        "data": "{\"email\":\"ssss@mail.com\",\"city\":\"Lviv\",\"state\":\"CA\",\"firstname\":\"Diane\",\"lastname\":\"Schuster\",\"userid\":\"5a6991bbd399dc000452cf9e\"}"
                    },
                    "request": {}
                }

                const { data } = result.data;
                if (data) {
                    boardingInfo.noResultsCount = data.count === 0 ? boardingInfo.noResultsCount + 1 : 0;
                    if (boardingInfo.noResultsCount >= boardingInfo.maxEmptyCount) {
                        boardingInfo.noResultsCount = 0;
                        history.push(routes.voterNotFoundError);
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
        generateTaskForUser(boardingType);
    };

     function updateVoter(data) {
        return { type: VoterContants.VOTER_UPDATE_SUCCESS, data };
    }
}

function generateTaskForUser(boardingType, resubmit) {
    if (boardingType === boardingTypes.register && !resubmit) {
        voterService.generateTaskForUser().then(response => {}, error => {});
    }
}

export function nextNumberPersist() {
    boardingInfo.noResultsCount = 0;
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
