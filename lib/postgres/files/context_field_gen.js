var _super = require("./base_file_gen.js").prototype;

var ctx = ContextFieldGenerator.prototype = Object.create(_super);
ctx.constructor = ContextFieldGenerator;

function ContextFieldGenerator() {
	_super.constructor.apply(this);
    this.create = "Object.defineProperty(ctx, \"{name}s\"," +
    " {get: function () {" +
    "\n\t\tif (!this._{name}s) {\n" +
    "\t\t\tthis._{name}s = new collection(\"{name}\");\n\t\t}" +
    "\n\n\t\treturn this._{name}s;\n\t}\n});\n\n";

	this.name_patt = new RegExp('{name}', 'g');
}


ctx.get_create = function (model) {
	return this.create.replace(this.name_patt, model.meta.table_name);
}


ctx.serialize = function (model) {
	var content = '';
	content += this.get_create(model);
	return content;
}

module.exports = ContextFieldGenerator;