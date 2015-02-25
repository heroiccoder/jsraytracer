/** Package wrapper and layout.
*/
(function (global, init) { // Universal Module Definition. See <https://github.com/umdjs/umd>.
	"use strict";
	if (typeof define === 'function' && define.amd) {
		define([], init); // AMD module.
	} else if (typeof exports === 'object' && module.exports) {
		module.exports = init(); // CommonJS module.
	} else { // Browser or web worker (probably).
		global.jsraytracer = init();
	}
})(this, function __init__(){
	"use strict";
	var exports = { };

var Vec4 = exports.Vec4 = function Vec4(x, y, z){
	this.x = +x || 0;
	this.y = +y || 0;
	this.z = +z || 0;
	this.w = 0.0;	
};
Vec4.prototype.copy = function()
{
	var vec4 = new Vec4(this.x, this.y, this.z);
	vec4.w = this.w;
	return vec4;
};

// returns the result of the dot product between vectors this and b
Vec4.prototype.dot = function(b){
	return(this.x*b.x+this.y*b.y+this.z*b.z);
};
// returns the result of the cross product of vectors a and b in a new vector
Vec4.cross = function(a,b){
	var vec_result = new Vec4();
	vec_result.x=(a.y*b.z)-(a.z*b.y);
	vec_result.y=-((a.x*b.z)-(a.z*b.x));
	vec_result.z=(a.x*b.y)-(a.y*b.x);
	return vec_result;
};
// returns the result of the cross product of 'this' vector and b in a new vector
Vec4.prototype.cross = function(b)
{
	var vec_result = new Vec4();
	vec_result.x=(this.y*b.z)-(this.z*b.y);
	vec_result.y=-((this.x*b.z)-(this.z*b.x));
	vec_result.z=(this.x*b.y)-(this.y*b.x);
	return vec_result;
};
// stores in vector c the cross product of vectors a and b
Vec4.cross_s = function(a,b,c){
	c.x=(a.y*b.z)-(a.z*b.y);
	c.y=-((a.x*b.z)-(a.z*b.x));
	c.z=(a.x*b.y)-(a.y*b.x);
};

// stores in vector c the cross product of vectors 'this' and b
Vec4.prototype.cross_s = function(b,c){
	c.x=(this.y*b.z)-(this.z*b.y);
	c.y=-((this.x*b.z)-(this.z*b.x));
	c.z=(this.x*b.y)-(this.y*b.x);
};

Vec4.prototype.norm = function(){
	var v=this;
	return(Math.sqrt((v.x)*(v.x)+(v.y)*(v.y)+(v.z)*(v.z)));
};
Vec4.prototype.multiply = function(m){
	var vec_result = new Vec4();
	vec_result.x = this.x*m;
	vec_result.y = this.y*m;
	vec_result.z = this.z*m;
	vec_result.w = 0.0;
	return vec_result;
};
Vec4.prototype.subtract = function(y){
	var vec_result = new Vec4();
	var v=this;
	vec_result.x=v.x-y.x;
	vec_result.y=v.y-y.y;
	vec_result.z=v.z-y.z;
	vec_result.w=v.w-y.w;
	return vec_result;
};
Vec4.prototype.add = function(y){
	var vec_result = new Vec4();
	var v=this;
	vec_result.x=v.x+y.x;
	vec_result.y=v.y+y.y;
	vec_result.z=v.z+y.z;
	vec_result.w=v.w+y.w;
	return vec_result;
};


// Vec4 center, double radius, color c_dif, color c_spec, double coef_ref, double coef_refr, double coef_tr
var Sphere = exports.Sphere = function Sphere(center, radius, c_dif, c_spec, coef_spec, coef_ref, coef_refr, coef_tr) {
	this.center=center;
	this.radius=radius;
	this.color_dif=c_dif;
	this.color_spec=c_spec;
	this.coef_spec=coef_spec;
	this.coef_ref=coef_ref;
	this.coef_refr=coef_refr;
	this.coef_tr=coef_tr;
	return this;
};


var Material = exports.Material = function Material(color_dif, color_spec, coef_spec, coef_ref, coef_tr, coef_refr) {
	this.color_dif = color_dif || null;
	this.color_spec = color_spec || null;
	this.coef_ref = coef_ref || null;
	this.coef_tr = coef_tr || null;
	this.coef_refr = coef_refr || null;
};


var Interseccion = exports.Interseccion = function Interseccion(exists, sphere, t, P, N, M) {
	this.exists = exists || 0;
	this.sphere = sphere || null;
	this.t = t || null;
	this.P = P || null;
	this.N = N || null;
	this.M = M || null;
};


var Color = exports.Color = function Color(r, g, b) {
	this.r = r | 0;
	this.g = g | 0;
	this.b = b | 0;	
};

Color.prototype.multiply = function mult(h) {
	var color = new Color(this.r, this.g, this.b);
	if(color.r*h>255) color.r=255;
	else color.r=Math.floor(h*color.r);
	if(color.g*h>255) color.g=255;
	else color.g=Math.floor(h*color.g);
	if(color.b*h>255) color.b=255;
	else color.b=Math.floor(h*color.b);
	return color;
};

Color.prototype.suma = function suma(color2) {	
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

Color.prototype.toRGB = function toRGB() {
	return (this.r & 0xFF) << 16 | (this.g & 0xFF) << 8 | (this.b & 0xFF);
};


var Canvas = exports.Canvas = function Canvas(width, height) {	
	this.width = width;
	this.height = height;
	
	this.pixels = this.create_matrix(width, height);
};

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


var Matrix4 = exports.Matrix4 =function Matrix4()
	{
		this.matrix=[[0.0,0.0,0.0,0.0],[0.0,0.0,0.0,0.0],[0.0,0.0,0.0,0.0],[0.0,0.0,0.0,0.0]];
		
	};
	Matrix4.makeIdentity = function()
	{
		var m = new Matrix4();
		m.matrix[0][0]=1;
		m.matrix[1][1]=1;
		m.matrix[2][2]=1;
		m.matrix[3][3]=1;
		return m;
	};
	Matrix4.prototype.makeIdentity = function()
	{
		var m = new Matrix4();
		m.matrix[0][0]=1;
		m.matrix[1][1]=1;
		m.matrix[2][2]=1;
		m.matrix[3][3]=1;
		return m;
	};
	Matrix4.makeXRot = function(alpha)
	{
		alpha=(alpha/180)*Math.PI;
		var m = new Matrix4();
		m.matrix[0][0]=1.0;
		m.matrix[3][3]=1.0;
		m.matrix[1][1]=Math.cos(alpha);
		m.matrix[1][2]=-Math.sin(alpha);
		m.matrix[2][1]=Math.sin(alpha);
		m.matrix[2][2]=Math.cos(alpha);
		return m;
	};

	Matrix4.prototype.makeXRot = function(alpha)
	{
		alpha=(alpha/180)*Math.PI;
		var m = new Matrix4();
		m.matrix[0][0]=1.0;
		m.matrix[3][3]=1.0;
		m.matrix[1][1]=Math.cos(alpha);
		m.matrix[1][2]=-Math.sin(alpha);
		m.matrix[2][1]=Math.sin(alpha);
		m.matrix[2][2]=Math.cos(alpha);
		return m;
	};
	Matrix4.makeYRot = function(alpha)
	{
		alpha=(alpha/180)*Math.PI;
		var m = new Matrix4();
		m.matrix[1][1]=1.0;
		m.matrix[3][3]=1.0;
		m.matrix[0][0]=Math.cos(alpha);
		m.matrix[2][0]=-Math.sin(alpha);
		m.matrix[0][2]=Math.sin(alpha);
		m.matrix[2][2]=Math.cos(alpha);
		return m;
	};

	Matrix4.prototype.makeYRot = function(alpha)
	{
		alpha=(alpha/180)*Math.PI;
		var m = new Matrix4();
		m.matrix[1][1]=1.0;
		m.matrix[3][3]=1.0;
		m.matrix[0][0]=Math.cos(alpha);
		m.matrix[2][0]=-Math.sin(alpha);
		m.matrix[0][2]=Math.sin(alpha);
		m.matrix[2][2]=Math.cos(alpha);
		return m;
	};
	Matrix4.makeZRot = function(alpha)
	{
		alpha=(alpha/180)*Math.PI;
		var m = new Matrix4();
		m.matrix[2][2]=1.0;
		m.matrix[3][3]=1.0;
		m.matrix[0][0]=Math.cos(alpha);
		m.matrix[0][1]=-Math.sin(alpha);
		m.matrix[1][0]=Math.sin(alpha);
		m.matrix[1][1]=Math.cos(alpha);
		return m;
	};

	Matrix4.prototype.makeZRot = function(alpha)
	{
		alpha=(alpha/180)*Math.PI;
		var m = new Matrix4();
		m.matrix[2][2]=1.0;
		m.matrix[3][3]=1.0;
		m.matrix[0][0]=Math.cos(alpha);
		m.matrix[0][1]=-Math.sin(alpha);
		m.matrix[1][0]=Math.sin(alpha);
		m.matrix[1][1]=Math.cos(alpha);
		return m;
	};
	Matrix4.prototype.makeScale = function(sx, sy, sz)
	{
		var m = this.makeIdentity();
		m.matrix[0][0]=sx;
		m.matrix[1][1]=sy;
		m.matrix[2][2]=sz;
		return m;
	};
	Matrix4.makeScale = function(sx, sy, sz)
	{
		var m = Matrix4.makeIdentity();
		m.matrix[0][0]=sx;
		m.matrix[1][1]=sy;
		m.matrix[2][2]=sz;
		return m;
	};
	Matrix4.makeTranslation = function(tx, ty, tz)
	{
		var m = Matrix4.makeIdentity();
		m.matrix[0][3]=tx;
		m.matrix[1][3]=ty;
		m.matrix[2][3]=tz;
		return m;
	};

	Matrix4.prototype.makeTranslation = function(tx, ty, tz)
	{
		var m = this.makeIdentity();
		m.matrix[0][3]=tx;
		m.matrix[1][3]=ty;
		m.matrix[2][3]=tz;
		return m;
	};
	Matrix4.prototype.makeModel = function(matrices, count)
	{
		var x = 0;
		var identity = this.makeIdentity();
		var res = this.makeIdentity();
		var temp = this.makeIdentity();
		if(count===0) return null;
		if(count==1) 
		{
			matrices[0].multMatrix(identity, res);
			return res;
		}
		matrices[0].multMatrix(identity, temp);
		for(x=1; x<count; x++)
		{
			matrices[x].multMatrix(temp, res);
			res.multMatrix(res, identity, temp);
		}
		return res;
	};
	Matrix4.makeModel = function(matrices, count)
	{
		var x = 0;
		var identity = Matrix4.makeIdentity();
		var res = Matrix4.makeIdentity();
		var temp = Matrix4.makeIdentity();
		if(count===0) return null;
		if(count==1) 
		{
			matrices[0].multMatrix(identity, res);
			return res;
		}
		matrices[0].multMatrix(identity, temp);
		for(x=1; x<count; x++)
		{
			matrices[x].multMatrix(temp, res);
			res.multMatrix(res, identity, temp);
		}
		return res;
	};
	Matrix4.makeProjection = function(d)
	{
		var m = Matrix4.makeIdentity();
		m.matrix.matrix[0][0]=d;
		m.matrix.matrix[1][1]=d;
		m.matrix.matrix[2][2]=d;
		m.matrix.matrix[3][2]=1;
		m.matrix.matrix[3][3]=0;
		return m;
	};

	Matrix4.prototype.makeProjection = function(d)
	{
		var m = this.makeIdentity();
		m.matrix.matrix[0][0]=d;
		m.matrix.matrix[1][1]=d;
		m.matrix.matrix[2][2]=d;
		m.matrix.matrix[3][2]=1;
		m.matrix.matrix[3][3]=0;
		return m;
	};
	Matrix4.makeView = function(matrices, count)
	{
		return Matrix4.makeModel(matrices, count);
	};

	Matrix4.prototype.makeView = function(matrices, count)
	{
		return this.makeModel(matrices, count);
	};
	Matrix4.prototype.copy3d = function(result)
	{
		for(var x=0; x<this.matrix.length; x++)
		{
			for(var y=0; y<this.matrix[0].length; y++)
			{
				result.matrix[x][y]=this.matrix[x][y];
			}
		}
	};
	Matrix4.prototype.multMatrix= function(b, result)
	{
		if(this.matrix[0].length == b.matrix.length && result.matrix[0].length==b.matrix[0].length&&result.matrix.length==this.matrix.length)
		{
			for(var j = 0; j < result.matrix[0].length; j++)
			{
				for(var i = 0; i < result.matrix.length; i++)
				{
					var sum = 0;
					for(var f = 0; f<this.matrix[0].length; f++)
					{
						sum+=this.matrix[i][f]*b.matrix[f][j];
					}
					result.matrix[i][j]=sum;
				}
			}
		}
	};
	Matrix4.prototype.multVec = function(v)
	{
		var m = this.matrix;
		var r = new Vec4();
		r.x=m[0][0]*v.x+m[0][1]*v.y+m[0][2]*v.z+m[0][3]*v.w;
    r.y=m[1][0]*v.x+m[1][1]*v.y+m[1][2]*v.z+m[1][3]*v.w;
    r.z=m[2][0]*v.x+m[2][1]*v.y+m[2][2]*v.z+m[2][3]*v.w;
    r.w=m[3][0]*v.x+m[3][1]*v.y+m[3][2]*v.z+m[3][3]*v.w;
		return r;
	};



var PointLight = exports.PointLight = function PointLight(vec, intensity, color) {
	this.vec=vec;
	this.intensity=intensity;
	this.color=color;	
};


var DirectionalLight = exports.DirectionalLight = function DirectionalLight(vec, intensity, color) {
	this.vec = vec;
	this.intensity = intensity;
	this.color = color;
};


var SpotLight = exports.SpotLight = function SpotLight(vec, direction, angle, intensity, color) {
	this.vec=vec;
	this.direction=direction;
	this.angle=angle;
	this.intensity=intensity;
	this.color=color;
};


var Raytracer = exports.Raytracer = function Raytracer() {

};
// void Lambert(Interseccion inter, Vec4 L,Vec4 D, double* int_dif, double* int_spec, double intensity)
Raytracer.prototype.lambert = function(inter, L, D, int_dif, int_spec, intensity)
{
	var v = new Vec4();
	v.x=-D.x;
	v.y=-D.y;
	v.z=-D.z;
	v.w=0.0;
	var norm = L.norm();
	L = L.multiply(1/norm);
	L.w=0;
	norm = inter.P.norm();
	inter.P = inter.P.multiply(1/norm);
	inter.P.w=0;
	var temp = 0.0;
	temp = inter.N.dot(L) / (inter.N.norm() * L.norm());
	if(temp < 0.0) temp = 0.0;
	int_dif+= temp * intensity;
	var nl = 0.0;
	nl = inter.N.dot(L);
	var n2 = inter.N.multiply(2);
	var R = n2.rest(n2.multiply(nl),L);
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
		var sp = spheres[i];
		var center = sp.center;
		var radius = sp.radius;
		var rest = O.subtract(center);
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
				var dt = D.multiply(t);
				var P = dt.sum(O);
				var N = P.subtract(center);
				var norm = N.norm();
				N = N.multiply(1/norm);
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

Raytracer.prototype.execute=function(x_p, y_p)
{
  var x,y,z=0;
	var cam = this.cam;
	var view = this.view;
	var up = this.up;
	var d = this.d;
	var vw = this.vw;
	var vh = this.vh;
	var cw = this.cw;
	var ch = this.ch;
	var ambient = this.ambient;
	var pointLights = this.pointLights;
	var directionalLights = this.directionalLights;
	var spheres = this.spheres;
	var antialiasing = this.antialiasing;
	var view_up_right = Matrix4.makeIdentity();

	if(up.dot(view)===0)
	{
  	var norm=up.norm();
		up.x=up.x/norm;
    up.y=up.y/norm;
    up.z=up.z/norm;
    norm=view.norm();
    view.x=view.x/norm;
    view.y=view.y/norm;
    view.z=view.z/norm;
    var right = up.cross(view);
    norm = right.norm();
		right.x=right.x/norm;
    right.y=right.y/norm;
    right.z=right.z/norm;
    right.w=0;
		view_up_right.matrix[0][2]=view.x;
		view_up_right.matrix[1][2]=view.y;
		view_up_right.matrix[2][2]=view.z;
		view_up_right.matrix[3][2]=view.w;
		view_up_right.matrix[0][1]=up.x;
		view_up_right.matrix[1][1]=up.y;
		view_up_right.matrix[2][1]=up.z;
		view_up_right.matrix[3][1]=up.w;
		view_up_right.matrix[0][0]=right.x;
		view_up_right.matrix[1][0]=right.y;
		view_up_right.matrix[2][0]=right.z;
		view_up_right.matrix[3][0]=right.w;
  }
  x=x_p*vw/cw;
  y=y_p*vh/ch;
  z=d;
  var O = cam.copy();
  var c;
  if(antialiasing)
  {
  	var x1=(x_p+0.5)*vw/cw;
    var y1=(y_p+0.5)*vw/cw;
		var D0 = new Vec4(x,y,z);
		var D0_transformado=view_up_right.multVec(D0);
		var D1 = new Vec4(x1, y, z);
		var D1_transformado=view_up_right.multVec(D1);
		var D2 = new Vec4(x, y1, z);
		var D2_transformado = view_up_right.multVec(D2);
		var D3 = new Vec4(x1, y1, z);
		var D3_transformado = view_up_right.multVec(D3);
		var c0 = this.trazar_rayo(0, D0_transformado, 1, Number.MAX_SAFE_INTEGER, 3, ambient, pointLights, directionalLights, spheres, 1.0, null);
		var c1 = this.trazar_rayo(0, D1_transformado, 1, Number.MAX_SAFE_INTEGER, 3, ambient, pointLights, directionalLights, spheres, 1.0, null);
		var c2 = this.trazar_rayo(0, D2_transformado, 1, Number.MAX_SAFE_INTEGER, 3, ambient, pointLights, directionalLights, spheres, 1.0, null);
		var c3 = this.trazar_rayo(0, D3_transformado, 1, Number.MAX_SAFE_INTEGER, 3, ambient, pointLights, directionalLights, spheres, 1.0, null);
		c0 = c0.multiply(0.25);
		c1 = c1.multiply(0.25);
		c2 = c2.multiply(0.25);
		c3 = c3.multiply(0.25);
		c = c0.add(c1).add(c2).add(c3);
		return c;
	} else {
			var D = new Vec4(x,y,z);
			var D_transformado = view_up_right.multVec(D);
			c = this.trazar_rayo(O, D_transformado, 1, Number.MAX_SAFE_INTEGER, 3, ambient, pointLights, directionalLights, spheres, 1.0, null);
			return c;
  }
 

};
 
//Color trazar_rayo(Vec4 O, Vec4 D, double t_min, double t_max, int rec_max, double ambient, List* point_lights, List* directional_lights, List* spheres, double ambient_refraction, Sphere* last_sphere, Triangle* triangles, int num_triangles, Color* texture, int skinwidth, int skinheight)
Raytracer.prototype.trazar_rayo=function(O, D, t_min, t_max, rec_max, ambient, point_lights, directional_lights, spheres, ambient_refraction, last_sphere)
{
	var inter = this.intersectar(O, D, t_min, t_max, spheres);
	var c = new Color();
	var reflexion =1;
	var transparency=1;
	if(inter.exists)
	{
		c=inter.M.color_dif.multiply(ambient);
		var int_dif = 0;
		var int_spec = 0;
		var L;
		var i;
		var int_sombra=0;
		for(i = 0; i< point_lights.length; i++)
		{
			var pl = point_lights[i];
			L = new Vec4(pl.vec.x-inter.P.x, pl.vec.y-inter.P.y, pl.vec.z-inter.P.z);
			int_sombra = this.intersectar(inter.P, L, 0.0001, 1, spheres);
			if(!int_sombra.exists)
			{
				this.Lambert(inter, L, D, int_dif, int_spec, pl.intensity);
			}
		}	
		
		for(i =0; i<directional_lights.length; i++)
		{
			var dl = directional_lights[i];
			L= new Vec4(-dl.vec.x, -dl.vec.y, -dl.vec.z);
			int_sombra= this.intersectar(inter.P, L, 0.0001, Infinity, spheres);
			if(!int_sombra.exists)
			{
				this.Lambert(inter, L, D, int_dif, int_spec, dl.intensity);
			}
		}
		if((reflexion)&&(rec_max>0)&&(inter.M.coef_ref>0))
		{
			c = (inter.M.color_dif.multiply(int_dif)).sum(inter.M.color_spec.multiply(int_spec), c);
			var nullVector = new Vec4();
			var rest = nullVector.subtract(D);
			var R = (inter.N.multiply(2*inter.N.dot(rest))).sum(D);
		}
	}
	return c;
};	


// See __prologue__.js
	return exports;
});

//# sourceMappingURL=jsraytracer.js.map