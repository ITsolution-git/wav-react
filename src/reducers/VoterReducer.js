import update from 'immutability-helper';

import VoterConstants from '../constants/reducerConstants/VoterConstants';
import InitialState from '../constants/InitialState';
import routes from '../constants/Routes';

export default function voterReducer(state = InitialState.voter, action) {
	switch (action.type) {
		case VoterConstants.VOTER_MAKELIST_PERSIST: {
            return { ...state, makeList: action.makeList };
		}
        case VoterConstants.VOTER_NEXT_MUMBER_PERSIST: {
        	const nextNumber = state.currentNumber + 1;
            return { ...state, currentNumber: nextNumber, noResults: false };
        }
		case VoterConstants.VOTER_MATCHLIST_RESET: {
			return { ...state,
				matchList: [],
                matchListError: null,
                voterRoute: '',
                matchListFetching: false } ;
		}
		case VoterConstants.VOTER_MATCHLIST_REQUEST: {
			return { ...state,
				matchList: [],
				matchListError: null,
				matchListFetching: true
			};
		}
        case VoterConstants.VOTER_MATCHLIST_PERSIST: {
            return { ...state,
				matchList: action.matchList || [],
				matchListFetching: false,
                voterRoute: routes.matchList,
                noResults: action.noResults || false
            };
        }
		case VoterConstants.VOTER_MATCHLIST_ERROR: {
            return { ...state,
				matchListError: action.error,
				matchListFetching: false
            };
		}
		case VoterConstants.VOTER_DETAILS_PERSIST: {
			const { voterDetails } = action;
			return update(state, { voterDetails: { $set: voterDetails } });
		}
		case VoterConstants.VOTER_RESET_STATE: {
			return InitialState.voter;
		}
		case VoterConstants.VOTER_BOARDING_TYPE_PERSIST: {
            return { ...state, boardingType: action.boardingType }
		}
		case VoterConstants.VOTER_SELECT: {
            return { ...state, selected: true, voterDetails: action.payload }
		}
		case VoterConstants.VOTER_UN_SELECT: {
            return { ...state, selected: false }
		}
		default:
			return state
	}
}
