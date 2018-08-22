/**
 *  Created by KennethObikwelu on 8/15/18.
 */


let automate = require('selenium-webdriver');
let test = require("selenium-webdriver/testing");
let shell = require('shelljs');
let fileSystem = require('fs-extra');
let path = require('npm-path');
let env = process.env['ENVIRONMENT'];
let browser = process.env['BROWSER'];
let defaultTimeout = process.env['defaultTimeout'];
let browserCapabilities = require('./support/capabilities.json');
let driver;

let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
let basedir = './target/screenshots/';

chai.use(chaiAsPromised);
chai.config.truncateThreshold = 0;
chai.config.includeStack = true;


module.exports = {
	env           : env,
	defaultTimeout: defaultTimeout,
	driver        : function () {
		return driver;
	}
};

test.before(() => {
	 openBrowser().then(()=>{
	 	console.log('Browser opened')
	 })
});


  function openBrowser() {
	 driver =  new automate.Builder()
		.withCapabilities(browserCapabilities['chrome'])
		.build();
	 driver.manage().deleteAllCookies();
	 driver.manage().timeouts().implicitlyWait(5000);
}

test.after(() => {
	 driver.quit().then(()=>{
		 console.log('Browser closed')
	 });
})