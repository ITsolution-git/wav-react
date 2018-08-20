/**
 *  Created by KennethObikwelu on 8/16/18.
 */

let core = require('../core');
let urlFetcher = require('../support/dataParser');
let webSelectorType = require('selenium-webdriver').By;
let expect = require('chai').expect;

module.exports = (driver) => {


	let signOnPage = {
		username: webSelectorType.id('username'),
		password: webSelectorType.id('password'),
		login   : webSelectorType.className('btw-button')
	}

	let verifySignOnPage = async () => {
		let usernameTextField = await driver.findElement(signOnPage.username);
		let passwordTextField = await driver.findElement(signOnPage.password);
		let loginTextField = await driver.findElement(signOnPage.login);
		expect(usernameTextField).to.exist;
		expect(passwordTextField).to.exist;
		expect(loginTextField).to.exist;
	}
	let openSignOnPage = async (url)=>{
		console.log('in here 3')
		driver.get('staging-btw-ui-18.herokuapp.com').then(()=>{
			console.log('in here 4')
		})
	}
	let validateSignOnProcess = (...args) => {
		const { credentials } = args;
		verifySignOnPage().then(()=>{
			driver.findElement(signOnPage.username).sendKeys(credentials.username).then(()=>{
				driver.findElement(signOnPage.password).sendKeys(credentials.password).then(()=>{
					driver.findElement(signOnPage.login).click().then(()=>{
						console.log('clicked submit button')
					})
				})
			});
		})
	};
	return {
		validateSignOnProcess,
		openSignOnPage
	}
}