{
	"baseUrl": "lib",
	"name": "brace_option",
	"out": "build/brace_option.js",
	"onBuildRead": function (module_name, module_path, content) { 
		// This is how a module is built which has dependency modules which use brace_umd. The non-brace_umd module version is used instead when a module is 
		// loaded which was a brace_umd built module (it will contain a _umd.js suffix). It is assumed that any module which contains a _umd.js suffix is 
		// a brace_umd wrapped module.
		return /.+_umd\.js$/.test(module_path) && nodeRequire("fs").existsSync(module_path.replace(/_umd\.js$/, ".js")) && 
				nodeRequire("fs").readFileSync(module_path.replace(/_umd\.js$/, ".js")).toString() || content
	},
	"optimize": "uglify2",
	"uglify2": nodeRequire("brace_umd").build_option_extend({}),
	"keepAmdefine": true,
	"keepBuildDir": true,
	"writeBuildTxt": false,
}

