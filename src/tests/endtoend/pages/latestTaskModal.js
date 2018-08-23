/**
 *  Created by KennethObikwelu on 8/22/18.
 */


let core = require('../core');
let urlFetcher = require('../support/dataParser');
let expect = require('chai').expect;

module.exports = (driver) => {


	let taskModal = {
		modalCDialog: core.automate.By.css('body > div:nth-child(11) > div.fade.btw-modal.in.modal'),
		goToTasksButtonOnModal   : core.automate.By.linkText('Go to Tasks'),
		dismissButtonOnModal   : core.automate.By.xpath('/html/body/div[3]/div[2]/div/div/div[3]/div/div[2]/button')
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
			 await driver.findElement(taskModal.modalCDialog).click();
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