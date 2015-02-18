define("DirectionalLight", ["Vec4", "Color"], function(Vec4, Color)
{
	function DirectionalLight(vec, intensity, color)
	{
		this.vec = vec;
		this.intensity = intensity;
		this.color = color;
	}
	return DirectionalLight;
});
