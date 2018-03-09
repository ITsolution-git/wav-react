import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import VoterAction from "../../actions/VoterAction";
import VoterContants from "../../constants/VoterConstants";


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/* Test Makelist */
describe('btwMakelist', () => {

	/* Persist Test */
	describe('Persist makelist', () => {

		const makelist = {
			"firstname1" 	: "firstname1",
			"lastname1" 	: "lastname1",
			"firstname2"    : "firstname2",
			"lastname3"		: "lastname2",
			"firstname3" 	: "firstname3",
			"lastname3" 	: "lastname3",
			"firstname4"    : "firstname4",
			"lastname4"		: "lastname4",
		}

		it('it should dispatch a success', () => {

			const expectedActions = [
				{
					type       	   : VoterContants.VOTER_MAKELIST_PERSIST,
					makelist       : makelist
				},
			]
			const store = mockStore({response : []});
			return store.dispatch( VoterAction.btwMakelist( makelist ) ).then( () => {
				expect(store.getActions()).to.deep.equal(expectedActions)
			} )
		})
	})
})