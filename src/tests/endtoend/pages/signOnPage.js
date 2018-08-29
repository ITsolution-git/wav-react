/**
 *  Created by KennethObikwelu on 8/16/18.
 */

let core = require('../core');
let urlFetcher = require('../support/dataParser');
let expect = require('chai').expect;
let helper = require('../support/helper')

module.exports = (driver) => {


	let signOnPage = {
		email			: core.automate.By.id('email'),
		password	: core.automate.By.id('password'),
		login   	: core.automate.By.className('btw-button'),
		signup   	: core.automate.By.id('link-large')
	}

	let openSignOnPage =  async (url) => {
		try {
			 await driver.get(urlFetcher.retrieveUrl(url).url);
		} catch (error) {
			if (error instanceof core.automate.error.NoSuchElementError){
				expect(false).to.be.true
			}else {
				console.log(error)
				expect(false).to.be.true
			}
		}
	}
	let validateSignOnProcess =   async (...args) => {
		try {
			  await driver.findElement(signOnPage.email).sendKeys(args[0]);
			  await driver.findElement(signOnPage.password).sendKeys(args[1]);
			  await driver.findElement(signOnPage.login).click();
		}catch(error){
			if (error instanceof core.automate.error.NoSuchElementError){
				//do nothing
			}else {
				console.log(error)
				expect(false).to.be.true
			}
		}

	};

	let verifySignOnPage = async () => {
		try {
			await helper.timeout(1000);
			await driver.findElement(signOnPage.email);
			await driver.findElement(signOnPage.password);
			await driver.findElement(signOnPage.login);
		}catch(error){
			if (error instanceof core.automate.error.NoSuchElementError){
				expect(false).to.be.true
			}else {
				console.log(error)
				expect(false).to.be.true
			}
		}

	};

	let openRegisterPage = async () => {
		try {
			let signup = await driver.findElement(signOnPage.signup);
			signup.click()
		} catch(error) {
			if (error instanceof core.automate.error.NoSuchElementError){
				console.log(error)
				expect(false).to.be.true
			}else {
				console.log(error)
				expect(false).to.be.true
			}
		}
	}

	return {
		openSignOnPage,
		validateSignOnProcess,
		verifySignOnPage,
		openRegisterPage
	}
}