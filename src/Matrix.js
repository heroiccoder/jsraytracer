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

