/**
 *  Created by KennethObikwelu on 8/15/18.
 */

var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');

var shelljs = require('shelljs');
var fs =  require('fs');
var path = require('path');

var where = process.env['ENVIRONMENT'];
var browser = process.env['BROWSER'];
var platform = process.env['PLATFORM'];
var width = process.env['BROWSER_WIDTH'];
var height = process.env['BROWSER_HEIGHT'];
var seleniumtimeout = process.env['seleniumtimeout'];

var capabilities = require('../data/capabilities.json');
var users = require('./users');
var screenshot = require('./screenshot');

var driver;

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var basedir = './target/screenshots/';

chai.use(chaiAsPromised);
chai.config.truncateThreshold = 0;

global.webdriver = webdriver;
global.chaiAsPromised = chaiAsPromised;
global.expect = chai.expect;
global.test = test;
