import update from 'immutability-helper';

import VoterContants from '../constants/VoterConstants';
import InitialState from '../constants/InitialState';

export default function voterReducer(state = InitialState.voter, action) {
	switch (action.type) {
		case VoterContants.VOTER_MAKELIST_PERSIST: {
            return { ...state, makeList: action.makeList };
		}
        case VoterContants.VOTER_NEXT_MUMBER_PERSIST: {
            return { ...state, currentNumber: state.currentNumber++ };
        }
        case VoterContants.VOTER_MATCHLIST_PERSIST: {
            return { ...state, matchList: action.matchList };
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