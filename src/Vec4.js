define("Vec4", function()
{
	function Vec4(x, y, z){
		this.x = +x || 0;
		this.y = +y || 0;
		this.z = +z || 0;
		this.w = 0.0;	
	}
	Vec4.prototype.copy = function()
	{
		var vec4 = new Vec4(this.x, this.y, this.z);
		vec4.w = this.w;
		return vec4;
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
	return Vec4;
});
