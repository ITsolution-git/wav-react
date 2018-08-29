let core = require('../core');
let urlFetcher = require('../support/dataParser');
let expect = require('chai').expect;
let helper = require('../support/helper')

module.exports = (driver) => {


	let registerPage = {
		firstName         : core.automate.By.id('firstname'),
		lastName          : core.automate.By.id('lastname'),
		email             : core.automate.By.id('email'),
    password          : core.automate.By.id('password'),
    confirmPassword   : core.automate.By.id('confirmPassword'),
    terms_policy      : core.automate.By.id('terms_policy'),
    signupBtn         : core.automate.By.className('btw-button')
	}

  let validateRegisterInputProcess =  async (arg) => {
    try {

      await helper.timeout(1000)
      await driver.findElement(registerPage.firstName).sendKeys(arg.firstname);
      await driver.findElement(registerPage.lastName).sendKeys(arg.lastname);
      await driver.findElement(registerPage.email).sendKeys(arg.email);
      await driver.findElement(registerPage.password).sendKeys(arg.password);
      await driver.findElement(registerPage.confirmPassword).sendKeys(arg.password);
      await driver.findElement(registerPage.terms_policy).click();
      let signupBtn = await driver.findElement(registerPage.signupBtn)
      signupBtn.click()      

    } catch(error) {

      if (error instanceof core.automate.error.NoSuchElementError){
        console.log(error)
        expect(false).to.be.true
      }else {
        console.log(error)
        expect(false).to.be.true
      }

    }
  };

  let validateMakelistInputProcess =  async (arg) => {
    try {
      let nextView = await driver.wait(core.automate.until.elementLocated(helper.By.className('view-next')), 15000);
      nextView.click();

      await helper.timeout(200)
      for (let i=1; i<5; i++) {
        await driver.findElement(helper.By.id('firstname' + i)).sendKeys('automate_voter_fname' + i);
        await driver.findElement(helper.By.id('lastname' + i)).sendKeys('automate_voter_lname' + i);
      }   

      let findBtn = await driver.findElement(helper.By.className('btw-button'))
      findBtn.click()  
    } catch(error) {

      if (error instanceof core.automate.error.NoSuchElementError){
        console.log(error)
        expect(false).to.be.true
      }else {
        console.log(error)
        expect(false).to.be.true
      }

    }
  };

	return {
    validateRegisterInputProcess,
    validateMakelistInputProcess
	}
}