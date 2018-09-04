
const core = require('../core');
let dataParser = require('../support/dataParser');
let createSignOnPage = require('../pages/signOnPage');
let createEmailPage = require('../pages/emailPage');
let createResetPasswordPage = require('../pages/resetPasswordPage');
let createTaskModal = require('../pages/latestTaskModal');
let createSignedOnHeader = require('../pages/signedOnHeader');

const generatePassword = () => {

	let UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
	let NUMBER = '0123456789';
	let SPECIAL = '!@#$%^&*';
	let generatedPassword = '';

	generatedPassword += UPPERCASE[ Math.floor(Math.random() * 26) ]
	generatedPassword += LOWERCASE[ Math.floor(Math.random() * 26) ]
	generatedPassword += UPPERCASE[ Math.floor(Math.random() * 26) ]
	generatedPassword += LOWERCASE[ Math.floor(Math.random() * 26) ]
	generatedPassword += NUMBER[ Math.floor(Math.random() * 10) ]
	generatedPassword += SPECIAL[ Math.floor(Math.random() * 8) ]
	generatedPassword += NUMBER[ Math.floor(Math.random() * 10) ]
	generatedPassword += SPECIAL[ Math.floor(Math.random() * 8) ]

	return generatedPassword
}

describe('Reset password end to end tests', ()=>{
	let signOnPage;
	let latestTaskModal;
	let signedOnHeader;
	let emailPage;
	let resetPasswordPage;


	let newPassword = generatePassword();
	const user = dataParser.findByTag('user reset password');

	beforeEach(()=>{
		signOnPage = createSignOnPage(core.driver());
		emailPage = createEmailPage(core.driver());
		latestTaskModal = createTaskModal(core.driver());
		resetPasswordPage = createResetPasswordPage(core.driver());
		signedOnHeader = createSignedOnHeader(core.driver());
	});

	it('Happy Path forgot/reset password task',  async ()=>{
		await signOnPage.openSignOnPage('staging');
		await signOnPage.validateForgotPasswordProcess(user);
		await signOnPage.openEmailPage('staging');
		await emailPage.resetPasswordStep(user);
		await resetPasswordPage.verifyUser(user);
		await resetPasswordPage.changePassword(newPassword);
		await signOnPage.verifySignOnPage();
		await signOnPage.checkResetPasswordResult();
		await signOnPage.validateSignOnProcess(user.email, newPassword);
		await latestTaskModal.validateWelcomeModalIsDisplayed();
		await latestTaskModal.dismissModal();
		await signedOnHeader.signOutUser();
	})
})
