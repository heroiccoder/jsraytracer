// This test suite uses [Jasmine](http://jasmine.github.io/2.0/introduction.html)-like assertions.
define(['jsraytracer'], function (jsraytracer) {
	"use strict";
	
	describe("Color", function () {
		var Color = jsraytracer.Color;
		
		it("toRGB()", function () {
			expect((new Color(0x7f, 0x00, 0x00)).toRGB()).toBe(0x7f0000);
			expect((new Color(0x00, 0xca, 0xfe)).toRGB()).toBe(0x00cafe);
			expect((new Color(0x12, 0x34, 0x56)).toRGB()).toBe(0x123456);
		});
	}); //// describe.
}); //// define.