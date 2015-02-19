var Material = exports.Material = function Material(color_dif, color_spec, coef_spec, coef_ref, coef_tr, coef_refr) {
	this.color_dif = color_dif || null;
	this.color_spec = color_spec || null;
	this.coef_ref = coef_ref || null;
	this.coef_tr = coef_tr || null;
	this.coef_refr = coef_refr || null;
}
