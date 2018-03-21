import VoterContants from '../constants/VoterConstants';

export function makeListPersist(makeList) {
	return dispatch => {
	    dispatch(resetVoterState());
        dispatch(persist(makeList));
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

export function matchListPersist(voterDetails) {
    return (dispatch, getState) => {
    	const { currentNumber, makeList } = getState().voter,
    		firstName = makeList[`${VoterContants.FIRST_NAME_PREIX}${currentNumber}`],
			lastName = makeList[`${VoterContants.LAST_NAME_PREFIX}${currentNumber}`];
    	// clear previous match list
    	dispatch(persist([]));

    	// call to match list service will be here
    	const matchList = [
    		{
				"matchRate": 0.8076923,
				"firstname": "DIANE1",
				"lastname": "TURNER1",
				"regaddrline1": "922 E ADAMS BLVD",
				"regaddrline2": "APT 9",
				"regaddrcity": "LOS ANGELES",
				"regaddrstate": "CA",
				"voterstatus": "active"
        	},
            {
                "matchRate": 0.9,
                "firstname": "DIANE2",
                "lastname": "TURNER2",
                "regaddrline1": "922 E ADAMS BLVD",
                "regaddrline2": "APT 9",
                "regaddrcity": "LOS ANGELES",
                "regaddrstate": "CA",
                "voterstatus": "active"
            },
            {
                "matchRate": 0.89,
                "firstname": "DIANE3",
                "lastname": "TURNER3",
                "regaddrline1": "922 E ADAMS BLVD",
                "regaddrline2": "APT 9",
                "regaddrcity": "LOS ANGELES",
                "regaddrstate": "CA",
                "voterstatus": "offline"
            },
            {
                "matchRate": 0.81,
                "firstname": "DIANE4",
                "lastname": "TURNER4",
                "regaddrline1": "922 E ADAMS BLVD",
                "regaddrline2": "APT 9",
                "regaddrcity": "LOS ANGELES",
                "regaddrstate": "CA",
                "voterstatus": "active"
            }
        ];
    	// update with new data
        dispatch(persist(matchList));
    };

    function persist(matchList) {
        return { type: VoterContants.VOTER_MATCHLIST_PERSIST, matchList }
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