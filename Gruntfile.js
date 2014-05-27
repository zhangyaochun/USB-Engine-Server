'use strict';

var fs = require('fs');
var util = require('util');
var rimraf = require('rimraf');

var lrSnippet = require('connect-livereload')();

var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var pathConfig = {
        app : 'app',
        dist : 'dist',
        tmp : 'tmp'
    };

    grunt.initConfig({
        paths : pathConfig,
        watch : {
            compass : {
                files : ['<%= paths.app %>/compass/{,*/}*/{,*/}*.{scss,sass,png,ttf}'],
                tasks : ['compass:server']
            },
            test : {
                files : ['<%= paths.app %>/javascripts/**/*.js'],
                tasks : ['jshint:test'],
                options : {
                    spawn : false
                }
            },
            livereload : {
                files : [
                    '<%= paths.app %>/*.html',
                    '<%= paths.app %>/javascripts/**/*.js',
                    '<%= paths.app %>/images/**/*.*',
                    '<%= paths.tmp %>/stylesheets/**/*.css',
                    '<%= paths.tmp %>/images/**/*.*'
                ],
                options : {
                    livereload : true,
                    spawn : false
                }
            }
        },
        connect : {
            options : {
                port : 9999,
                hostname : '0.0.0.0'
            },
            rules : [{
                from : '^/index',
                to : '/index.html'
            }],
            server : {
                options : {
                    middleware : function (connect) {
                        return [
                            lrSnippet,
                            rewriteRulesSnippet,
                            mountFolder(connect, pathConfig.tmp),
                            mountFolder(connect, pathConfig.app)
                        ];
                    }
                }
            }
        },
        open : {
            server : {
                path : 'http://127.0.0.1:<%= connect.options.port %>',
                app : 'Google Chrome Canary'
            }
        },
        clean : {
            dist : ['<%= paths.tmp %>', '<%= paths.dist %>'],
            server : '<%= paths.tmp %>'
        },
        useminPrepare : {
            html : ['<%= paths.app %>/index.html'],
            options : {
                dest : '<%= paths.dist %>'
            }
        },
        usemin : {
            html : ['<%= paths.dist %>/index.html'],
            options : {
                dirs : ['<%= paths.dist %>']
            }
        },
        htmlmin : {
            dist : {
                files : [{
                    expand : true,
                    cwd : '<%= paths.app %>',
                    src : ['*.html'],
                    dest : '<%= paths.dist %>'
                }]
            }
        },
        copy : {
            tmp : {
                files : [{
                    expand : true,
                    dot : true,
                    cwd : '<%= paths.app %>',
                    dest : '<%= paths.tmp %>',
                    src : [
                        'images/**/*.{webp,gif,png,jpg,jpeg}',
                        'compass/**/*.{sass,scss,png,ttf}',
                        'thirdpartys/**/*',
                        'javascripts/**/*',
                        'components/underscore/underscore.js',
                        'components/jquery/jquery.js',
                        'components/requirejs-i18n/i18n.js',
                        'components/requirejs/require.js'
                    ]
                }]
            },
            dist : {
                files : [{
                    expand : true,
                    dot : true,
                    cwd : '<%= paths.tmp %>',
                    dest : '<%= paths.dist %>',
                    src : [
                        'javascripts/DD_belatedPNG_0.0.8a-min.js',
                        'images/**/*.{webp,gif,png,jpg,jpeg}',
                        'components/requirejs/require.js'
                    ]
                }]
            }
        },
        compass : {
            options : {
                sassDir : '<%= paths.app %>/compass/sass',
                cssDir : '<%= paths.tmp %>/stylesheets',
                imagesDir : '<%= paths.app %>/compass/images',
                fontsDir : '<%= paths.app %>/compass/fonts',
                relativeAssets : true
            },
            dist : {
                options : {
                    relativeAssets : false,
                    sassDir : '<%= paths.tmp %>/compass/sass',
                    cssDir : '<%= paths.dist %>/stylesheets',
                    generatedImagesDir : '<%= paths.dist %>/images',
                    outputStyle : 'compressed',
                    httpGeneratedImagesPath: './images'
                }
            },
            server : {
                options : {
                    generatedImagesDir : '<%= paths.tmp %>/images',
                    debugInfo : true
                }
            }
        },
        imagemin : {
            dist : {
                files : [{
                    expand : true,
                    cwd : '<%= paths.dist %>/images',
                    src : '**/*.{png,jpg,jpeg}',
                    dest : '<%= paths.dist %>/images'
                }]
            }
        },
        requirejs : {
            dist : {
                options : {
                    almond : true,
                    appDir : '<%= paths.tmp %>/javascripts',
                    dir :　'<%= paths.dist %>/javascripts',
                    optimize : 'uglify',
                    baseUrl : './',
                    uglify : {
                        toplevel : true,
                        ascii_only : false,
                        beautify : false
                    },
                    paths : {
                        $ : '../components/jquery/jquery',
                        i18n : '../components/requirejs-i18n/i18n',
                        _ : '../components/underscore/underscore'
                    },
                    shim: {
                        $ : {
                            exports : '$'
                        },
                        _ : {
                            exports : '_'
                        }
                    },
                    preserveLicenseComments : true,
                    useStrict : false,
                    wrap : true,
                    modules : [{
                        name : 'main',
                        include : ['jquery', 'i18n', '_',]
                    }]
                }
            }
        },
        uglify : {
            requirejs : {
                files : {
                    '<%= paths.dist %>/components/requirejs/require.js' : [
                        '<%= paths.dist %>/components/requirejs/require.js'
                    ]
                }
            }
        },
        replace: {
            common: {
                src: ['<%= paths.dist %>/stylesheets/style.css'],
                overwrite: true,
                replacements: [{
                    from: 'images/common-',
                    to: '../images/common-'
                }]
            },
            dist: {
                src: ['<%= paths.dist %>/index.html'],
                overwrite: true,
                replacements: [{
                    from: '//@@require.js',
                    to: '<%= grunt.file.read(paths.dist + "/components/requirejs/require.js") %>'
                },{
                    from: '//@@style.css',
                    to: '<%= grunt.file.read(paths.dist + "/stylesheets/style.css") %>'
                },{
                    from: '//@@DD_belatedPNG_0.0.8a-min.js',
                    to: '<%= grunt.file.read(paths.dist + "/javascripts/DD_belatedPNG_0.0.8a-min.js") %>'
                },{
                    from: '<link rel="stylesheet" type="text/css" href="stylesheets/style.css">',
                    to: ''
                },{
                    from: '<script data-main="javascripts/main" src="components/requirejs/require.js"></script>',
                    to: ''
                }]
            }
        },
        jshint : {
            test : ['<%= paths.app %>/javascripts/**/*.js']
        }
    });

    grunt.registerTask('server', [
        'clean:server',
        'compass:server',
        'connect:server',
        'configureRewriteRules',
        'open',
        'watch'
    ]);

    grunt.registerTask('test', [
        'jshint:test',
    ]);

    grunt.registerTask('test:travis', [
        'jshint:test',
    ]);

    //往tmp里面写一些文件
    grunt.registerTask('processI18n',function(nls){

        //替换语言标记
        var output = grunt.file.read(pathConfig.tmp+'/javascripts/main.js').replace('@@localname',nls);
        grunt.file.write(pathConfig.tmp+'/javascripts/main.js',output);
        
        //替换lang.js
        var template = util.format('define({"%s" : true});', nls);
        grunt.file.write(pathConfig.tmp + '/javascripts/nls/lang.js', template);

        console.log('processI18n: ' + nls);

        //非zh-cn的往style.scss里面写nls模块scss文件

        var main = pathConfig.tmp + '/compass/sass/style.scss';

        //var f = grunt.file.copy(main, pathConfig.tmp + '/compass/sass/main_'+nls+'.scss');

        var fd = fs.openSync(main, 'a');

        fs.writeSync(fd, '@import "locale-' + nls +'";');
        fs.closeSync(fd);

    });


    grunt.registerTask('replacemain',function(){
        var output = grunt.file.read(pathConfig.dist+'/index.html').replace('//@@main.js',grunt.file.read(pathConfig.dist+'/javascripts/main.js'));
        grunt.file.write(pathConfig.dist+'/index.html',output);
    });


    //递归复制
    function copyFolderRecursive(nls, source, dist){

        if(!fs.existsSync(source)){
            grunt.fail.warn('Cannot finde path: ' + source)
            return;
        }

        //如果是目录的化
        if(fs.statSync(source).isDirectory()){
            fs.readdirSync(source).forEach(function(file){

                if (file.indexOf(nls) > -1) {
                    var curPath = source + '/' + file,
                        distPath = dist + '/' + file;
                    grunt.file.copy(curPath,distPath);
                    fs.unlinkSync(curPath);
                }

            });
        }else{

            //只是文件的化，直接copy
            //注意dist如果是目录，会：Unable to write "**" file (Error code: EISDIR)
            if(fs.statSync(dist).isDirectory()){
                grunt.file.copy(source,dist+'/'+source);
            }else{
                grunt.file.copy(source,dist);
            }
            
        }
    };

    //copyFolder
    function copyFolder(source, dist){

        if(!fs.existsSync(source)){
            grunt.fail.warn('Cannot find path: ' + source)
            return;
        }

        //just focus directory
        if(fs.statSync(source).isDirectory()){
            
            fs.readdirSync(source).forEach(function(file){

                var curPath = source + '/' + file,
                    distPath = dist + '/' + file;
                if(fs.statSync(curPath).isDirectory()){
                    copyFolder(curPath,distPath);
                }else{
                    grunt.file.copy(curPath,distPath);
                }

            });

        }else{

            if(fs.statSync(dist).isDirectory()){
                grunt.file.copy(source,dist+'/'+source);
            }else{
                grunt.file.copy(source,dist);
            }
            
        }

    };


    grunt.registerTask('copyBase', function(){
        var commonImagePath = 'usb-guide/' + 'images';
        //如果存在,删掉它
        if(fs.existsSync('usb-guide') && fs.existsSync(commonImagePath)){
            rimraf.sync(commonImagePath);
        }

        //mkdir common images
        fs.mkdirSync(commonImagePath);

        copyFolder(pathConfig.dist+'/images', commonImagePath);
    });

    //用来输出一个i18n的文件夹
    grunt.registerTask('copyI18n',function(nls){

        var nlsPath = 'usb-guide/' + nls;

        console.log(nlsPath);

        //如果一级不存在，就创建
        if(!fs.existsSync('usb-guide')){
            fs.mkdirSync('usb-guide');
        }

        //如果存在,删掉它
        if(fs.existsSync('usb-guide') && fs.existsSync(nlsPath)){
            rimraf.sync(nlsPath);
        }

        //创建二级
        fs.mkdirSync(nlsPath);

        //创建三级/images
        fs.mkdirSync(nlsPath + '/images');

        //copy文件：一个index.html、images的文件夹
        grunt.file.copy(pathConfig.dist+'/index.html',nlsPath+'/index.html');
        
        //5-21 add base
        copyFolderRecursive(nls, pathConfig.dist+'/images', nlsPath+'/images');
    
    });

    //for i18n
    //@nls zh-cn,en-us  ...
    grunt.registerTask('build',function(nls){

        //考虑多个nls
        var nlss = nls ? nls.toLowerCase().split(',') : ['zh-cn'];
        console.log(nlss);


        nlss.forEach(function(nls){

            var taskList = [
                'clean:dist',
                'copy:tmp',
                'processI18n:'+nls,
                'compass:dist',
                'requirejs:dist',
                'copy:dist',
                'useminPrepare',
                'concat',
                'uglify',
                'imagemin',
                'htmlmin',
                'usemin',
                'replace:common',
                'replace:dist',
                'replacemain',
                'copyI18n:'+ nls
            ];

            grunt.task.run(taskList);
            
        });

        //last copy common images
        grunt.task.run('copyBase');
    });
};
