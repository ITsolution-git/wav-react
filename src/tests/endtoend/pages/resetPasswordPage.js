
let core = require('../core');
let dataParser = require('../support/dataParser');
let expect = require('chai').expect;
let helper = require('../support/helper')

module.exports = (driver) => {

  const data = dataParser.findByTag('new user signup');

	let verifyUser = async () => {
		try {

			await helper.timeout(4000)

			let allHandles = await driver.getAllWindowHandles()
			
			await driver.switchTo().window(allHandles[allHandles.length - 1]);

      // Input firstname
			let firstnameField = await driver.wait(core.automate.until.elementLocated(helper.By.id('firstname')), 10000);
      firstnameField.sendKeys(data.firstname);

      // Input lastname
			await driver.findElement(helper.By.id('lastname')).sendKeys(data.lastname);
			
			// Click submit button
			await helper.selectButton('Submit')
		}catch(error){
			if (error instanceof core.automate.error.NoSuchElementError){
				expect(false).to.be.true
			}else {
				console.log(error)
				expect(false).to.be.true
			}
		}
	};
	
	let changePassword = async () => {
		try {

      // Input firstname
			let passwordField = await driver.wait(core.automate.until.elementLocated(helper.By.id('password')), 10000);
      passwordField.sendKeys(data.newpassword);

      // Input lastname
			await driver.findElement(helper.By.id('confirmPassword')).sendKeys(data.newpassword);
			
			// Click submit button
			await helper.selectButton('Change')
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
		verifyUser,
		changePassword
	}
}