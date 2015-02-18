define("ConfigParser",["Vec4", "Color", "PointLight", "DirectionalLight", "Color"], function()
{
	fs = require('fs')
	var file="";
	fs.readFile('config.txt', 'utf8', function (err,data) {
	  if (err) {
	    return console.log(err);
	  }
	file=data;
	  console.log(data);
	});
	var lines = file.split("\n");
	var cam = new Vec4();
	var d = 0.0;
	var ambient = 0.0;
	var viewportWidth=0;
	var viewportHeight=0;
	var view = new Vec4();
	var up = new Vec4();
	var pointLights = [];
	var directionalLights = [];
	var spheres = [];
	for(var i =0; i< lines.length; i++)
	{
		if(lines[i].charAt(0)=="#")
		{
			continue;
		} else {
			line = lines[i].split(";");
			if(line[0]=="pos")
			{
				cam.x = parseFloat(line[1]);
				cam.y = parseFloat(line[2]);
				cam.z = parseFloat(line[3]);
				cam.w = 0.0;
			} else if(line[0]=="dist")
			{
				d = parseFloat(line[1]);
			} else if(line[0]=="ambient")
			{
				ambient = parseFloat(line[1]);
			} else if(line[0]=="viewport")
			{
				viewportWidth=parseFloat(line[1]);
				viewportHeight=parseFloat(line[2]);
			} else if(line[0]=="view")
			{
				view.x=parseFloat(line[1]);
				view.y=parseFloat(line[2]);
				view.z=parseFloat(line[3]);
				view.w=0.0;
			} else if(line[0]=="up")
			{
				up.x=parseFloat(line[1]);
				up.y = parseFloat(line[2]);
				up.z = parseFloat(line[3]);
				up.w = 0.0;
			} else if(line[0]="lightP")
			{
				var lightP = new PointLight();
				lightP.vec.x=parseFloat(line[1]);
				lightP.vec.y = parseFloat(line[2]);
				lightP.vec.z = parseFloat(line[3]);
				lightP.w = 0.0;
				lightP.intensity = parseFloat(line[4]);
				pointLights.push(lightP);
			} else if(line[0]="lightD")
			{
				var lightD = new DirectionalLight();
				lightD.vec.x=parseFloat(line[1]);
				lightD.vec.y = parseFloat(line[2]);
				lightD.vec.z = parseFloat(line[3]);
				lightD.vec.w = 0.0;
				lightD.intensity = parseFloat(line[4]);
				directionaLights.push(lightD);
			} else if(line[0]=="sphere")
			{
				var center = new Vec4();
				center.x = parseFloat(line[1]);
				center.y = parseFloat(line[2]);
				center.z = parseFloat(line[3]);
				center.w = 0.0;
				var radius = parseFloat(line[4]);
				var colorDif = new Color(parseFloat(line[5]), parseFloat(line[6]), parseFloat(line[7]));
				var colorSpec = new Color(parseFloat(line[8]), parseFloat(line[9]), parseFloat(line[10]));
				var coefSpec = parseFloat(line[11]);
				var coefRefl = parseFloat(line[12]);
				var coefRefr = parseFloat(line[13]);
				var coefTr = parseFloat(line[14]);
				var sphere = new Sphere(center, radius, colorDif, colorSpec, coefSpec, coefRefl, coefRefr, coefTr);
				spheres.push(sphere);
				
			}

		}
	}
	function Config(cam, d, ambient, viewportWidth, viewportHeight, view, up, pointLights, directionalLights, spheres)
	{
		this.cam=cam;
		this.d=d;
		this.ambient=ambient;
		this.viewportWidth=viewportWidth;
		this.viewportHeight=viewportHeight;
		this.view=view;
		this.up=up;
		this.pointLights=pointLights;
		this.directionalLights=directionalLights;
		this.spheres=spheres;
	};
	return new Config(cam, d, ambient, viewportHeight, viewportHeight, view, up, pointLights, directionalLights, spheres);
});
