/** Gruntfile for [jsraytracer](https://github.com/heroiccoder/jsraytracer).
*/
var sourceFiles = [
		'src/Vec4',
		'src/Sphere',
		'src/Material',
		'src/Intersection',
		'src/Color',
		'src/Canvas',
		'src/Raytracer'
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
		}
	});
// Load tasks. /////////////////////////////////////////////////////////////////
	grunt.loadNpmTasks('grunt-concat-sourcemap');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
// Register tasks. /////////////////////////////////////////////////////////////
	grunt.registerTask('compile', ['concat_sourcemap:build', 'uglify:build']); 
	grunt.registerTask('build', ['compile']);
	grunt.registerTask('default', ['build']);
};