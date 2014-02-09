module.exports = function (grunt) {

    grunt.initConfig({
      bower: {
        target: {
          rjsConfig: 'app/config.js' ,
        }
      }
    });

    grunt.loadNpmTasks('grunt-bower-requirejs');

    grunt.registerTask('default', ['bower']);

};
