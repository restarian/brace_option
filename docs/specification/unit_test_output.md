# Brace Option
### Output of unit testing
 
----
### Brace Option help pages
* [Synopsis](https://github.com/restarian/brace_option/blob/master/docs/synopsis.md)
* Specification
  * [License information](https://github.com/restarian/brace_option/blob/master/docs/specification/license_information.md)
  * [Package information](https://github.com/restarian/brace_option/blob/master/docs/specification/package_information.md)
  * **Unit test output**
----
 
### ---------- Start of unit testing ----------

  * Using stop further progression methodology for file dependencies: functionality.js
    * √ will build the Brace Option source using the local Brace Umd build_umd cli program
    * Checking for dependencies..
      * √ requirejs in available to the module system
      * √ amdefine in available to the module system
    * Running tests with the build file brace_option while loading the library module using requirejs
      * √ returns the same data as passed in to the constructor if the parameter was not a literal Object
      * √ returns an Object with the extended members
      * √ reverts properties which were originally added to the option
      * √ the clear member works with parameters as well without linked qualifiers
      * √ the clear member works with parameters as well with linked qualifers
      * √ the add_qualifier member works as intended without an alias
      * √ the remove_qualifier member works as intended
      * √ both the remove_qualifier and add_qualifier members works in tandom
      * √ the proto_extend member works with gettters and setters using option members as well
      * √ the proto_extend member works with gettters and setters as expected
      * √ the extend member works with gettters and setters as expected
    * Running tests with the build file brace_option while loading the build module using requirejs with the non-umd module
      * √ returns the same data as passed in to the constructor if the parameter was not a literal Object
      * √ returns an Object with the extended members
      * √ reverts properties which were originally added to the option
      * √ the clear member works with parameters as well without linked qualifiers
      * √ the clear member works with parameters as well with linked qualifers
      * √ the add_qualifier member works as intended without an alias
      * √ the remove_qualifier member works as intended
      * √ both the remove_qualifier and add_qualifier members works in tandom
      * √ the proto_extend member works with gettters and setters using option members as well
      * √ the proto_extend member works with gettters and setters as expected
      * √ the extend member works with gettters and setters as expected
    * Running tests with the build file brace_option while loading the build module using requirejs with the umd module
      * √ returns the same data as passed in to the constructor if the parameter was not a literal Object
      * √ returns an Object with the extended members
      * √ reverts properties which were originally added to the option
      * √ the clear member works with parameters as well without linked qualifiers
      * √ the clear member works with parameters as well with linked qualifers
      * √ the add_qualifier member works as intended without an alias
      * √ the remove_qualifier member works as intended
      * √ both the remove_qualifier and add_qualifier members works in tandom
      * √ the proto_extend member works with gettters and setters using option members as well
      * √ the proto_extend member works with gettters and setters as expected
      * √ the extend member works with gettters and setters as expected
    * Running tests with the build file brace_option while loading the module using a commonjs require
      * √ returns the same data as passed in to the constructor if the parameter was not a literal Object
      * √ returns an Object with the extended members
      * √ reverts properties which were originally added to the option
      * √ the clear member works with parameters as well without linked qualifiers
      * √ the clear member works with parameters as well with linked qualifers
      * √ the add_qualifier member works as intended without an alias
      * √ the remove_qualifier member works as intended
      * √ both the remove_qualifier and add_qualifier members works in tandom
      * √ the proto_extend member works with gettters and setters using option members as well
      * √ the proto_extend member works with gettters and setters as expected
      * √ the extend member works with gettters and setters as expected

  * 47 passing


### ---------- End of unit testing ----------