# Brace Prototype 
### Synopsis

[![Build status](https://ci.appveyor.com/api/projects/status/ky3olofema5dwo37/branch/master?svg=true)](https://ci.appveyor.com/project/restarian/brace-prototype/branch/master) [![Build Status](https://travis-ci.org/restarian/brace_prototype.svg?branch=master)](https://travis-ci.org/restarian/brace_prototype) [![Downloads](https://img.shields.io/npm/dm/brace_prototype.svg?svg=true)](https://npmjs.org/package/brace_prototype)


| A part of the [Brace suite](https://github.com/restarian/restarian/blob/master/brace/README.md)| Developed with Windows 10 and Ubuntu 16 
| ---- | ----
| ![Brace](https://raw.githubusercontent.com/restarian/restarian/master/brace/doc/image/brace_logo_small.png) | [![Ubuntu on Windows](https://raw.githubusercontent.com/restarian/restarian/master/doc/image/ubuntu_windows_logo.png)](https://github.com/Microsoft/BashOnWindows) | 


---
### Brace prototype document pages
* **README**
* [License](https://github.com/restarian/brace_prototype/blob/master/docs/license.md)
* Specification
  * [Package information](https://github.com/restarian/brace_prototype/blob/master/docs/specification/package_information.md)
  * [Unit test output](https://github.com/restarian/brace_prototype/blob/master/docs/specification/unit_test_output.md)

---

**Author: Robert Steckroth, *Bust0ut* [<RobertSteckroth@gmail.com>](mailto:robertsteckroth@gmail.com)**

**Licensed under: MIT*

**Bonuses:**

* Unit tested on Windows 10 and Ubuntu 16.04 with multiple [RequireJs](https://npmjs.org/package/requirejs) build configurations
* Incorporates [Brace UMD](https://npmjs.org/package/brace_umd) into unit tests for assured distributable generation 
* Includes unit tested requirejs build files for both amdefine and unified module builds

This library provides a member which returns an Object to be used in a prototype. The returned Object contains a few additional methods which operate on the prototype. Below are the members which are created with the library return Object.

**clear** - *[string, ...]*
	
* The clear member should be called with no parameters or with zero to many string parameters. All of the properties added with the original constructor (the usable members), will have the values reset to the current prototype value. An empty call clears all of the usable values while only those properties matching the strings passed in will be reset if parameters are passed in. This member is idempotent.

**proto_extend** - *[object]*
	
* This will extend the current prototype it is attached to with a complete description of the passed in Object. These properties are not added as usable members.

**extend** - *[object]*
	
* This will extend the Brace_prototype Object with a complete description of the passed in Object. These properties are not added as usable members.

**add_qualifier** - *[string]*

* Adds a property to the current list of usable members.

**add_hidden_qualifier** - *[string]*

* Adds a hidden property to the list of members. This should be used when a getter/setter returns a value which is supposed to be a usable member.

**remove_hidden_qualifier** - *[string]*

* Removes a hidden qualifier from the list.

**remove_qualifier** - *[string]*
	
* Remove a property from the current list of usable members.

**list** - *[]*

* This will return a prototype de-coupled Object which contains all of the current usable properties. Updating this Object directly is not advised. All of the values are null as the qualifiers are the significant data.


**Basic example of brace_prototype usage:**

```javascript
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(["brace_prototype"], function(proto) {

	// usable_one and usable_two are mantained by brace prototype.
	var p = proto({
		usable_one: "cool",
		usable_two: "joes"

	})

	// The prototype can be extended this way. These are basic prototype members.

	var User = function() { 
	}

	User.prototype = p.extend({
		whats_up: function() { 
			console.log("doc")
		}
	})

	console.log(p.list())
})
```
