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