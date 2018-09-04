/**
 *  Created by KennethObikwelu on 8/23/18.
 */


const core = require('../core');
let dataParser = require('../support/dataParser');
let createSignOnPage = require('../pages/signOnPage');

describe('Update profile end to end tests', ()=>{

	const user = dataParser.findByTag('end to end happy path');

	beforeEach(()=>{
		signOnPage = createSignOnPage(core.driver());
	});


	it('Happy Path update user profile',  async ()=>{
		await signOnPage.openSignOnPage('staging');
		await signOnPage.validateSignOnProcess(user.email, user.password);
		await latestTaskModal.validateWelcomeModalIsDisplayed();
		await latestTaskModal.dismissModal();
		await dashboardPage.validateDashboard();
		await signedOnHeader.openUpdateProfilePage();
		await signedOnHeader.signoutProcess();
	})
})
