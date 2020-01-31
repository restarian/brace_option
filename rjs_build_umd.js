{
	"baseUrl": "lib",
	"name": "brace_option",
	"out": "build/brace_option_umd.js",
	"paths": {
		// The distributable has the brace_prototype module included so it is mapped to its nearest location. The .js is removed because it is omitted 
		// in the library definition as well.
		//"brace_prototype": nodeRequire.resolve("brace_prototype").slice(0, -3)
	},
	"onBuildRead": function (module_name, module_path, content) { 
		// This is how a module is built which has dependency modules which use brace_umd. The non-brace_umd module version is used instead when a module is 
		// loaded which was a brace_umd built module (it will contain a _umd.js suffix). It is assumed that any module which contains a _umd.js suffix is 
		// a brace_umd wrapped module.
		return /.+_umd\.js$/.test(module_path) && nodeRequire("fs").existsSync(module_path.replace(/_umd\.js$/, ".js")) && 
				nodeRequire("fs").readFileSync(module_path.replace(/_umd\.js$/, ".js")).toString() || content
	},
	"optimize": "uglify2",
	"uglify2": nodeRequire("brace_umd").build_option_extend({}),
	"wrap": {
		"start": nodeRequire("brace_umd").wrap_start,
		// Add an anonymous definition.
		"end": nodeRequire("brace_umd").wrap_end_option({"auto_anonymous": true})
	},
	// The amdefine loading mechanism must be removed in the umd build.
	"keepAmdefine": false,
	"keepBuildDir": true,
	"writeBuildTxt": false
}
