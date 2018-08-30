/**
 *  Created by KennethObikwelu on 8/23/18.
 */


const core = require('../core');
let urlFetcher = require('../support/dataParser');

let createSignOnPage 			= require('../pages/signOnPage');
let createRegisterPage 		= require('../pages/registerPage');
let createOnBoardingPages 	= require('../pages/onboardingPage');
let createTaskModal 			= require('../pages/latestTaskModal');
let createDashboardPage 	= require('../pages/dashboardPage');
let createSignedOnHeader 	= require('../pages/signedOnHeader');

describe('Onboarding end to end tests', ()=>{
	let signOnPage;
	let registerPage;
	let onBoardingPages;
	let latestTaskModal;
	let dashboardPage;
	let signedOnHeader;

	const newUser = urlFetcher.findByTag('new user signup');

	beforeEach(()=>{
		signOnPage 				= createSignOnPage(core.driver());
		registerPage 			= createRegisterPage(core.driver());
		onBoardingPages 		= createOnBoardingPages(core.driver());
		latestTaskModal 	= createTaskModal(core.driver());
		dashboardPage 		= createDashboardPage(core.driver());
		signedOnHeader 		= createSignedOnHeader(core.driver());
	});


	it('****************************************** Happy Path onBoarding',  async () => {
		await signOnPage.openSignOnPage('staging');
		await signOnPage.openRegisterPage();
		await registerPage.registerNewAccount(newUser);
		await registerPage.shortListThreeVoters(newUser);
		await onBoardingPages.enterMoreDetailsForVoter('1');
		//select one voter from matches
		await onBoardingPages.enterMoreDetailsForVoter('2');
		//select one voter from matches
		await onBoardingPages.enterMoreDetailsForVoter('3');
		//select one voter from matches
		await onBoardingPages.validateGotoNextProcess();
		//validate dashboard
		//signout
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
