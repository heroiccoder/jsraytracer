define("Sphere", function()
{
	// Vec4 center, double radius, color c_dif, color c_spec, double coef_ref, double coef_refr, double coef_tr
	function Sphere(center, radius, c_dif, c_spec, coef_spec, coef_ref, coef_refr, coef_tr)
	{
		this.center=center;
		this.radius=radius;
		this.color_dif=c_dif;
		this.color_spec=c_spec;
		this.coef_spec=coef_spec;
		this.coef_ref=coef_ref;
		this.coef_refr=coef_refr;
		this.coef_tr=coef_tr;
		return this;
	}
	return Sphere;
});
