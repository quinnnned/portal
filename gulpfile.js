/// <reference path="./typings/gulp-nodemon/gulp-nodemon.d.ts" />

var gulp    = require('gulp'),
    ts      = require('gulp-typescript')('tsconfig.json',{
                typescript: require('typescript')
    }),
    jasmine = require('gulp-jasmine')({verbose:true}),
    del     = require('del'),
    nodemon = require('gulp-nodemon'),
    config = {
        files: {
            typings : {
                all: 'typings/**/*.d.ts',
                node: 'typings/node/node.d.ts',
                angular: 'typings/angular2/angular2.d.ts'
            },
            vendors : {
                angular : 'node_modules/angular2/bundles/angular2.dev.js',
                system : 'node_modules/systemjs/dist/system.src.js',
                reflect : 'node_modules/reflect-metadata/Reflect.js'
            },
            src: { // ts & html source (consider jade?)
                ts: 'src/**/*.ts',
                html: 'src/**/*.html'
            },
            test: { // js testing environment
                root   : 'test/',
                specs  : 'test/**/*.spec.js',
                client : 'test/**/*.client.js',
                server : 'test/**/*.server.js',
                shared : 'test/**/*.shared.js'
            },
            dist: { // 
                root: 'dist/',
                client: {
                    root : 'dist/client/',
                    js   : 'dist/client/',
                    css  : 'dist/client/css/'
                },
                server: 'dist/server/'
            },
        }
    };
    
gulp.task('clean.test', function(){ 
    return del([config.files.test.root]); 
});

gulp.task('clean.dist', function(){ 
    return del([config.files.dist.root]); 
});

gulp.task('clean', ['clean.test', 'clean.dist']);

gulp.task('transpile.ts', ['clean.test'], function() {
    return gulp
        .src([
            'node_modules/angular2/bundles/typings/**/*.d.ts',
            config.files.typings.all,
            config.files.src.ts
        ]).pipe(ts)
        .pipe(gulp.dest(config.files.test.root));
});

gulp.task('transpile.html', ['clean.test'], function() {
   return gulp
    .src(config.files.src.html)
    .pipe(gulp.dest(config.files.test.root));
});

gulp.task('prepare.test', ['transpile.ts','transpile.html']);

gulp.task('test', ['prepare.test'], function() {
    return gulp
        .src(config.files.test.specs)
        .pipe(jasmine);
});

gulp.task('prepare.dist', ['clean.dist', 'test']);

gulp.task('dist.etc', ['prepare.dist'], function(){
    return gulp
        .src(config.files.test.root + 'index.html')
        .pipe(gulp.dest(config.files.dist.client.root));
});

gulp.task('dist.client.js', ['prepare.dist'], function(){
    return gulp
        .src([ //Define concatenation order
            config.files.vendors.system, 
            config.files.vendors.angular,
            config.files.vendors.reflect, 
            config.files.test.client ])
        .pipe(gulp.dest(config.files.dist.client.js));
});

gulp.task('dist.server.js', ['prepare.dist'], function() {
    return gulp
        .src(config.files.test.server)
        .pipe(gulp.dest(config.files.dist.server));
});

gulp.task('dist.shared.js', ['prepare.dist'], function() {
    return gulp
        .src(config.files.test.shared)
        .pipe(gulp.dest(config.files.dist.server))
        .pipe(gulp.dest(config.files.dist.client.js));
});

gulp.task('dist', ['dist.etc','dist.client.js','dist.server.js', 'dist.shared.js']); 

gulp.task('develop', ['dist'], function() {
   nodemon({
       script: 'dist/server/app/app.server.js',
       ext: 'ts html css',
       watch: ['src/'],
       tasks: ['dist'],
       stdout:true,
       env: {
           'PORT':'8080',
           'IP':'0.0.0.0'
       },
       verbose: true,
   }).on('stdout',console.log).on('stderr',console.error);
});

gulp.task('default', ['dist']);



//NOTES TO JESSE: Next you'll need to get your distribution folders and workflow set up.********************