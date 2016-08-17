/*global Module, MM */
(function () {
    'use strict';

    Module.register('MMM-Carousel', {
        notificationReceived: function (notification) {
            var modules, i;

            if (notification === 'DOM_OBJECTS_CREATED') {
                // Initially, all modules are hidden except the first
                modules = MM.getModules().exceptModule(this);
                for (i = 1; i < modules.length; i += 1) {
                    modules[i].hide();
                }
            }
        }
    });
}());
