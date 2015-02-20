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
