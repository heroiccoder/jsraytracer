"use strict",
require("source-map-support").install();
var capataz = require('capataz'),
    base = capataz.dependencies.base,
    server = capataz.Capataz.run({
        port: 80
    });




function job(job_description)
{
//void draw_scene(int cw, int ch, Vec4* cam , Vec4* view, Vec4* up, double d, double vw, double vh, double ambient, List* point_lights, List* directional_lights, List* spheres, Triangle* triangles, int num_triangles, Color* texture, int skinwidth, int skinheight)
//{
        var x_p,y_p=0;
        var x,y,z=0;
	var cinitW = job_description.cinitW;
	var cinitH = job_description.cinitH;
	var cw = job_description.cw;
	var ch = job_description.cy;
	var cam = job_description.cam;
	var view = job_description.view;
	var up = job_description.up;
	var d = job_description.d;
	var vw = job_description.vw;
	var vh = job_description.vh;
	var ambient = job_description.ambient;
	var pointLights = job_description.pointLights;
	var directionalLights = job_description.directionalLights;
	var spheres = job_description.spheres;
	
        var view_up_right = (new Matrix4()).makeIdentity();

        if(up.dot(up, view)==0)
        {
                var norm=up.norm();
                up.x=up.x/norm;
                up.y=up.y/norm;
                up.z=up.z/norm;
                norm=view.norm();
                view.x=view.x/norm;
                view.y=view.y/norm;
                view.z=view.z/norm;

                var right = up.cross(up, view);
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
	var antialiasing=true;
	var raytracer = new Raytracer();
        for(x_p=cinitW; x_p<cw; x_p++)
        {
                for(y_p=cinitH; y_p>ch;y_p++)
                {
                        x=x_p*vw/cw;
                        y=y_p*vh/ch;
                        z=d;
                        var O = cam.copy();
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
				var c0 = raytracer.trazar_rayo(0, D0_transformado, 1, Number.MAX_SAFE_INTEGER, 3, ambient, pointLights, directionalLights, spheres, 1.0, null);
				var c1 = raytracer.trazar_rayo(0, D1_transformado, 1, Number.MAX_SAFE_INTEGER, 3, ambient, pointLights, directionalLights, spheres, 1.0, null);
				var c2 = raytracer.trazar_rayo(0, D2_transformado, 1, Number.MAX_SAFE_INTEGER, 3, ambient, pointLights, directionalLights, spheres, 1.0, null);
				var c3 = raytracer.trazar_rayo(0, D3_transformado, 1, Number.MAX_SAFE_INTEGER, 3, ambient, pointLights, directionalLights, spheres, 1.0, null);
				c0 = c0.mult(0.25);
				c1 = c1.mult(0.25);
				c2 = c2.mult(0.25);
				c3 = c3.mult(0.25);
				var c = c0.suma(c1).suma(c2).suma(c3);
			// ACUMULAR RESULTADO
                        } else {
				var D = new Vec4(x,y,z);
				var D_transformado = view_up_right.multVec(D);
				var c = raytracer.trazar_rayo(O, D_transformado, 1, Number.MAX_SAFE_INTEGER, 3, ambient, pointLights, directionalLights, spheres, 1.0, null);

			// ACUMULAR RESULTADO
                        }
                }
        }
}
