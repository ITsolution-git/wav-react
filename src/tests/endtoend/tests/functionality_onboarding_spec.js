/**
 *  Created by KennethObikwelu on 8/23/18.
 */


const core = require('../core');
let urlFetcher = require('../support/dataParser');

let createSignOnPage 			= require('../pages/signOnPage');
let createRegisterPage 		= require('../pages/registerPage');
let createOnboardingPage 	= require('../pages/onboardingPage');
let createTaskModal 			= require('../pages/latestTaskModal');
let createDashboardPage 	= require('../pages/dashboardPage');
let createSignedOnHeader 	= require('../pages/signedOnHeader');

describe('Onboarding end to end tests', ()=>{

	const newUser = urlFetcher.findByTag('new user signup');

	beforeEach(()=>{
		signOnPage 				= createSignOnPage(core.driver());
		registerPage 			= createRegisterPage(core.driver());
		onboardingPage 		= createOnboardingPage(core.driver());
		latestTaskModal 	= createTaskModal(core.driver());
		dashboardPage 		= createDashboardPage(core.driver());
		signedOnHeader 		= createSignedOnHeader(core.driver());
	});


	it('Happy Path onboarding',  async () => {
		await signOnPage.openSignOnPage('staging');
		await signOnPage.openRegisterPage();
		await registerPage.validateRegisterInputProcess(newUser);
		await registerPage.validateMakelistInputProcess();
	})

	it('Happy Path onboarding - add more information for 1st user',  async ()=>{
		await onboardingPage.validateOnboardingInputProcess('1');
		await onboardingPage.validateGotoNextProcess();
	})

	it('Happy Path onboarding - add more information for 2nd user',  async ()=>{
		await onboardingPage.validateOnboardingInputProcess('2');
		await onboardingPage.validateGotoNextProcess();
	})

	it('Happy Path onboarding - add more information for 3rd user',  async ()=>{
		await onboardingPage.validateOnboardingInputProcess('3');
		await onboardingPage.validateGotoNextProcess();
	})

	it('Happy Path onboarding - get all 3 matches ',  async ()=>{
		await onboardingPage.validateFinishProcess();
		await latestTaskModal.validateWelcomeModalIsDisplayed();
		await latestTaskModal.dismissModal();
		await dashboardPage.validateOnboardingResultProcess('3');
	})

	it('Happy Path onboarding - remove test user ',  async ()=>{
		await signedOnHeader.closeAccount();
		await signOnPage.verifySignOnPage();
	})
})
