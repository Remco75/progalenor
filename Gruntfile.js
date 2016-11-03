
'use strict';

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    keepalive:true,
                    port: 9001,
                    base: 'test'
                }
            }
        }
    });


};