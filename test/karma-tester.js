﻿"use strict";
//// Testing environment extensions and custom definitions. ////////////////////

beforeEach(function() { // Add custom matchers.
	this.addMatchers({
		toBeOfType: function(type) {
			switch (typeof type) {
				case 'function': return this.actual instanceof type;
				case 'string': return typeof this.actual === type;
				default: throw new Error('Unknown type '+ type +'!');
			}
		}
	});
});

//// Actual testing brought to you by RequireJS. ///////////////////////////////

require.config({ // Configure RequireJS.
	baseUrl: '/base', // Karma serves files under /base, which is the basePath from your config file
	paths: {
		'jsraytracer': '/base/build/jsraytracer'
	}
});
require(Object.keys(window.__karma__.files) // Dynamically load all test files
		.filter(function (file) { // Filter test modules.
			return /\.test\.js$/.test(file);
		}).map(function (file) { // Normalize paths to RequireJS module names.
			return file.replace(/^\/base\//, '').replace(/\.js$/, ''); 
		}), 
	function () {
		window.__karma__.start(); // we have to kickoff jasmine, as it is asynchronous
	}
);