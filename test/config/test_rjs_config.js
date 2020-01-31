{
	// This will add the directory of this build file as a path to the NODE_PATH list so that any module dependencies can be loaded via nodeRequire.
	// It is therefore a good idea to put this build config in the same directory as the package.json file.
	"_init": !!module.paths.unshift(nodeRequire("path").join("..", "..", "node_modules")),
	"baseUrl": "../../lib",
	"name": "brace_option",
	"out": "../../build/brace_option.js",
	"onBuildRead": function (module_name, module_path, content) { 
		// This is how a module is built which has dependency modules which use brace_umd. The non-brace_umd module version is used instead when a module is 
		// loaded which was a brace_umd built module (it will contain a _umd.js suffix). It is assumed that any module which contains a _umd.js suffix is 
		// a brace_umd wrapped module.
		return /.+_umd\.js$/.test(module_path) && nodeRequire("fs").existsSync(module_path.replace(/_umd\.js$/, ".js")) && 
				nodeRequire("fs").readFileSync(module_path.replace(/_umd\.js$/, ".js")).toString() || content
	},
	"onBuildWrite": function (moduleName, path, contents) {
		// This removes the id from the amdefine definition so that the library can be loaded as anonymous. Brace_umd does this at run-time so it is only
		// required in the non-umd version of the module builds.
		return contents.replace(RegExp("[\",\']"+ config.name + "[\",\']\,"), "")
	},
	"keepAmdefine": true,
	"optimize": "uglify2",
	"uglify2": nodeRequire("brace_umd").build_option_extend({mangle: {properties: true}}),
	// There is no reason not to include the amdefine loading mechanism in the library build sense it will be optimized again in distribution 
	// of whatever module uses it.
	"keepAmdefine": true,
	"writeBuildTxt": false
}
