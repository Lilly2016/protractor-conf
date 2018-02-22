var mkdirp = require('mkdirp');
var config = require('./conf.json');
var specPath = require('./conf.path.json');

module.exports = {
    chromeTemplate: {
        browserName: "chrome",
        chromeOptions: {
            args: ["lang=" + config.cult],
            prefs: {
                accept_languages: [config.cult]
            }
        },
        shardTestFiles: config.shardTestFiles,
        maxInstances: config.maxInstances
    },
    firefoxTemplate: {
        browserName: "firefox",
        shardTestFiles: config.shardTestFiles,
        maxInstances: config.maxInstances
    },
    safariTemplate: {
        browserName: "safari",
        shardTestFiles: config.shardTestFiles,
        maxInstances: config.maxInstances
    },
    ieTemplate: {
        browserName: "internet explorer",
        shardTestFiles: config.shardTestFiles,
        maxInstances: config.maxInstances
    },
    multiCapabilities: function () {
        var capabilities = [];
        var browserList = config.browsers;
        for (var i = 0; i < browserList.length; i++) {
            var browser = browserList[i].toLowerCase();
            if (browser === 'chrome') {
                var chrome = this.chromeTemplate;
                capabilities.push(chrome);
            } else if (browser === 'firefox') {
                capabilities.push(this.firefoxTemplate);
            } else if (browser === 'safari') {
                capabilities.push(this.safariTemplate);
            } else if (browser === 'internet explorer' | 'ie') {
                capabilities.push(this.ieTemplate);
            };
        };
        return capabilities;
    },
    setSuites: function () {

        var specsToRun = {};

        var SPECS = config.specs; //obj
        var PORTAL_NAMES_LIST = Object.keys(SPECS); // ["user-portal"]

        PORTAL_NAMES_LIST.forEach(function (portal, index) {

            var SPEC_PARENT_LIST = Object.keys(SPECS[portal]);

            SPEC_PARENT_LIST.forEach(function (key, index) { //key is "login", "accountCreation" etc
                var SPEC_OBJ = SPECS[portal][key];
                var SPEC_PATH = specPath[portal][key];
                if (SPEC_OBJ === true) { //eg runTheseSpecs["user-portal"]["login"]
                    specsToRun[key] = SPEC_PATH;
                } else if (typeof SPEC_OBJ === 'object') { //OTHERWISE, if SPEC_OBJ is an object, 
                    var SPEC_CHILD_LIST = Object.keys(SPEC_OBJ["TEST_LOC"]); //["login", "accountCreation"...etc]
                    if (SPEC_OBJ["ALL"] === true) { // if 'true', run all items within "TEST_LOC"
                        SPEC_CHILD_LIST.forEach(function (spec_child_key, index) {
                            specsToRun[spec_child_key] = SPEC_PATH[spec_child_key];
                        });
                    } else if (SPEC_OBJ["ALL"] === false) {
                        SPEC_CHILD_LIST.forEach(function (spec_child_key, index) {
                            if(SPEC_OBJ["TEST_LOC"][spec_child_key] === true) {
                                specsToRun[spec_child_key] = SPEC_PATH[spec_child_key];
                            };
                        });
                    };
                };
            });
        });
        console.log(`[INFO] Running these specs: ${Object.values(specsToRun)}`);
        return specsToRun;
    }
};