
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

/* Generated by Brace Umd 0.11.2 */
if('function'!=typeof define)var define=require('amdefine')(module);define('brace_option',[],function(){return function(e,t){if(t=t&&t.parent&&t instanceof t.parent?t.spawn(t.log_title+' -> brace_option'):console,'object'!=typeof e)return t.log('Constructor must passed an Object to assign additional members.')||e;var r='function'==typeof Object.getPrototypeOf,n={},i={};Object.getOwnPropertyNames(e).forEach(function(e){n[e]=null});var o=function(e){if(this.hasOwnProperty(e)){if(r)return e in Object.getPrototypeOf(this)&&delete this[e]||!0;for(var t=this.__proto__;t;t=t.__proto__)if(e in t)return delete this[e]||!0}return!1};return e.clear=function(){if(arguments.length)for(var e in arguments)arguments[e]in n?(o.call(this,arguments[e]),arguments[e]in i&&o.call(this,i[arguments[e]])):t.log('The qualifier',arguments[e],'was passed to a brace prototype instance which does not have it listed.','You should either: insert the qualifier to the constructor Object parameter or add the qualifier with the add_qualifier member.');else for(var r in n)o.call(this,r),i[r]&&o.call(this,i[r])},e.extend=function(e){return Object.getOwnPropertyNames(e).forEach(function(t){var r=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(this,t,r)},this),this},e.proto_extend=function(t){return Object.getOwnPropertyNames(t).forEach(function(e){var r=Object.getOwnPropertyDescriptor(t,e);Object.defineProperty(this,e,r)},e),e},e.add_qualifier=function(t,r){'string'==typeof r&&r&&(i[t]=r),n[t]=null,t in e||(e[t]=null)},e.remove_qualifier=function(e){delete n[e],delete i[e]},e.list=function(){return n},e}});

