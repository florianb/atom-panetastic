/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    coffee: {
      compile: {
        files: {
          'js/panetastic.js': 'coffee/*.coffee'
        }
      }
    },
    watch: {
      scripts: {
        files: ['coffee/*.coffee'],
        tasks: ['coffee']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');

  // Default task.
  grunt.registerTask('default', ['coffee']);

};
