/* Brace Option resides under the MIT license Copyright (c) 2020 Robert Steckroth <RobertSteckroth@gmail.com>

Brace Option adds member data to object prototypes to control properties within the chain.

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

if (typeof define !== 'function') { var define = require('amdefine')(module) }

define([], function() {

	return function(proto, up) {
		
		// The simplest way to determine if the argument is of the bracket_print type.
		if ( up && up.parent && (up instanceof up.parent) ) 
			up = up.spawn(up.log_title+" -> brace_option") 
		else
			up = console

		if ( typeof proto !== "object" )
			return up.log("Constructor must passed an Object to assign additional members.") || proto

		var has_object_method = typeof Object.getPrototypeOf === "function" 

		// It is important for list to be decoupled from the passed in prototype Object so that prototypes are not updated when the (add/remove)_qualifier
		// members are used.
		var list = {}, link = {}
		Object.getOwnPropertyNames(proto).forEach(function(key) {
			list[key] = null
		})

		var remove = function(qualifier) {
			// Reset all of the values in the prototype of the Object which contains this member to the default values. The default value is the value 
			// contained in the prototype of the instance. The property will not be changed if the Object does not have a prototype or if the property 
			// is not part of the prototype.

			if ( this.hasOwnProperty(qualifier) ) {
				// This block will check to ensure that the prototype property exists and it is a owned property. The property will not be removed if the
				// corresponding qualifier was deleted in the prototype. Otherwise, it should be expected that any of the properties in the maintained list of
				// parameters are not deleted (remove_qualifier should be used instead).

			   if ( has_object_method )
					return (qualifier in Object.getPrototypeOf(this)) && delete this[qualifier] || true
			   else
					// Crappy to use this but.. 
					// The entire chain needs to be checked using the slow __proto__ object if Object.getPrototypeOf does not exist (i.g. versions of Opera below 10.50).
					for ( var chain = this.__proto__; chain; chain = chain.__proto__ )
						// Find out if the property is located within the prototypal chain with this loop.
						if ( qualifier in chain )
							// The delete return value is not reliable :(
							return delete this[qualifier] || true
			}
			return false
		}
		proto.clear = function() {
			// Passing in string parameters to this member will reset only the members of the instance. All of the members of the instance will be 
			// reset if no parameters are passed to the call to this member.

			// Loop through all of the properties is no strings were passed in.
			if ( !arguments.length )
				for ( var n in list ) {
					remove.call(this, n)
					if ( link[n] )
						remove.call(this, link[n])
				}
			 // Loop through only the string arguments passed in.
			 for ( var x in arguments )
				 if ( (arguments[x] in list) || (arguments[x] in hidden_list) ) {
					 remove.call(this, arguments[x])
						if ( link[arguments[x]] )
							remove.call(this, link[arguments[x]])
				 }
				 else
					 up.log("The qualifier", arguments[x], "was passed to a brace prototype instance which does not have it listed.",
									 "You should either: insert the qualifier to the constructor Object parameter or add the qualifier with the add_qualifier member.")
		}
		proto.extend = function(obj) {
			// This will extend either the constructor generated Object if it is accessed from the constructor or it will extend the prototype it was 
			// attached to if it was accessed from that prototype. The Object is fully copied by setting the property descriptors which will include 
			// much of the Object information. getOwnPropertyNames will loop through all of the Object properties (including non-enumerable ones).

			Object.getOwnPropertyNames(obj).forEach(function(key) {

				var desc = Object.getOwnPropertyDescriptor(obj, key)
				Object.defineProperty(this, key, desc)
			}, this)

			return this 
		}
		proto.proto_extend = function(obj) {
			// This will extend prototype it was attached to regardless how it was accessed effectively making it a way of accessing the original prototype
			// without needing to use the __proto__ builtin (which is highly inefficient). 
			
			Object.getOwnPropertyNames(obj).forEach(function(key) {

				var desc = Object.getOwnPropertyDescriptor(obj, key)
				Object.defineProperty(this, key, desc)
			}, proto)

			return proto 
		}
		proto.add_qualifier = function(qualifier, alias) {

			// Alias is used to control a secondary object. It will be acted upon exactly as the qualifier property is handled. This is usefull for getters and setters
			// which use a tertiary property for the value.
			if ( typeof alias === "string" && alias )
				link[qualifier] = alias

			// The list is only used for the qualifier data so null is always set as the values.
			list[qualifier] = null 
			if ( !(qualifier in proto) )
				proto[qualifier] = null 
		}
		proto.remove_qualifier = function(qualifier) {

			// This will prevent it from being altered by any of these members.
			delete list[qualifier]
			delete link[qualifier]
		}
		proto.list = function() {

			return list
		}
		return proto
	}
})
