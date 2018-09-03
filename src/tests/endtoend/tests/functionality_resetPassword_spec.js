
const core = require('../core');
let createSignOnPage = require('../pages/signOnPage');
let createEmailPage = require('../pages/emailPage');
let createResetPasswordPage = require('../pages/resetPasswordPage');

describe('Reset password end to end tests', ()=>{
	let signOnPage;

	beforeEach(()=>{
		signOnPage = createSignOnPage(core.driver());
		emailPage = createEmailPage(core.driver());
		resetPasswordPage = createResetPasswordPage(core.driver());
	});

	it('Happy Path forgot/reset password task',  async ()=>{
		await signOnPage.openSignOnPage('staging');
		await signOnPage.validateForgotPasswordProcess();
		await signOnPage.openEmailPage('staging');
		await emailPage.resetPasswordStep();
		await resetPasswordPage.verifyUser();
		await resetPasswordPage.changePassword();
	})
})
