/* Brace Option resides under the MIT license  Copyright (c) 2020 Robert Steckroth <RobertSteckroth@gmail.com>

Brace Option adds member data to object prototypes to control properties within the chain.

 this file is part of the Brace Option 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */

var expect = require("chai").expect,
	path = require("path"),
	fs = require("fs"),
	utils = require("bracket_utils"),
	maybe = require("brace_maybe")

module.paths.unshift(path.join(__dirname, "..", "node_modules"))

var build_path = path.join(__dirname, "..", "node_modules", "brace_umd", "bin", "build_umd.js"),
	config_dir = path.join(__dirname, "config"),
	package_root = path.join(__dirname, ".."), 
	config_dir = path.join(package_root, "test", "config"),
	// A special testing file is used so that amdefine and commonjs require calls can be used in this same file.
	rjs_build_config_path = path.join(package_root, "test", "config", "test_rjs_config.js"),
	rjs_build_umd_config_path = path.join(package_root, "rjs_build_umd.js"),
	rjs_path

var it_will = global
var cache = utils.cacheManager(require)

describe("Using stop further progression methodology for file dependencies: "+path.basename(__filename), function() { 

	var it = maybe(it_will)	
	it_will.stop = !!process.env.DRY_RUN  
	it_will.quiet = !!process.env.QUIET

	var build_meta = function(index) {
	
		var o = {}
		if ( index === 0 ) {
			o.msg = "while loading the module from requirejs"
			o.build_file = "brace_option_umd.js"
		} else if ( index === 1 ) {
			o.msg = "while loading the module from commonjs require"
			o.build_file = "brace_option_umd.js"
		} else if ( index === 2 ) {
			o.msg = "while loading the module from requirejs with the non-umd module"
			o.build_file = "brace_option.js"
		} else if ( index === 3 ) {
			o.msg = "while loading the module from commonjs require with the non-umd module"
			o.build_file = "brace_option.js"
		} else if ( index === 4 ) {
			o.msg = "while loading the module from amdefine"
			o.build_file = "brace_option_umd.js"
		} else if ( index === 5 ) {
			o.msg = "while loading the module from amdefine with the non-umd module"
			o.build_file = "brace_option.js"
		}
		return o
	}

	var require_method
	var create_definition = function(index) {

		if ( index === 0 ) {
			require_method = require("requirejs")
			require_method.config({nodeRequire: require})
		}
		else if ( index === 1 )
			require_method = function(dep, cb) {
				cb(require(dep[0]))
			}
		else if ( index === 2 ) {
			require_method = require("requirejs")
			require_method.config({nodeRequire: require})
		}
		else if ( index === 3 )
			require_method = function(dep, cb) {
				cb(require(dep[0]))
			}
		else if ( index === 4 )
			require_method = require("amdefine")(module)
		else if ( index === 5 )
			require_method = require("amdefine")(module)
	}

	beforeEach(cache.start.bind(cache))
	afterEach(cache.dump.bind(cache))

	describe("Checking for dependencies..", function() { 
		
		it("requirejs in available to the module system", function(done) {

			it_will.stop = true 
			expect((function() {try { rjs_path = require.resolve("requirejs"); return true } catch(e) { return e }})(), "could not load the requirejs dependency").to.be.true
			it_will.stop = false 
			done()
		})

		it("has all dependencies available", function(done) {

			it_will.stop = true 
			expect((function() { try { return require("amdefine")(module) }catch(e){ return e } })(), "amdefine was not found on system").to.be.a("function")
				.that.have.property("require")
			it_will.stop = false 
			done()
		})

		it("the build_umd program is available and at the right location", function(done) {

			it_will.stop = true 
			expect((function() { try { require("brace_umd"); return true }catch(e){ return e} })(), "brace_umd was not found on system").to.be.true
			expect(fs.existsSync(build_path), "could not find the build_umd.js program").to.be.true
			expect(build_path, "the expected path of the build_umd program is not the one located by the unit test")
						.to.equal(require("brace_umd").build_program_path)
			it_will.stop = false 
			done()
		})
	})

	// An array with the values of the test directory is filtered to include all of the files included with the regex.
	var config_file = fs.readdirSync(config_dir).filter(function(value) { return /^build_config_.*\.json/.test(value) })
	// This needs to be tested last so that the build files are the expected ones by default.
	config_file.forEach(function(value) {

		value = path.join(package_root, "test", "config", value)

		describe("Subsequent tests will be built using the config file "+ value, function() {

			it("will build the Brace Option source using the local Brace Umd build_umd cli program", function(done) {

				utils.Spawn("node", [build_path, "--config-file", value], undefined, function(exit_code, stdout, stderr) {
					expect(exit_code, stdout+stderr).to.equal(0)
					done()
				}, function(error) { expect(false, error).to.equal(true); done() })
			})

			it("will build the Brace Option source using the amd build config file:" + rjs_build_config_path, function(done) {

				utils.Spawn("node", [rjs_path, "-o", rjs_build_config_path], undefined, function(exit_code, stdout, stderr) {
					expect(exit_code, stdout+stderr).to.equal(0)
					done()
				}, function(error) { expect(false, error).to.equal(true); done() })
			})

			it("will build the Brace Option source using the umd build config file:" + rjs_build_umd_config_path, function(done) {

				utils.Spawn("node", [rjs_path, "-o", rjs_build_umd_config_path], undefined, function(exit_code, stdout, stderr) {
					expect(exit_code, stdout+stderr).to.equal(0)
					done()

				}, function(error) { expect(false, error).to.equal(true); done() })
			})
		})

		Array.from({length:5},(v,i)=>i).forEach(function(val) {

			var meta = build_meta(val)
			var build_file = meta.build_file
			var msg = meta.msg
			describe("Running subsequent unit tests with the build file " + build_file + " " + msg, function() {

				// The beforeEach methods stack in mocha so this is ok.
				beforeEach(function() {
					create_definition(val)
				})
				it("returns the same data as passed in to the constructor if the the parameter was not a literal Object", function(done) {

					require_method([path.join(package_root, "build", build_file)], function(brace_proto) {

						expect(brace_proto(false)).to.be.equal(false)
						expect(brace_proto(true)).to.be.equal(true)
						expect(brace_proto(44)).to.be.equal(44)
						expect(brace_proto(0)).to.be.a("number")
						done() 

					}, done)
				})
				it("returns an Object with the extended members", function(done) {

					require_method([path.join(package_root, "build", build_file)], function(brace_proto) {

						var F = function() {
							this.cool = "joes"
						}

						F.prototype = brace_proto({
							cool: "joes"
						})
						var f = new F()

						expect(f.__proto__.clear).to.be.a("function")
						expect(f.__proto__.add_qualifier).to.be.a("function")
						expect(f.__proto__.remove_qualifier).to.be.a("function")
						expect(f.__proto__.list).to.be.a("function")
						expect(f.__proto__.list()).to.be.a("object")

						expect(f.clear).to.be.a("function")
						expect(f.add_qualifier).to.be.a("function")
						expect(f.remove_qualifier).to.be.a("function")
						expect(f.list).to.be.a("function")
						expect(f.list()).to.be.a("object")
						done() 
					}, done)
				})
				it("reverts properties which were originally added to the option", function(done) {

					require_method([path.join(package_root, "build", build_file)], function(brace_proto) {

						var F = function() {
							this.cool = "joes"
						}

						F.prototype = brace_proto({
							cool: "joes"
						})
						var f = new F()

						f.cool = "man"
						f.clear()
						expect(f.cool).to.equal("joes")
						f.__proto__.cool = "thing"
						f.cool = "here"
						f.clear()
						expect(f.cool).to.equal("thing")

						f.clear()
						expect(f.cool).to.equal("thing")

						done()	
					}, done)
				})
				it("the clear member works with parameters as well", function(done) {

					require_method([path.join(package_root, "build", build_file)], function(brace_proto) {

						var F = function() {
							this.a = 1
							this.b = 2
							this.c = 3
							this.d = 4
							this.e = 5
						}

						F.prototype = brace_proto({
							a: 11,
							b: 22,
							c: 33,
							d: 44,
							e: 55
						})
						var f = new F()

						expect(f).to.include({a:1, b:2, c:3, d:4, e: 5})
						f.clear("a", "b")

						expect(f).to.include({a:11, b:22, c:3, d:4, e: 5})

						f.clear("e")
						expect(f).to.include({a:11, b:22, c:3, d:4, e: 55})

						f.clear()
						expect(f).to.include({a:11, b:22, c:33, d:44, e: 55})

						done()
					}, done)
				})
				it("the add_qualifier member works as intended", function(done) {

					require_method([path.join(package_root, "build", build_file)], function(brace_proto) {

						var F = function() {
							this.a = 1
							this.c = 2
							this.d = 4
						}

						F.prototype = brace_proto({
							a: 11,
							b: 22,
							c: 33
						})
						var f = new F()
						
						expect(f.list()).to.have.all.keys(["a", "b", "c"])

						f.add_qualifier("d")
						f.add_qualifier("d")
						expect(f.list()).to.have.all.keys(["a", "b", "c", "d"])

						done()

					}, done)
				})
				it("the remove_qualifier member works as intended", function(done) {

					require_method([path.join(package_root, "build", build_file)], function(brace_proto) {

						var F = function() {
							this.a = 1
							this.c = 2
							this.d = 4
						}

						F.prototype = brace_proto({
							aa: 11,
							bb: 22,
							cc: 33
						})
						var f = new F()

						expect(f.list()).to.have.all.keys(["aa", "bb", "cc"])
						f.remove_qualifier("cc")

						expect(f.list()).to.have.all.keys(["aa", "bb"])
						f.remove_qualifier("aa")
						expect(f.list()).to.have.all.keys(["bb"])
						done()	

					}, done)
				})
				it("both the remove_qualifier and add_qualifier members works in tandom", function(done) {
					
					require_method([path.join(package_root, "build", build_file)], function(brace_proto) {

						var F = function() { }
						F.prototype = brace_proto({
							aa: 11,
							bb: 22,
							cc: 33
						})
						var f = new F()

						expect(f.list()).to.have.all.keys(["aa", "bb", "cc"])

						f.remove_qualifier("aa")
						f.remove_qualifier("aa")
						f.remove_qualifier("aa")
						expect(f.list()).to.have.all.keys(["bb", "cc"])

						f.add_qualifier("aa")
						f.add_qualifier("aa")
						f.add_qualifier("aa")
						expect(f.list()).to.have.all.keys(["aa", "bb", "cc"])

						f.add_qualifier("a")
						f.remove_qualifier("aa")
						expect(f.list()).to.have.all.keys(["a", "bb", "cc"])

						f.remove_qualifier("aa")
						f.add_qualifier("a")
						expect(f.list()).to.have.all.keys(["a", "bb", "cc"])

						done()

					}, done)
				})
				it("the proto_extend member works with gettters and setters using option members as well", function(done) {
					
					require_method([path.join(package_root, "build", build_file)], function(brace_proto) {
						
						var p = brace_proto({
							aa: 11,
							bb: 22,
							cc: 33,
						})

						var F = function() { }

						F.prototype = p 

						var f = new F()
						p.proto_extend({
							make: function() {
								this.test = 2
							},
							get test() {
								return this._test	|| 1
							},
							set test(value) {
								this._test = value+1
							}
						})

						
						// The original value is returned from the option Object and instance Object.
						f.test = 1
						expect(f.test).to.equal(2)
						f.make()
						expect(f.test).to.equal(3)

						var f = new F()
						expect(f.test).to.equal(1)
						done()

					})
				})
				it("the proto_extend member works with gettters and setters as expected", function(done) {
					
					require_method([path.join(package_root, "build", build_file)], function(brace_proto) {

						var F = function() { }

						F.prototype = brace_proto({
							aa: 11,
							bb: 22,
							cc: 33,
						})

						var f = new F()

						f.proto_extend({
							get test() {
								return this._test	|| 1
							},
							set test(value) {
								this._test = value+1
							}
						})

						// The original value is returned from the option Object and instance Object.
						expect(f.test).to.equal(1)
						f.test = 21 
						expect(f.test).to.equal(22)
						// The option Object retains the default value because the option of the option is the Brace option Object constructor.
						expect(F.prototype.test).to.equal(1)
						F.prototype.test = 66 
						expect(f.test).to.equal(22)
						done()
					})
				})
				it("the extend member works with gettters and setters as expected", function(done) {
					
					require_method([path.join(package_root, "build", build_file)], function(brace_proto) {

						var F = function() { }

						F.prototype = brace_proto({
							aa: 11,
							bb: 22,
							cc: 33,
						})

						var f = new F()

						f.extend({
							get test() {
								return this._test	|| 1
							},
							set test(value) {
								this._test = value+1
							}
						})

						expect(f.test).to.equal(1)
						f.test = 21 
						expect(f.test).to.equal(22)
						// The option Object does not get extended here so it should be undefined. Using proto_extend will update both Objects.
						expect(F.prototype.test).to.equal(undefined)
						F.prototype.test = 66 
						expect(f.test).to.equal(22)
						done()
					})
				})
			})
		})
	})
})
