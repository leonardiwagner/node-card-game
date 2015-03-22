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

    less: {
        'public/css/rooms.css': 'public/stylesheets/rooms.less'
    },

    watch: {
      src: {
        files: ['public/javascript/*.js','public/stylesheets/*.less'],
        tasks: ['jshint:src','less']
      },
      test: {
        files: ['test/*.js'],
        tasks: ['jshint:test','mochaTest']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('default', ['watch']);
};