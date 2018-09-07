import update from 'immutability-helper';

import VoterContants from '../constants/reducerConstants/VoterConstants';
import InitialState from '../constants/InitialState';
import routes from '../constants/Routes';

export default function voterReducer(state = InitialState.voter, action) {
	switch (action.type) {
		case VoterContants.VOTER_MAKELIST_PERSIST: {
            return { ...state, makeList: action.makeList };
		}
        case VoterContants.VOTER_NEXT_MUMBER_PERSIST: {
        	const nextNumber = state.currentNumber + 1;
            return { ...state, currentNumber: nextNumber, noResults: false };
        }
		case VoterContants.VOTER_MATCHLIST_RESET: {
			return { ...state,
				matchList: [],
                matchListError: null,
                voterRoute: '',
                matchListFetching: false } ;
		}
		case VoterContants.VOTER_MATCHLIST_REQUEST: {
			return { ...state,
				matchList: [],
				matchListError: null,
				matchListFetching: true
			};
		}
        case VoterContants.VOTER_MATCHLIST_PERSIST: {
            return { ...state,
				matchList: action.matchList || [],
				matchListFetching: false,
                voterRoute: routes.matchList,
                noResults: action.noResults
            };
        }
		case VoterContants.VOTER_MATCHLIST_ERROR: {
            return { ...state,
				matchListError: action.error,
				matchListFetching: false,
				voterRoute: routes.voterNotFoundError
            };
		}
		case VoterContants.VOTER_DETAILS_PERSIST: {
			const { voterDetails } = action;
			return update(state, { voterDetails: { $set: voterDetails } });
		}
		case VoterContants.VOTER_RESET_STATE: {
			return InitialState.voter;
		}
		case VoterContants.VOTER_BOARDING_TYPE_PERSIST: {
            return { ...state, boardingType: action.boardingType }
		}
		default:
			return state
	}
}
