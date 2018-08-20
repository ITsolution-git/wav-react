/**
 *  Created by KennethObikwelu on 8/15/18.
 */


let automate = require('selenium-webdriver');

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

before(function () {
	openBrowser();
	shell.rm('-rf', basedir);
});


function openBrowser() {
	if (browserCapabilities[browser] && browserCapabilities[browser]['host']) {
		console.log("opening remote webdriver on " + browserCapabilities[browser]['host']);
		driver = new automate.Builder()
			.usingServer(browserCapabilities[browser]['host'])
			.withCapabilities(browserCapabilities[browser]['browserCapabilities'])
			.build();
	} else {
		driver = new automate.Builder()
			.withCapabilities(browserCapabilities['chrome'])
			.build();
		console.log ('in here 1')
	}
	driver.manage().deleteAllCookies();
}

