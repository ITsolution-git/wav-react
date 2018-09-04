/**
 *  Created by KennethObikwelu on 8/23/18.
 */


const core = require('../core');
let dataParser = require('../support/dataParser');

let createSignOnPage 			= require('../pages/signOnPage');
let createRegisterPage 		= require('../pages/registerPage');
let createOnBoardingPages 	= require('../pages/onboardingPage');
let createTaskModal 			= require('../pages/latestTaskModal');
let createDashboardPage 	= require('../pages/dashboardPage');
let createSignedOnHeader 	= require('../pages/signedOnHeader');

describe('Onboarding end to end tests', ()=>{

	const newUser = dataParser.findByTag('new user signup');
	let voters = dataParser.findByTag('new voters').voters

	beforeEach(()=>{
		signOnPage 				= createSignOnPage(core.driver());
		registerPage 			= createRegisterPage(core.driver());
		onBoardingPages 	= createOnBoardingPages(core.driver());
		latestTaskModal 	= createTaskModal(core.driver());
		dashboardPage 		= createDashboardPage(core.driver());
		signedOnHeader 		= createSignedOnHeader(core.driver());
	});


	it('****************************************** Happy Path onBoarding',  async () => {
		await signOnPage.openSignOnPage('staging');
		await signOnPage.openRegisterPage();
		await registerPage.registerNewAccount(newUser);
		await registerPage.shortListThreeVoters(voters);
		await onBoardingPages.enterMoreDetailsForVoter('0', voters);
		// select one voter from matches
		await onBoardingPages.enterMoreDetailsForVoter('1', voters);
		// select one voter from matches
		await onBoardingPages.enterMoreDetailsForVoter('2', voters);
		// select one voter from matches
		await onBoardingPages.validateGotoNextProcess();
		// validate dashboard
		await latestTaskModal.validateWelcomeModalIsDisplayed();
		await latestTaskModal.dismissModal();
		await signedOnHeader.closeAccount(newUser);
		// signout
	})

	/*it('Happy Path onboarding - add more information for 1st user',  async ()=>{

	})

	it('Happy Path onboarding - add more information for 2nd user',  async ()=>{

	})

	it('Happy Path onboarding - add more information for 3rd user',  async ()=>{
		;
	})

	it('Happy Path onboarding - get all 3 matches ',  async ()=>{

	})

	it('Happy Path onboarding - remove test user ',  async ()=>{

	})*/
})
