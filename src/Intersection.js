// INTERSECCION
define("Interseccion", function()
{
	function Interseccion(exists, sphere, t, P, N, M) {
		this.exists = exists || 0;
		this.sphere = sphere || null;
		this.t = t || null;
		this.P = P || null;
		this.N = N || null;
		this.M = M || null;
	}	
	return Interseccion;
});
