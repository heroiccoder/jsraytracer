define(['jsraytracer'], function (jsraytracer) {
	"use strict";
	
	describe("Matrix4", function () {
		var Matrix4 = jsraytracer.Matrix4;
		it("basics", function() {
			expect(typeof Matrix4).toBe('function'); // Constructor Matrix4 Exists.
			var m1 = new Matrix4(); // Constructor by defautl assigns all zeroes
			expect(m1.matrix.length).toBe(4); // matrix has correct number of rows
			expect(m1.matrix[0].length).toBe(4); // matrix has correct number of columns
			[0, 1, 2, 3].foreach(function (x)
			{
				[0, 1, 2, 3].foreach(function(y)
					{
						expect(m1.matrix[x][y]).toBe(0.0);
					});
			}	);
		});
		it("basics", function() {
			expect(typeof Matrix4).toBe('function'); // Constructor Matrix4 Exists.
			var m1 = new Matrix4(); // Constructor by defautl assigns all zeroes
			expect(m1.matrix.length).toBe(4); // matrix has correct number of rows
			expect(m1.matrix[0].length).toBe(4); // matrix has correct number of columns
			[0, 1, 2, 3].foreach(function (x)
			{
				[0, 1, 2, 3].foreach(function(y)
					{
						expect(m1.matrix[x][y]).toBe(0.0);
					});
			}	);
		});
		it("tests correct construction of identity matrix", function(){
			
		});

	});
});
