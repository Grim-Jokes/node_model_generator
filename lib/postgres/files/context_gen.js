var _super = require("./base_file_gen.js").prototype;

var ctx = ContextGenerator.prototype = Object.create(_super);
ctx.constructor = ContextFieldGenerator;

var ContextFieldGenerator = require('./context_field_gen.js');

function ContextGenerator() {

	_super.constructor.apply(this);
	this.field_gen = new ContextFieldGenerator();

	this.header = "var _super = require(\"./lib/postgres/context\");\n" +
			"var collection = require(\"./lib/postgres/collection\");\n\n";
	
    this.definition = "var ctx = DbContext.prototype = Object.create(_super.prototype);\n" +
    "ctx.constructor = DbContext;\n\n" + 
    "function DbContext(conString) {\n\t_super.call(this, conString);\n}\n\n";

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