let core = require('../core');
let urlFetcher = require('../support/dataParser');
let expect = require('chai').expect;
let helper = require('../support/helper')

module.exports = (driver) => {


	let registerPage = {
		city              : helper.By.id('city'),
		email             : helper.By.id('email'),
    state             : helper.By.xpath('//*[@id="root"]/div/div/div[2]/div/div[2]/div[2]/div/div/div/div/div[2]/input'),
    next              : helper.By.xpath('//*[@id="root"]/div/div/div[2]/div/div[8]/div[2]/button')
  }

  let enterMoreDetailsForVoter =  async (index) => {
    try {

      await helper.timeout(300)
      await driver.findElement(registerPage.email).sendKeys('automate@test' + index + '.com');
      await driver.findElement(registerPage.city).sendKeys('New York');
      await driver.findElement(registerPage.state).sendKeys('NY\n');

	    await driver.findElement(registerPage.next).click();
	    let nextBtn = await driver.wait(core.automate.until.elementLocated(helper.By.xpath('//*[@id="root"]/div/div/div[2]/div/div[2]/div/div[2]/button')), 30000);
	    nextBtn.click();

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

  let validateGotoNextProcess = async () => {
    
    try {

      await driver.findElement(registerPage.next).click();
      let nextBtn = await driver.wait(core.automate.until.elementLocated(helper.By.xpath('//*[@id="root"]/div/div/div[2]/div/div[2]/div/div[2]/button')), 30000);
      nextBtn.click();

    } catch(error) {

      if (error instanceof core.automate.error.NoSuchElementError){
        console.log(error)
        expect(false).to.be.true
      }else {
        console.log(error)
        expect(false).to.be.true
      }

    }
  }

  let validateFinishProcess = async () => {
    
    try {

      let goBackBtn = await driver.wait(core.automate.until.elementLocated(helper.By.xpath('//*[@id="root"]/div/div/div[2]/div/div[8]/div[1]/button')), 30000);
      goBackBtn.click();

    } catch(error) {

      if (error instanceof core.automate.error.NoSuchElementError){
        console.log(error)
        expect(false).to.be.true
      }else {
        console.log(error)
        expect(false).to.be.true
      }

    }
  }

	return {
    enterMoreDetailsForVoter,
    validateGotoNextProcess,
    validateFinishProcess
	}
}