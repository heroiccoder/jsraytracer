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
		it("tests correct constructor assignment", function()
			{
				var v1 = new Vec4(1.0, 2.0, 3.0);
				['x', 'y', 'z'].forEach(function(property, i){
					expect(v1[property]).toBe(++i);
				});
				expect(v1.w).toBe(0.0);
			});
		it("tests copy, expects to receive a new vector with the same values", function()
			{
				var v1 = new Vec4(1.0, 2.0, 3.0);
				var v2 = v1.copy();
				expect(v1===v2).toBe(false);
				['x', 'y', 'z'].forEach(function(property,i){
					expect(v2[property]).toBe(++i);
				});
				expect(v2.w).toBe(0.0);
			});
		it("tests the static cross product operation", function()
			{
				var v1 = new Vec4(1.0, 2.0, 3.0);
				var v2 = new Vec4(3.0, 2.0, 1.0);
				var res = Vec4.cross(v1, v2);
				var v3 = new Vec4(0.0, 1.0, 0.0);
				var res2 = Vec4.cross(res, v3);
				var v4 = new Vec4(-1.0, 3, 4.0);
				var res3 = Vec4.cross(res, v4);
				expect(res.x).toBe(-4);
				expect(res.y).toBe(8);
				expect(res.z).toBe(-4);
				expect(res.w).toBe(0);
				expect(res2.x).toBe(4);
				expect(res2.y).toBe(0);
				expect(res2.z).toBe(-4);
				expect(res2.w).toBe(0);
				expect(res3.x).toBe(44);
				expect(res3.y).toBe(20);
				expect(res3.z).toBe(-4);
				expect(res3.w).toBe(0);
			});
		it("tests the non static cross product operation", function()
			{
				for(var x = -25; x<=25; x++)
				{
					for(var y = -25; y<=25; y++)
					{
						for(var z = -25; z<=25; z++)
						{
							var v1 = new Vec4(x,y,z);
							var v2 = new Vec4(z,x,y);
							var res = Vec4.cross(v1, v2);
							var res2 = v1.cross(v2);
							expect(res2.x).toBe(res.x);
							expect(res2.y).toBe(res.y);
							expect(res2.z).toBe(res.z);
							expect(res2.w).toBe(res.w);
						}
					}
				}
			});
		it("tests the static cross product and store operation", function()
				{
					for(var x = -25; x<=25; x++)
					{
						for(var y = -25; y<=25; y++)
						{
							for(var z = -25; z<=25; z++)
							{
								var v1 = new Vec4(x,y,z);
								var v2 = new Vec4(z,x,y);
								var res = v1.cross(v2);
								var res2 = new Vec4();
								Vec4.cross_s(v1, v2, res2);
								expect(res2.x).toBe(res.x);
								expect(res2.y).toBe(res.y);
								expect(res2.z).toBe(res.z);
								expect(res2.w).toBe(res.w);
							}
						}
					}
				});
		it("tests the cross product and store operation", function()
				{
					for(var x = -25; x<=25; x++)
					{
						for(var y = -25; y<=25; y++)
						{
							for(var z = -25; z<=25; z++)
							{
								var v1 = new Vec4(x,y,z);
								var v2 = new Vec4(z,x,y);
								var res = v1.cross(v2);
								var res2 = new Vec4();
								v1.cross_s(v2, res2);
								expect(res2.x).toBe(res.x);
								expect(res2.y).toBe(res.y);
								expect(res2.z).toBe(res.z);
								expect(res2.w).toBe(res.w);
							}
						}
					}
				});
		it("tests the dot product operation", function()
				{
					var v1 = new Vec4(1.0, 2.0, 3.0);
	        var v2 = new Vec4(3.0, 2.0, 1.0);
	        expect(v1.dot(v2)).toBe(10);
	        var v3 = new Vec4(0.0, 1.0, 0.0);
					expect(v1.dot(v3)).toBe(2);
					expect(v2.dot(v1)).toBe(10);
				});
		it("tests the add operation", function()
				{
					var v1 = new Vec4(1.0, 2.0, 3.0);
					v1.w = 4.0;
	        var v2 = new Vec4(1.0, 2.0, 3.0);
					var v3 = v1.add(v2);

	        expect(v3.x).toBe(2);
	        expect(v3.y).toBe(4);
	        expect(v3.z).toBe(6);
	        expect(v3.w).toBe(4);
				});
		it("tests the subtract operation", function()
				{
					var v1 = new Vec4(1.0, 2.0, 3.0);
					v1.w = 4.0;
	        var v2 = new Vec4(1.0, 2.0, 3.0);
					var v3 = v1.subtract(v2);

	        expect(v3.x).toBe(0);
	        expect(v3.y).toBe(0);
	        expect(v3.z).toBe(0);
	        expect(v3.w).toBe(4);
				});
		it("tests the multiply operation", function()
				{
					var v1 = new Vec4(1.0, 2.0, 3.0);
					var v3 = v1.multiply(4);

	        expect(v3.x).toBe(4);
	        expect(v3.y).toBe(8);
	        expect(v3.z).toBe(12);
	        expect(v3.w).toBe(0);
				});
		it("tests the calculate magnitude of vector operation", function()
				{
					var v1 = new Vec4(4.0, 8.0, 8.0);
					var v3 = v1.norm();

	        expect(v3).toBe(12);
				});
	}); //// describe.
}); //// define.
