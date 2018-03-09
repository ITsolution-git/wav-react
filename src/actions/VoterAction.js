import VoterContants from '../constants/VoterConstants';

const VoterAction = {
	btwMakelist
};

function btwMakelist(makelist) {

	return dispatch => {
		return new Promise(resolve => {
			setTimeout(() => {
			  	resolve();
			}, 10);
		}).then(() => {
			dispatch(persist(makelist));
		});
	}

	function persist(makelist) {
		return {
			type           : VoterContants.VOTER_MAKELIST_PERSIST,
			makelist       : makelist,
		}
	}
}

export default VoterAction