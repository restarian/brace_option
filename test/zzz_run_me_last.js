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

module.paths.unshift(path.join(__dirname, ".."))
var it_will = global

describe("Using stop further progression methodology for file dependencies: "+path.basename(__filename), function() { 

	this.timeout(30000)

	var it = maybe(it_will)	
	it_will.stop = !!process.env.DRY_RUN  
	it_will.quiet = !!process.env.QUIET

	describe("Checking for dependencies..", function() { 

		it("requirejs in available to the module system", function(done) {

			it_will.stop = true 
			var rjs_path
			expect((function() {try { rjs_path = require.resolve("requirejs"); return true } catch(e) { return e }})(), "could not load the requirejs dependency").to.be.true
			it_will.stop = false 
			done()
		})

		it("the build_umd program is available and at the right location", function(done) {

			var build_path = path.join(__dirname, "..", "node_modules", "brace_umd", "bin", "build_umd.js")
			it_will.stop = true 
			expect((function() { try { return require("brace_umd") }catch(e){ return e } })(), "brace_umd was not found on system").to.be.a("object")
			expect(fs.existsSync(build_path), "could not find the build_umd.js program").to.be.true
			expect(build_path, "the expected path of the build_umd program is not the one located by the unit test")
						.to.equal(require("brace_umd").build_program_path)
			it_will.stop = false 
			done()
		})

	})

	describe("Running deployment build configuration", function() { 

		it("will build the project using the package script build command", function(done) {
			// A new umd.js source build is created with the various config files in the test directory.
			utils.Exec("npm", ["run", "build"], undefined, function(exit_code, stdout, stderr) {
				expect(exit_code, stderr+stdout).to.equal(0)
				done()
			}, function(msg) { expect(false, msg).to.equal(true); done() })
		})
	})
})

