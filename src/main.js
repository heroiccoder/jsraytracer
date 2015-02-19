"use strict",
require("source-map-support").install();
var capataz = require('capataz'),
    base = capataz.dependencies.base,
    server = capataz.Capataz.run({
        port: 80
			  customFiles: './'
    });
var jobs = [];
var config = require("src/config.json");
var jobfunction(x, y)
{
	var raytracer = new Raytracer();
	return raytracer.execute(x,y);
}
for(var x = 0; x<config.canvasWidth; x++)
{
	for(var y = 0; y<config.canvasHeight; y++)
	{
		jobs.push( {
			info: "(x,y): ("+x+","+y+")",
			fun: jobfunction,
			imports: ["jsraytracer"]
			args: [x, y]
		});
	}
}

server.logger.info("Starting... ", "now" ));
server.scheduleAll(jobs, 1000, function (scheduled) {
	return scheduled.then(function (result) {
		server.logger.info(result);
		return true;
		}
});
}).then(function () {
	    server.logger.info("Finished. Stopping server.");
			    process.exit();
});



