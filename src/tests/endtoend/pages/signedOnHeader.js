/**
 *  Created by KennethObikwelu on 8/22/18.
 */


let core = require('../core');
let urlFetcher = require('../support/dataParser');
let expect = require('chai').expect;

module.exports = (driver) => {


	let signedOnHeader = {
		signOutNavDropDown: core.automate.By.id('nav-dropdown'),
		signOutLink: core.automate.By.linkText('Sign Out')
	}

	function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
	}

	let openMenu = async () => {
		try {
			let menu = await driver.wait(core.automate.until.elementLocated(signedOnHeader.signOutNavDropDown), 4000);
			await timeout(1000)
			menu.click()
			await signOut();
		}catch(error){
			if (error instanceof core.automate.error.NoSuchElementError){
				expect(false).to.be.true
			}else {
				console.log(error)
				expect(false).to.be.true
			}
		}
	};

	let signOut = async () => {
		try {
			let a_signout = await driver.findElement(core.automate.By.xpath('//*[@id="root"]/div/div/div[1]/div/nav/div/div[2]/ul[2]/li[3]/ul/li[2]/a'));
			await timeout(100)
			a_signout.click()
		}catch(error){
			if (error instanceof core.automate.error.NoSuchElementError){
				expect(false).to.be.true
			}else {
				console.log(error)
				expect(false).to.be.true
			}
		}
	}

	return {
		openMenu
	}
}