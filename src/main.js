"use strict",
// Imports
require("source-map-support").install();
var capataz = require('capataz'),
    base = capataz.dependencies.base,
	config = require("src/scene.json");
	
// Server setup.
var server = capataz.Capataz.run({
	port: 80
	customFiles: './' //FIXME Mover a un directorio específico
});

var jobFunction = function jobfunction(jsraytracer, x, y) {
	var raytracer = new jsraytracer.Raytracer(),
		pixel = raytracer.execute(x,y);
	return { x: x, y: y, colour: pixel.toRGB() }; //TODO Método Color.toRGB()
}

var jobs = base.Iterable.range(config.canvasWidth)
	.zip(base.Iterable.range(config.canvasHeight))
	.mapApply(function (x,y) {
		return {
			info: "("+ x +","+ y +")",
			fun: jobfunction,
			imports: ["jsraytracer"]
			args: [x, y]
		};
	});

server.logger.info("Starting server.");
server.scheduleAll(jobs, 2000, function (scheduled) {
	return scheduled.then(function (result) {
		//server.logger.info(result);
		//TODO Guardar pixel en el canvas.
		return true;
	}
});
}).then(function () {
	//TODO Guardar canvas a archivo.
	server.logger.info("Finished. Stopping server.");
	process.exit();
});



