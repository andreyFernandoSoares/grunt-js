module.exports = function(grunt){

    grunt.initConfig({
        //Copia
        copy: {

            public: {
                cwd: 'public',
                src: '**',
                dest: 'dist',
                expand: true
            }
        },

        //Limpa
        clean: {

            dist: {
                src: 'dist'
            }
        },

        //Mimificação JS e CSS
        useminPrepare: {
            html: 'dist/**/*.html'
        },

        usemin: {
            html: 'dist/**/*.html'
        },

        //Optimizar Imagens
        imagemin: {
            public: {
                expand: true,
                cwd: 'dist/img',
                src: '**/*.{png,jpg,gif}',
                dest: 'dist/img'
            }
        },

        //Versionamento
        rev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },

            imagens: {
              src: ['dist/img/**/*.{png,jpg,gif}']
            },
      
            minificados: {
              src: ['dist/js/**/*.min.js', 'dist/css/**/*.min.css']
            }
        },

        //Pré processadores
        coffee: {
            compilar: { 
               expand: true,
               cwd: 'public/coffee', 
               src: ['**/*.coffee'],
               dest: 'public/js', 
               ext: '.js'
            }
        } ,
         
        less: {
            compilar: {
               expand: true,
               cwd: 'public/less',
               src: ['**/*.less'],
               dest: 'public/css', 
               ext: '.css'
            }
        },

        watch: {

            coffee: {
               options: {
                    event: ['added', 'changed']
                },
               files: 'public/coffee/**/*.coffee',
               tasks: 'coffee:compilar'
            },
         
            less: {
                options: {
                   event: ['added', 'changed']
                },
                files: 'public/less/**/*.less', 
                tasks: 'less:compilar'
            },

            //Testar qualidade do código
            js: {
                options: {
                   event: ['changed']
                },
                files: 'public/js/**/*.js',
                tasks: 'jshint:js'
             }
          
        },

        //Testar qualidade do código
        jshint: {
            js: {
               src: ['public/js/**/*.js']
             }
        },

        //Reload automatico e sincronização de apps
        browserSync: {
            public: {
                bsFiles: {
                    watchTask: true,
                    src : ['public/**/*']
                }
            },

            options: {
                server: {
                    baseDir: "public"
                }
            }
        }
    });

    //Limpa e copia
    grunt.registerTask('dist', ['clean', 'copy']);

    //Minificar CSS, JS, Imagens e Versionamento
    grunt.registerTask('minifica', ['useminPrepare','concat', 'uglify', 'cssmin', 
                                    'rev', 'usemin', 'imagemin']);
    
    //Executa tudo
    grunt.registerTask('default', ['dist', 'minifica']);

    //Reload automatico e sincronização de apps
    grunt.registerTask('server', ['browserSync', 'watch']);

    //Copy and Clean
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    //CSS Concat
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');

    //Optimize Images
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    //Versionamento
    grunt.loadNpmTasks('grunt-rev');

    //Pré processadores
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //Testar qualidade do código
    grunt.loadNpmTasks('grunt-contrib-jshint');

    //Reload automatico e sincronização de apps
    grunt.loadNpmTasks('grunt-browser-sync');
}