/**
 *  Created by KennethObikwelu on 8/23/18.
 */

const core = require('../core');
let urlFetcher = require('../support/dataParser');
let createSignOnPage = require('../pages/signOnPage');

describe('Voter end to end tests', ()=>{
	let signOnPage;

	const user = urlFetcher.findByTag('end to end happy path');

	beforeEach(()=>{
		signOnPage = createSignOnPage(core.driver());
	});


	/*it('Happy Path add voter',  async ()=>{

	})

	it('Happy Path delete voter',  async ()=>{

	})

	it('Happy Path update voter',  async ()=>{

	})*/
})
