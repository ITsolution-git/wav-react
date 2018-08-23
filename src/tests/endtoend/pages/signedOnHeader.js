/**
 *  Created by KennethObikwelu on 8/22/18.
 */


let core = require('../core');
let urlFetcher = require('../support/dataParser');
let expect = require('chai').expect;

module.exports = (driver) => {


	let signedOnHeader = {
		signOutNavDropDown: core.automate.By.id('nav-dropDown'),
		signOutLink: core.automate.By.linkText('Sign Out')
	}

	let signOut =  () => {
		try {
			driver.findElement(signedOnHeader.signOutNavDropDown);
			 driver.findElement(signedOnHeader.signOutNavDropDown).click();
			 driver.findElement(signedOnHeader.signOutNavDropDown).click();
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
		signOut
	}
}