# Brace Option
### Package Specifications

----

### Brace Option help pages
* [Synopsis](https://github.com/restarian/brace_option/blob/master/docs/synopsis.md)
* Specification
  * [License information](https://github.com/restarian/brace_option/blob/master/docs/specification/license_information.md)
  * **Package information**
  * [Unit test output](https://github.com/restarian/brace_option/blob/master/docs/specification/unit_test_output.md)
----

**Version**: 0.5.1

**Description**: This script provides function which sits in a prototype to create prototypal property chaining control.

**Author**: [Robert Steckroth](mailto:RobertSteckroth@gmail.com)

**Development dependencies**: [amdefine](https://npmjs.org/package/amdefine) [brace_maybe](https://npmjs.org/package/brace_maybe) [brace_umd](https://npmjs.org/package/brace_umd) [bracket_utils](https://npmjs.org/package/bracket_utils) [chai](https://npmjs.org/package/chai) [mocha](https://npmjs.org/package/mocha) [requirejs](https://npmjs.org/package/requirejs)

**Optional Dependencies**: [brace_document](https://npmjs.org/package/brace_document) [brace_document_link](https://npmjs.org/package/brace_document_link) [brace_document_mocha](https://npmjs.org/package/brace_document_mocha) [brace_document_navlink](https://npmjs.org/package/brace_document_navlink) [brace_document_specification](https://npmjs.org/package/brace_document_specification)

**Package scripts**:

| Name | Action |
| ---- | ------ |
 | test | ```mocha``` |
 | build_config | ```build_umd --config-file uglify_option.json``` |
 | build_umd | ```r_js -o ./rjs_build_first.js && r_js -o ./rjs_build_second.js suffix="_umd"``` |
 | build_amd | ```r_js -o ./rjs_build_first.js && r_js -o ./rjs_build_second.js``` |
 | build | ```npm run build_config && npm run build_umd && npm run build_amd``` |
 | make_docs | ```brace_document --navlink --link --link-dest ../Readme.md --link-path ../docs/synopsis.md -r -i docs --force-title --title "Brace Option help pages" --sort depth --specification --mocha``` |

**Keywords**: *options*