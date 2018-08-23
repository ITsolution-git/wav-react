/**
 *  Created by KennethObikwelu on 8/22/18.
 */


let core = require('../core');
let urlFetcher = require('../support/dataParser');
let expect = require('chai').expect;

module.exports = (driver) => {


	let taskModal = {
		modalCDialog: core.automate.By.id('dashboardDialog'),
		goToTasksButtonOnModal   : core.automate.By.id('dashboardSplashSubmit'),
		dismissButtonOnModal   : core.automate.By.id('dashboardSplashDismiss')
	}

	let validateWelcomeModalIsDisplayed =   async  () => {
		try {
			await await driver.findElement(taskModal.modalCDialog).isDisplayed();
		}catch(error){
			if (error instanceof core.automate.error.NoSuchElementError){
				console.log(error)
				expect(false).to.be.true
			}else {
				console.log(error)
				expect(false).to.be.true
			}
		}

	};


	let dismissModal =  async () => {
		try {
			 await driver.findElement(taskModal.dismissButtonOnModal).click();
		}catch(error){
			if (error instanceof core.automate.error.NoSuchElementError){
				expect(false).to.be.true
			}else {
				console.log(error)
				expect(false).to.be.true
			}
		}

	};

	let goToTasks = async () => {
		try {
			await driver.findElement(taskModal.goToTasksButtonOnModal).click();
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
		validateWelcomeModalIsDisplayed,
		dismissModal,
		goToTasks
	}
}