const sass = require('node-sass');

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner : '/*!\n' +
                ' * <%= pkg.name %> v<%= pkg.version %> - <%= pkg.description %>\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> - <%= pkg.homepage %>\n' +
                ' * License: <%= pkg.license %>\n' +
                ' */\n\n',
            filename : 'select2.customSelectionAdapter'
        },
        concat: {
            options: {
                banner : '<%= meta.banner %>'
            },
            dist: {
                src: ['src/js/*.js'],
                dest: 'dist/js/<%= meta.filename %>.js'
            }
        },
        uglify: {
            options : {
                banner : '<%= meta.banner %>'
            },
            dist: {
                files : {
                    'dist/js/<%= meta.filename %>.min.js'  : 'dist/js/<%= meta.filename %>.js'
                }
            }
        },
        sass: {
            prod: {
                options: {
                    outputStyle: 'compressed',
                    implementation: sass
                },
                files: {
                    'dist/css/<%= meta.filename %>.min.css': [
                        'src/scss/core.scss'
                    ]
                }
            },
            dev: {
                options: {
                    outputStyle: 'expanded',
                    implementation: sass,
                    sourceMap: true
                },
                files: {
                    'dist/css/<%= meta.filename %>.css': [
                        'src/scss/core.scss'
                    ]
                }
            }
        },
        watch: {
            options : {
                atBegin : true
            },
            js: {
                files: 'src/js/*.js',
                tasks: ['concat']
            },
            scss: {
                files: 'src/scss/**/*.scss',
                tasks: ['sass:dev']
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build:dev', ['concat', 'sass:dev']);
    grunt.registerTask('build:prod', ['concat', 'uglify', 'sass:prod']);
};
