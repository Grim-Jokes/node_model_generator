var _super = require("./base_file_gen.js").prototype;

var ctx = ContextFieldGenerator.prototype = Object.create(_super);
ctx.constructor = ContextFieldGenerator;

function ContextFieldGenerator() {
	_super.constructor.apply(this);
	this.create = "ctx.{name}s = Object.create(collection.prototype);\n";
	this.constructor_def = "ctx.{name}s.constructor = collection\n";
	this.table_def = "ctx.{name}s.table_name = {name}\n\n";
	this.name_patt = new RegExp('{name}', 'g');
}


ctx.get_create = function (model) {
	return this.create.replace("{name}", model.meta.table_name);
}


ctx.get_constructor = function(model) { 
	return this.constructor_def.replace("{name}", model.meta.table_name);
}


ctx.get_table_definition = function (model) {
	return this.table_def.replace(this.name_patt, model.meta.table_name);
}

ctx.serialize = function (model) {
	var content = '';
	content += this.get_create(model);
	content += this.get_constructor(model);
	content += this.get_table_definition(model);

	return content;
}

module.exports = ContextFieldGenerator;