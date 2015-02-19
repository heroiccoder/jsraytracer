// This test suite uses [Jasmine](http://jasmine.github.io/2.0/introduction.html)-like assertions.
define(['jsraytracer'], function (jsraytracer) {
	"use strict";
	
	describe("Vec4", function () {
		var Vec4 = jsraytracer.Vec4;
		it("basics", function () {
			expect(typeof Vec4).toBe('function'); // Constructor Vec4 exists.
			var v1 = new Vec4(); // Constructor by default assigns all zeroes.
			['x', 'y', 'z', 'w'].forEach(function (property) {
				expect(v1[property]).toBe(0.0);
			});
		});
	}); //// describe.
}); //// define.