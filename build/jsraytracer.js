function Vec4(x, y, z){
	this.x = +x || 0;
	this.y = +y || 0;
	this.z = +z || 0;
	this.w = 0.0;	
}

// returns the result of the dot product between vectors a and b
Vec4.prototype.dot = function(a, b){
	return(a.x*b.x+a.y*b.y+a.z*b.z);
};
// returns the result of the cross product of vectors a and b in a new vector
Vec4.prototype.cross = function(a,b){
	var vec_result = new Vec4();
	vec_result.x=(a.y*b.z)-(a.z*b.y);
	vec_result.y=-((a.x*b.z)-(a.z*b.x));
	vec_result.z=(a.x*b.y)-(a.y*b.x);
	return vec_result;
};
// stores in vector c the cross product of vectors a and b
Vec4.prototype.cross_s = function(a,b,c){
	c.x=(a.y*b.z)-(a.z*b.y);
	c.y=-((a.x*b.z)-(a.z*b.x));
	c.z=(a.x*b.y)-(a.y*b.x);
};
Vec4.prototype.norm = function(){
	return(Math.sqrt((v.x)*(v.x)+(v.y)*(v.y)+(v.z)*(v.z)));
};
Vec4.prototype.mult = function(m){
	vec_result = new Vec4();
	vec_result.x = this.x*m;
	vec_result.y = this.y*m;
	vec_result.z = this.z*m;
	vec_result.w = 0.0;
};
Vec4.prototype.resta = function(y){
	vec_result = new Vec4();
	v=this;
	vec_result.x=v.x-y.x;
	vec_result.y=v.y-y.y;
	vec_result.z=v.z-y.z;
	vec_result.w=v.w-y.w;
	return vec_result;
};
Vec4.prototype.suma = function(y){
	vec_result = new Vec4();
	v=this;
	vec_result.x=v.x+y.x;
	vec_result.y=v.y+y.y;
	vec_result.z=v.z+y.z;
	vec_result.w=v.w+y.w;
	return vec_result;
};

// Vec4 center, double radius, color c_dif, color c_spec, double coef_ref, double coef_refr, double coef_tr
function Sphere(center, radius, c_dif, c_spec, coef_spec, coef_ref, coef_refr, coef_tr)
{
    this.center=center;
    this.radius=radius;
    this.c_dif=c_dif;
    this.c_spec=c_spec;
    this.coef_spec=coef_spec;
	this.coef_ref=coef_ref;
	this.coef_refr=coef_refr;
	this.coef_tr=coef_tr;
	return this;
}

// MATERIAL

function Material(color_dif, color_spec, coef_spec, coef_ref, coef_tr, coef_refr) {
	this.color_dif = color_dif || null;
	this.color_spec = color_spec || null;
	this.coef_ref = coef_ref || null;
	this.coef_tr = coef_tr || null;
	this.coef_refr = coef_refr || null;
}

// INTERSECCION

function Interseccion(exists, sphere, t, P, N, M) {
	this.exists = exists || 0;
	this.sphere = sphere || null;
	this.t = t || null;
	this.P = P || null;
	this.N = N || null;
	this.M = M || null;
}

// COLOR

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


// CANVAS
// PAINTING CANVAS

function Canvas(width, height)
{
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
	this.pixels[Math.floor(x+this.width / 2)][Math.floor(-y + this.height / 2)] = color;
};


// RAYTRACER
// RAYTRACING ALGORITHM

function Raytracer() {
	
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
			pl = point_lights[i];
			L = new Vec4(pl.vec.x-inter.P.x, pl.vec.y-inter.P.y, pl.vec.z-inter.P.z);
			int_sombra = intersectar(inter.P, L, 0.0001, 1, sphere);
			if(!int_sombra.exists)
			{
				Lambert(inter, L, D, int_dif, int_spec, pl.intensity);
			}
		}
		
		for(i =0; i<directional_lights.length; i++)
		{
			dl = directional_lights[i];
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
};


//# sourceMappingURL=jsraytracer.js.map