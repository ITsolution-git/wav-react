import isEqual from 'lodash/isequal'
import {expect} from 'chai';
import { btwMakelist } from "../../reducers/VoterReducer";
import VoterContants from "../../constants/VoterConstants";


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

describe('btwMakelist', () => {

	it('should return the btwMakelist initial state', () => {
		expect(isEqual(btwMakelist({}, {}), {})).to.be.true
	});

	it('should return the btwMakelist persist', () => {
		expect(isEqual(btwMakelist({}, {
			type           : VoterContants.VOTER_MAKELIST_PERSIST,
			makelist	   : makelist
		}), {
			makelist       : makelist
		})).to.be.true
	});
})