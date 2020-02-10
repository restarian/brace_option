[![Build status](https://ci.appveyor.com/api/projects/status/brjc2vpthpugvtk2?svg=true)](https://ci.appveyor.com/project/restarian/brace-option) [![Downloads](https://img.shields.io/npm/dm/brace_option.svg?svg=true)](https://npmjs.org/package/brace_option)

| **The [Bracket Suite]** | **[Ubuntu on Windows]**   |
|:-----------------------:|:-------------------------:|
| ![Bracket logo]         | ![Ubuntu on Windows logo] |         |

[Bracket Suite]: https://github.com/restarian/restarian/tree/master/bracket/
[Ubuntu on Windows]: https://www.microsoft.com/en-us/store/p/ubuntu/9nblggh4msv6?activetab=pivot%3aoverviewtab

[Ubuntu on Windows logo]: https://raw.githubusercontent.com/restarian/restarian/master/doc/image/ubuntu_windows_logo.png
[Bracket logo]: https://raw.githubusercontent.com/restarian/restarian/master/bracket/doc/image/bracket_logo_small.png

## Synopsis

---
### Brace Option help pages
* **Synopsis**
* Specification
  * [License information](https://github.com/restarian/brace_option/blob/master/docs/specification/license_information.md)
  * [Package information](https://github.com/restarian/brace_option/blob/master/docs/specification/package_information.md)
  * [Unit test output](https://github.com/restarian/brace_option/blob/master/docs/specification/unit_test_output.md)

---

**Author: Robert Steckroth, *Bust0ut* [<RobertSteckroth@gmail.com>](mailto:robertsteckroth@gmail.com)**

**Licensed under:** MIT

### The primary purpose of this library is to create option like data within a prototype for program operation. 

### Usage instructions

The library provides a member which returns an Object to be used in a prototype. The returned Object contains a few additional methods which operate on the prototype. Below are the members which are created with the library return Object.

**clear([string, ...])**
	
* The clear member should be called with no parameters or with zero to many string parameters. All of the properties that were added with the original constructor (the option members), and any added with the *add_qualifier()* member, will have the values reset to the current prototype value. An empty call clears all of the option values while only those properties matching the strings passed in will be reset if parameters are passed in. This member is idempotent.

**proto_extend(Object)**
	
* This will extend the current prototype it is attached to with a complete description of the passed in Object. These properties are not added as option members as this is a convenience member.

**extend(Object)** 
	
* This will extend the returned Object with a complete description of the passed in Object. These properties are not added as option members as this is a convenience member.

**add_qualifier(qualifer, alias)**

* Adds a property to the current list of option members. This method also accepts a an alias as the second argument which will be cleared whenever the first one is. This is usefull when using getters and setters within the option data. The alias qualifier does not show up in the *list()* output.

**remove_qualifier(qualifer)**
	
* Remove an entry from the current list of option members. This will also remove any aliased properties from the list.

**list()**

* This will return an array which contains all of the current option qualifers.

**Basic example of Brace Option usage:**

```javascript
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(["brace_option"], function(proto) {

	// usable_one and usable_two are mantained by brace option.
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
