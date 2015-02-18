// COLOR

define("Color", function()
{
	function Color(r, g, b) {
		this.r = r | 0;
		this.g = g | 0;
		this.b = b | 0;	
	}
	Color.prototype.mult = function(h)
	{
		var color = new Color(this.r, this.g, this.b);
		if(color.r*h>255) color.r=255;
		else color.r=(int) (h*color.r);
		if(color.g*h>255) color.g=255;
		else color.g=(int) (h*color.g);
		if(color.b*h>255) color.b=255;
		else color.b=(int) (h*color.b);
		return color;
	};
	Color.prototype.suma = function(color2)
	{	
		var color = new Color(this.r, this.g, this.b);
		var r,r1,g,g1,b,b1=0;
		r=Math.floor(color.r);
		g=Math.floor(color.g);
		b=Math.floor(color.b);
		r1=Math.floor(color2.r);
		g1=Math.floor(color2.g);
		b1=Math.floor(color2.b);
		if(r+r1<255)
			color.r=color.r+color2.r;
		else	
			color.r=255;
		if(g+g1<255)
			color.g=color.g+color2.g;
		else	
			color.g=255;
		if(b+b1<255)
			color.b=color.b+color2.b;
		else	
			color.b=255;
		return color;
	};
	return Color;
});
