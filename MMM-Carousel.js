/*global Module, MM, setInterval */
(function () {
    'use strict';

    Module.register('MMM-Carousel', {
        defaults: {
            transitionInterval: 10000,
            ignoreModules: [],
            global: true,
            top_bar: {enabled: false, ignoreModules: []},
            top_left: {enabled: false, ignoreModules: []},
            top_center: {enabled: false, ignoreModules: []},
            top_right: {enabled: false, ignoreModules: []},
            upper_third: {enabled: false, ignoreModules: []},
            middle_center: {enabled: false, ignoreModules: []},
            lower_third: {enabled: false, ignoreModules: []},
            bottom_left: {enabled: false, ignoreModules: []},
            bottom_center: {enabled: false, ignoreModules: []},
            bottom_right: {enabled: false, ignoreModules: []},
            bottom_bar: {enabled: false, ignoreModules: []}
        },

        notificationReceived: function (notification) {
            var i, position, positions = ['top_bar', 'bottom_bar', 'top_left', 'bottom_left', 'top_center', 'bottom_center', 'top_right', 'bottom_right', 'upper_third', 'middle_center', 'lower_third'];
            if (notification === 'DOM_OBJECTS_CREATED') {
                // Initially, all modules are hidden except the first and any ignored modules
                // We start by getting a list of all of the modules in the transition cycle
                if (this.config.global === true) {
                    this.setUpTransitionTimers(null);
                } else {
                    for (i=0;i < positions.length; i++) {
                        if (this.config[positions[i]].enabled === true) {
                            this.setUpTransitionTimers(positions[i]);
                        }
                    }
                }
            }
        },

        setUpTransitionTimers: function (positionIndex) {
            var i, modules;
            modules = MM.getModules().exceptModule(this).filter(function (module) {
                if (this.config.global === true) {
                    return this.config.ignoreModules.indexOf(module.name) === -1;
                }
                return ((this.config[positionIndex].ignoreModules.indexOf(module.name) === -1) && (module.data.position === positionIndex));
            }, this);
            modules.currentIndex = 0;
            for (i = 1; i < modules.length; i += 1) {
                modules[i].hide();
            }

            // We set a timer to cause the page transitions
            this.transitionTimer = setInterval(this.moduleTransition.bind(modules), this.config.transitionInterval);
        },

        moduleTransition: function () {
            var i;

            // Update the current index
            this.currentIndex += 1;
            if (this.currentIndex >= this.length) {
                this.currentIndex = 0;
            }

            for (i = 0; i < this.length; i += 1) {
                // There is currently no easy way to discover whether a module is ALREADY shown/hidden
                // In testing, calling show/hide twice seems to cause no issues
                if (i === this.currentIndex) {
                    this[i].show(1500);
                } else {
                    this[i].hide(0);
                }
            }
        }
    });
}());
