define(['jsraytracer'], function (jsraytracer) {
	"use strict";
	
	describe("Matrix4", function () {
		var Matrix4 = jsraytracer.Matrix4;
		var Vec4 = jsraytracer.Vec4;
		it("basics", function() {
			expect(typeof Matrix4).toBe('function'); // Constructor Matrix4 Exists.
			var m1 = new Matrix4(); // Constructor by defautl assigns all zeroes
			expect(m1.matrix.length).toBe(4); // matrix has correct number of rows
			expect(m1.matrix[0].length).toBe(4); // matrix has correct number of columns
			[0, 1, 2, 3].forEach(function (x)
			{
				[0, 1, 2, 3].forEach(function(y)
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
			[0, 1, 2, 3].forEach(function (x)
			{
				[0, 1, 2, 3].forEach(function(y)
					{
						expect(m1.matrix[x][y]).toBe(0.0);
					});
			}	);
		});
		it("tests correct construction of identity matrix", function(){
			var m1 = Matrix4.makeIdentity();
			expect(m1.matrix.length).toBe(4); // matrix has correct number of rows
			expect(m1.matrix[0].length).toBe(4); // matrix has correct number of columns
			[0, 1, 2, 3].forEach(function (x)
			{
				[0, 1, 2, 3].forEach(function(y)
					{
						if(x!=y)
						{
							expect(m1.matrix[x][y]).toBe(0.0);
						} else {
							expect(m1.matrix[x][y]).toBe(1.0);
						}
					});
			}	);

		});
		it("tests correct multiplication of a matrix times vector", function() {
			var m1 = new Matrix4();
			var v1 = new Vec4(2,3,4);
			v1.w=5;
			m1.matrix[0][0]=1;
			m1.matrix[0][1]=2;
			m1.matrix[0][2]=4;
			m1.matrix[0][3]=3;
			m1.matrix[1][0]=5;
			m1.matrix[1][1]=6;
			m1.matrix[1][2]=7;
			m1.matrix[1][3]=8;
			m1.matrix[2][0]=5;
			m1.matrix[2][1]=23;
			m1.matrix[2][2]=2;
			m1.matrix[2][3]=1;
			m1.matrix[3][0]=3;
			m1.matrix[3][1]=4;
			m1.matrix[3][2]=21;
			m1.matrix[3][3]=1;
			var v2 = m1.multVec(v1);
			expect(v2.x).toBe(39);
			expect(v2.y).toBe(96);
			expect(v2.z).toBe(92);
			expect(v2.w).toBe(107);
		});
	});
});
