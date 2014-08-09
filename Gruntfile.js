module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      src: ['*.js','test/*.js'],
      test: ['test/*.js']
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/*.js']
      }
    },

    stylus: {
      compile: {
        //options: {
          //paths: ['path/to/import', 'another/to/import'],
        files: {
          'public/css/main.css': ['public/stylus/*.styl'] // compile and concat into single file
        }
      }
    },

    watch: {
      src: {
        files: ['public/javascript/*.js','public/stylus/*.styl'],
        tasks: ['jshint:src','stylus']
      },
      test: {
        files: ['test/*.js'],
        tasks: ['jshint:test','mochaTest']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('default', ['watch']);
};