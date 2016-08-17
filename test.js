/*global exports, require, console, global */
(function () {
    'use strict';

    var moduleObject, modulesList, i, hideFunction;

    function initialiseModule() {
        require('./MMM-Carousel.js');
        moduleObject.notificationReceived('DOM_OBJECTS_CREATED');
    }

    global.Module = {
        register: function (name, moduleObjectArgument) {
            // To workaround a JSLint unused variable error for the first argument (name), we make JSLint think that the variable is used
            // In newer versions of JSLint we can simply rename the variable to ignore to disable the warnings, but unfortunately, grunt-jslint
            // is severely updated
            var doNothing = function (nothing) {
                return nothing;
            };
            doNothing(name);

            moduleObject = moduleObjectArgument;
        }
    };

    // We create a list of modules that can be hidden
    modulesList = new Array(3);
    hideFunction = function () {
        this.hidden = true;
    };
    for (i = 0; i < 3; i += 1) {
        modulesList[i] = {
            hidden: false,
            hide: hideFunction
        };
    }
    modulesList.exceptModule = function () {
        // As this is only used to exclude the current module, we can simply return the list without any modifications
        return this;
    };

    global.MM = {
        getModules: function () {
            return modulesList;
        }
    };


    exports.allModulesHiddenExceptFirst = function (test) {
        var errorMessageForMostModules;

        initialiseModule();

        test.expect(3);
        test.ok(!modulesList[0].hidden, "The first module in the config list should not initially be hidden.");
        errorMessageForMostModules = "All modules except the first in the config list should be hidden initially.";
        test.ok(modulesList[1].hidden, errorMessageForMostModules);
        test.ok(modulesList[2].hidden, errorMessageForMostModules);
        test.done();
    };
}());
