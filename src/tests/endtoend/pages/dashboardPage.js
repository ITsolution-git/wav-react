/**
 *  Created by KennethObikwelu on 8/22/18.
 */


let core = require('../core');
let urlFetcher = require('../support/dataParser');
let expect = require('chai').expect;

module.exports = (driver) => {


	let dashboardPage = {
		captainsDashboard: core.automate.By.className('btw-captains-dashboard'),
		taskCard: core.automate.By.className('tasks'),
		votersCard   : core.automate.By.className('voters'),
		messageCard   : core.automate.By.className('messages')
	}

	let validateDashboard = async (...args) => {
		try {
			driver.findElement(dashboardPage.captainsDashboard);
			driver.findElement(dashboardPage.taskCard);
			driver.findElement(dashboardPage.votersCard);
			driver.findElement(dashboardPage.messageCard);
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
		validateDashboard
	}
}