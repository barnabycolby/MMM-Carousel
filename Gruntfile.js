/*global module, require */
(function () {
    /*
     * MMM-Carousel
     * https://github.com/barnabycolby/MMM-Carousel
     *
     * Copyright (c) 2016 Barnaby Colby
     * Licensed under the MIT license.
     */

    'use strict';

    module.exports = function (grunt) {

        require('load-grunt-config')(grunt);

        // Actually load this plugin's task(s).
        grunt.loadTasks('tasks');

    };
}());
