﻿/** Gruntfile for [jsraytracer](https://github.com/heroiccoder/jsraytracer).
*/
var sourceFiles = [
		'src/__prologue__',
		'src/Vec4',
		'src/Sphere',
		'src/Material',
		'src/Intersection',
		'src/Color',
		'src/Canvas',
		'src/Matrix',
		'src/PointLight',
		'src/DirectionalLight',
		'src/SpotLight',
		//'src/ConfigParser',
		'src/Raytracer',
		'src/__epilogue__'
	];
// Init config. ////////////////////////////////////////////////////////////////
module.exports = function(grunt) {
	grunt.file.defaultEncoding = 'utf8';
// Init config. ////////////////////////////////////////////////////////////////
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat_sourcemap: { ////////////////////////////////////////////////////
			build: {
				src: sourceFiles.map(function (path) { return path +'.js'; }),
				dest: 'build/<%= pkg.name %>.js',
				options: {
					separator: '\n\n'
				}
			},
		},
		uglify: { //////////////////////////////////////////////////////////////
			build: {
				src: 'build/<%= pkg.name %>.js',
				dest: 'build/<%= pkg.name %>.min.js',
				options: {
					banner: '//! <%= pkg.name %> <%= pkg.version %>\n',
					report: 'min',
					sourceMap: true,
					sourceMapIn: 'build/<%= pkg.name %>.js.map',
					sourceMapName: 'build/<%= pkg.name %>.min.js.map'
				}
			}
		},
		karma: { ///////////////////////////////////////////////////////////////
			options: {
				configFile: 'test/karma.conf.js'
			},
			build: { browsers: ['PhantomJS'] }
		},
		jshint: { /////////////////////////////////////////////////////////////
			beforeconcat: ['src/Raytracer.js', "src/Matrix.js", "src/Color.js", "src/Vec4.js","src/Canvas.js", "src/DirectionalLight.js","src/PointLight.js","src/Intersection.js","src/Material.js","src/Sphere.js"],
			afterconcat: ['build/jsraytracer.js']
		},
	});
// Load tasks. /////////////////////////////////////////////////////////////////
	grunt.loadNpmTasks('grunt-concat-sourcemap');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
	
// Register tasks. /////////////////////////////////////////////////////////////
	grunt.registerTask('compile', ['jshint:beforeconcat','concat_sourcemap:build', 'uglify:build']); 
	grunt.registerTask('build', ['compile', 'jshint:afterconcat', 'karma:build']);
	grunt.registerTask('default', ['build']);
};
