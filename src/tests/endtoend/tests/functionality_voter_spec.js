
const core = require('../core');
let urlFetcher = require('../support/dataParser');
let createSignOnPage = require('../pages/signOnPage');
let createTaskModal = require('../pages/latestTaskModal');
let createDashboardPage = require('../pages/dashboardPage');

describe('Voter end to end tests', ()=>{
	const user = urlFetcher.findByTag('end to end happy path');

	beforeEach(()=>{
		signOnPage = createSignOnPage(core.driver());
		latestTaskModal = createTaskModal(core.driver());
		dashboardPage = createDashboardPage(core.driver());
	});

	it('Happy Path add/remove voter',  async ()=>{
		await signOnPage.openSignOnPage('staging');
		await signOnPage.validateSignOnProcess(user.email, user.password);
		await latestTaskModal.validateWelcomeModalIsDisplayed();
		await latestTaskModal.dismissModal();
		await dashboardPage.validateDashboard();
		await dashboardPage.goToVoterPage();
		await dashboardPage.validateVotersPage();
		await dashboardPage.addVoterProcess();
		await dashboardPage.validateAddVoterProcess();
	})
})
