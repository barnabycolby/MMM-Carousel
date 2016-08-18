/*global Module, MM, setInterval */
(function () {
    'use strict';

    Module.register('MMM-Carousel', {
        defaults: {
            transitionInterval: 10000,
            ignoreModules: []
        },

        notificationReceived: function (notification) {
            var i;

            if (notification === 'DOM_OBJECTS_CREATED') {
                // Initially, all modules are hidden except the first and any ignored modules
                // We start by getting a list of all of the modules in the transition cycle
                this.modules = MM.getModules().exceptModule(this).filter(function (module) {
                    if (this.config.ignoreModules.indexOf(module.name) === -1) {
                        return true;
                    }

                    return false;
                }, this);

                this.currentIndex = 0;
                for (i = 1; i < this.modules.length; i += 1) {
                    this.modules[i].hide();
                }

                // We set a timer to cause the page transitions
                this.transitionTimer = setInterval(this.moduleTransition.bind(this), this.config.transitionInterval);
            }
        },

        moduleTransition: function () {
            var i;

            // Update the current index
            this.currentIndex += 1;
            if (this.currentIndex >= this.modules.length) {
                this.currentIndex = 0;
            }

            for (i = 0; i < this.modules.length; i += 1) {
                // There is currently no easy way to discover whether a module is ALREADY shown/hidden
                // In testing, calling show/hide twice seems to cause no issues
                if (i === this.currentIndex) {
                    this.modules[i].show();
                } else {
                    this.modules[i].hide();
                }
            }
        }
    });
}());
