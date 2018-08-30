/**
 *  Created by KennethObikwelu on 8/23/18.
 */



const core = require('../core');
let urlFetcher = require('../support/dataParser');
let createSignOnPage = require('../pages/signOnPage');


describe('Task end to end tests', ()=>{
	let signOnPage;

	const user = urlFetcher.findByTag('end to end happy path');

	beforeEach(()=>{
		signOnPage = createSignOnPage(core.driver());
	});

/*
	it('Happy Path onboarding',  async ()=>{

	})

	it('Happy Path onboarding - add more information for 1st user',  async ()=>{

	})

	it('Happy Path onboarding - add more information for 2nd user',  async ()=>{

	})

	it('Happy Path onboarding - add more information for 3rd user',  async ()=>{

	})

	it('Happy Path onboarding - get all 3 matches ',  async ()=>{

	})*/
})
