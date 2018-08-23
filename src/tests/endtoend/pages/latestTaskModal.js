/**
 *  Created by KennethObikwelu on 8/22/18.
 */


let core = require('../core');
let urlFetcher = require('../support/dataParser');
let expect = require('chai').expect;

module.exports = (driver) => {


	let taskModal = {
		modalContent: core.automate.By.className('modal-content'),
		modalFooter: core.automate.By.className('password'),
		goToTasksButtonOnModal   : core.automate.By.linkText('Go to Tasks'),
		dismissButtonOnModal   : core.automate.By.linkText('Dismiss')
	}

	let validateWelcomeModalIsDisplayed =   async  () => {
		try {
			await driver.findElement(taskModal.modalContent).isDisplayed()
			 driver.findElement(taskModal.modalFooter);
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


	let dismissModal =  () => {
		try {
			 driver.findElement(taskModal.dismissButtonOnModal).click();
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