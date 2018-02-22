var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var config = require('./conf.json')
var parse = require('./conf.parse')

exports.config = {
    framework: config.framework,
    seleniumAddress: config.seleniumAddress,
    multiCapabilities: parse.multiCapabilities(), //browsers
    suites:  parse.setSuites(), //test specs

    onPrepare: function () {
        browser.driver.manage().window().maximize();
        browser.waitForAngularEnabled(config.onPrepare.waitForAngular);
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: true
            }
        }));
    },
    jasmineNodeOpts: {
        print: function () { }, //remove dots from log
        defaultTimeoutInterval: 120000
    },
    params: {
        masterConf: '../../../common/util.conf.js'
    },
    allScriptsTimeout: 120000 //in case campaign submittal is slow
}