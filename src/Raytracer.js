var Raytracer = exports.Raytracer = function Raytracer() {

}
// void Lambert(Interseccion inter, Vec4 L,Vec4 D, double* int_dif, double* int_spec, double intensity)
Raytracer.prototype.lambert = function(inter, L, D, int_dif, int_spec, intensity)
{
	var v = new Vec4();
	v.x=-D.x;
	v.y=-D.y;
	v.z=-D.z;
	v.w=0.0;
	var norm = L.norm();
	L = L.mult(1/norm);
	L.w=0;
	norm = inter.P.norm();
	inter.P = inter.P.mult(1/norm);
	inter.P.w=0;
	var temp = 0.0;
	temp = inter.N.dot(L) / (inter.N.norm() * L.norm());
	if(temp < 0.0) temp = 0.0;
	int_dif+= temp * intensity;
	var nl = 0.0;
	nl = inter.N.dot(L);
	var n2 = inter.N.mult(2);
	R = n2.rest(n2.mult(nl),L);
	R.w=0.0;
	var res = R.dot(v) / (R.norm() * v.norm());
	if(res > 1.0) res=1.0;
	if(res < 0.0) res=0.0;
	if(inter.M.coef_spec!=-1)
	{
		res = Math.pow(res, inter.M.coef_spec);
		int_spec+= res*intensity;
	}
	if(int_spec>1) int_spec=1;
};

Raytracer.prototype.get_distance=function(p0, p1)
{
	var sqr = (p1.x-p0.x)*(p1.x-p0.x) + (p1.y -p0.y)*(p1.y-p0.y) + (p1.z - p0.z) *(p1.z - p0.z);
	return Math.sqrt(sqr);
};	

//intersectar(Vec4 O, Vec4 D, double t_min, double t_max, List* spheres)
Raytracer.intersectar = function(O ,D, t_min, t_max, spheres)
{	
	var a = D.dot(D);
	var b = 0-0;
	var c=0.0;
	var t=t_max;
	var inter = new Interseccion(0, null, null, new Vec4(), new Vec4(), new Material(new Color(), new Color(), 0, 0, 0, 0));
	for(var i = 0; i<spheres.length; i++)
	{
		sp = spheres[i];
		var center = sp.center;
		var radius = sp.radius;
		var rest = O.resta(center);
		b = 2*D.dot(rest);
		c = rest.dot(rest) - (radius*radius);
		var det = b * b - 4 * a * c;
		if(det >=0)
		{
			var calc_t1 = (-b-Math.sqrt(b*b-4*a*c))/(2*a);
			var calc_t2 = (-b+Math.sqrt(b*b+4*a*c))/(2*a);
			if(calc_t1>calc_t2) calc_t1=calc_t2;
			else if(det===0) calc_t1 = -b/(2*a);
			if((calc_t1>=t_min)&&(calc_t1<t_max)&&(calc_t1<t))
			{
				t = calc_t1;
				var dt = D.mult(t);
				var P = dt.sum(O);
				var N = P.resta(center);
				var norm = N.norm();
				N = N.mult(1/norm);
				inter.exists=1;
				inter.P = P;
				inter.N = N;
				inter.t = t;
				inter.sp = sp;
				var color_dif = sp.color_dif;
				var color_spec = sp.color_spec;
				var coef_spec =sp.coef_spec;
				var coef_ref = sp.coef_ref;
				var M = new Material();
				M.color_dif = color_dif;
				M.color_spec = color_spec;
				M.coef_spec = coef_spec;
				M.coef_ref = coef_ref;
				M.coef_refr = sp.coef_refr;
				inter.M = M;
			}
		}
	}
	return inter;

};
 
//Color trazar_rayo(Vec4 O, Vec4 D, double t_min, double t_max, int rec_max, double ambient, List* point_lights, List* directional_lights, List* spheres, double ambient_refraction, Sphere* last_sphere, Triangle* triangles, int num_triangles, Color* texture, int skinwidth, int skinheight)
Raytracer.prototype.trazar_rayo=function(O, D, t_min, t_max, rec_max, ambient, point_lights, directional_lights, spheres, ambient_refraction, last_sphere)
{
	var inter = intersectar(O, D, t_min, t_max, spheres);
	var c = new Color();
	var reflexion =1;
	var transparency=1;
	if(inter.exists)
	{
		c=inter.M.color_dif.mult(ambient);
		var int_dif = 0;
		var int_spec = 0;
		var L;
		var i;
		var int_sombra=0;
		for(i = 0; i< point_lights.length; i++)
		{
			var pl = point_lights[i];
			L = new Vec4(pl.vec.x-inter.P.x, pl.vec.y-inter.P.y, pl.vec.z-inter.P.z);
			int_sombra = intersectar(inter.P, L, 0.0001, 1, sphere);
			if(!int_sombra.exists)
			{
				Lambert(inter, L, D, int_dif, int_spec, pl.intensity);
			}
		}	
		
		for(i =0; i<directional_lights.length; i++)
		{
			var dl = directional_lights[i];
			L= new Vec4(-dl.vec.x, -dl.vec.y, -dl.vec.z);
			int_sombra= intersectar(inter.P, L, 0.0001, Infinity, spheres);
			if(!int_sombra.exists)
			{
				Lambert(inter, L, D, int_dif, int_spec, dl.intensity);
			}
		}
		if((reflexion)&&(rec_max>0)&&(inter.M.coef_ref>0))
		{
			c = (inter.M.color_dif.mult(int_dif)).sum(inter.M.color_spec.mult(int_spec), c);
			var nullVector = new Vec4();
			var rest = nullVector.resta(D);
			var R = (inter.N.mult(2*inter.N.dot(rest))).sum(D);
		}
	}
	return c;
};	
