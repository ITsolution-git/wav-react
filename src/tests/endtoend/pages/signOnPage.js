/**
 *  Created by KennethObikwelu on 8/16/18.
 */



let core = require('../core');
let urlFetcher = require('../support/dataParser');
let expect = require('chai').expect;

module.exports = (driver) => {


	let signOnPage = {
		email: core.automate.By.id('email'),
		password: core.automate.By.id('password'),
		login   : core.automate.By.className('btw-button')
	}

	let openSignOnPage =  async (url) => {
		try {
			 await driver.get(urlFetcher.retrieveUrl(url).url);
			  driver.findElement(core.automate.By.id('loginHeader'));
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
			driver.findElement(signOnPage.username);
			driver.findElement(signOnPage.password);
			driver.findElement(signOnPage.login);
		}catch(error){
			if (error instanceof core.automate.error.NoSuchElementError){
				expect(false).to.be.true
			}else {
				console.log(error)
				expect(false).to.be.true
			}
		}

	};
	return {
		openSignOnPage,
		validateSignOnProcess,
		verifySignOnPage
	}
}