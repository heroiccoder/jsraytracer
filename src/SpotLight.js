define("SpotLight", ["Vec4", "Color"], function(Vec4, Color)
{
	function SpotLight(vec, direction, angle, intensity, color)
	{
		this.vec=vec;
		this.direction=direction;
		this.angle=angle;
		this.intensity=intensity;
		this.color=color;
	}
	return SpotLight;
});
