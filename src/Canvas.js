var Canvas = exports.Canvas = function Canvas(width, height) {	
	this.width = width;
	this.height = height;
	
	this.pixels = this.create_matrix(width, height);
}

Canvas.prototype.create_matrix = function(width, height)
{	
	var pixels = new Array(width);
	var i = 0;
	var j=0;
	for(i=0; i<width; i++)
	{
		pixels[i] = new Array(height);
		for(j=0; j<height; j++)
		{
			pixels[i][j] = new Color(0,0,0);
		}
	}
	return pixels;
};

Canvas.prototype.putpixel = function(x, y, color) {
	this.pixels[x][y] = color;
};
