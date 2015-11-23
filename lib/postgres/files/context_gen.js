var _super = require("./base_file_gen.js").prototype;

var ctx = ContextGenerator.prototype = Object.create(_super);
ctx.constructor = ContextFieldGenerator;

var ContextFieldGenerator = require('./context_field_gen.js');

function ContextGenerator() {

	_super.constructor.apply(this);
	this.field_gen = new ContextFieldGenerator();

	this.header = "var pg = require(\"pg\");\n" +
			"var collection = require(\"./lib/postgres/collection\");\n\n";
	
    this.definition = "var ctx = DbContext.prototype;\n\n" + 
    "function DbContext(conString) {\n\tthis._constring = conString;\n}\n\n";

	this.export = "module.exports = DbContext;";
	
}


ctx.serialize = function(models) {
	var ret = '';
	var gen = this.field_gen;
	
	ret += this.comment;
	ret += this.header;
	ret += this.definition;
	
	
	Object.keys(models).forEach(function (key) {
		var model = models[key];
		ret += gen.serialize(model);
	});
	
	ret += this.export + "\n\n";

	return ret;
}



module.exports = ContextGenerator;