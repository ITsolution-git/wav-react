/**
 *  Created by KennethObikwelu on 8/16/18.
 */


let core = require ('../core');
let createSignOnPage = require('../pages/signOnPage');

describe('Validate login', ()=>{
	let signOnPage;

	beforeEach(()=>{
		signOnPage = createSignOnPage(core.driver());
	});


	//add credentials for successful login
	it('Login successfully', ()=>{
		console.log('in here 2');
		signOnPage.openSignOnPage('staging');
		//signOnPage.validateSignOnProcess();
	})
})

