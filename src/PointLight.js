define("PointLight", ["Vec4", "Color"], function(Vec4, Color)
{
	function PointLight(vec, intensity, color)
	{
		this.vec=vec;
		this.intensity=intensity;
		this.color=color;	
	}
	return PointLight;
});
