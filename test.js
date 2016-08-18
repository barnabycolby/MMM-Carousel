/*global exports, require, console, global */
(function () {
    'use strict';

    var moduleObject, modulesList, i, hideFunction, showFunction;

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

            // We add the config option to the moduleObject, allowing us to test for these specific values later
            moduleObjectArgument.config = {
                transitionInterval: 12345
            };

            moduleObject = moduleObjectArgument;
        }
    };

    // We create a list of modules that can be hidden
    modulesList = new Array(3);
    hideFunction = function () {
        this.hidden = true;
    };
    showFunction = function () {
        this.hidden = false;
    };
    for (i = 0; i < 3; i += 1) {
        modulesList[i] = {
            hidden: false,
            hide: hideFunction,
            show: showFunction
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

    exports.moduleTransitionCorrectlyUpdatesHiddenStatus = function (test) {
        initialiseModule();
        moduleObject.moduleTransition();

        test.expect(3);
        test.ok(modulesList[0].hidden, "After a module transition, the first module should be hidden.");
        test.ok(!modulesList[1].hidden, "After a module transition, the second module should now be shown.");
        test.ok(modulesList[2].hidden, "After a module transition, the third module should still be hidden");
        test.done();
    };

    exports.moduleTransitionCorrectlyUpdatesHiddenStatus = function (test) {
        initialiseModule();
        moduleObject.moduleTransition();
        moduleObject.moduleTransition();
        moduleObject.moduleTransition();

        test.expect(3);
        test.ok(!modulesList[0].hidden, "After 3 module transitions, the first module should be shown.");
        test.ok(modulesList[1].hidden, "After 3 module transitions, the second module should be hidden.");
        test.ok(modulesList[2].hidden, "After 3 module transitions, the third module should be hidden");
        test.done();
    };

    exports.transitionTimerSet = function (test) {
        initialiseModule();

        test.expect(1);
        /*jslint nomen: true*/
        test.equal(moduleObject.transitionTimer._idleTimeout, 12345, "The transition timer should have a timeout of 12345 milliseconds, as set in the config.");
        /*jslint nomen: false*/
        test.done();
    };
}());
