import update from 'immutability-helper';

import VoterContants from '../constants/VoterConstants';
import InitialState from '../constants/InitialState';
import routes from '../constants/Routes';

export default function voterReducer(state = InitialState.voter, action) {
	switch (action.type) {
		case VoterContants.VOTER_MAKELIST_PERSIST: {
            return { ...state, makeList: action.makeList };
		}
        case VoterContants.VOTER_NEXT_MUMBER_PERSIST: {
        	const nextNumber = state.currentNumber + 1;
            return { ...state, currentNumber: nextNumber };
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
				matchList: action.matchList,
				matchListFetching: false,
                voterRoute: routes.matchList
            };
        }
		case VoterContants.VOTER_MATCHLIST_ERROR: {
			const route = action.error !== 'A voter with that email exists'
				? routes.voterError
				: '';
            return { ...state,
				matchListError: action.error,
				matchListFetching: false,
                voterRoute: route
            };
		}
		case VoterContants.VOTER_DETAILS_PERSIST: {
			const { voterDetails } = action;
			return update(state, { voterDetails: {
				[state.currentNumber]: { $set: voterDetails }
			}});
		}
		case VoterContants.VOTER_RESET_STATE: {
			return InitialState.voter;
		}
		default:
			return state
	}
}