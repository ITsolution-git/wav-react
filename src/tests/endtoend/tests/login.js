/**
 *  Created by KennethObikwelu on 8/16/18.
 */


let test = require("selenium-webdriver/testing");

let core = require ('../core');
let createSignOnPage = require('../pages/signOnPage');

test.describe('Validate login', ()=>{
	let signOnPage;

	test.beforeEach(()=>{
		console.log('in here 2');
		signOnPage = createSignOnPage(core.driver());
		console.log(signOnPage)
	});


	//add credentials for successful login
	test.it('Login successfully', async (done)=>{
		console.log('in here 2');
		await signOnPage.openSignOnPage('staging');
		//signOnPage.validateSignOnProcess();
		done();
	})
})

