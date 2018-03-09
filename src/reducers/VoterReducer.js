import {combineReducers} from "redux";
import VoterContants from "../constants/VoterConstants";

export function btwMakelist(state = {}, action) {

	switch (action.type) {

		case VoterContants.VOTER_MAKELIST_PERSIST:
			return Object.assign({}, state, {
				makelist: action.makelist
			});

		default:
			return state

	}
}

const VoterReducer = combineReducers({
	btwMakelist
})

export default VoterReducer