var _super = require("./base_file_gen.js").prototype;

var serializer = ModelSerializer.prototype = Object.create(_super);
serializer.constructor = ModelSerializer;

var field_gen = require('./model_field_gen.js');

function ModelSerializer() {
	//This class will serialize the model into a string
	
	_super.constructor.apply(this);
	this.result = '';

	this.model_declaration = "var {name} = {};\n"
	this.model_export = "module.exports = {name};"

	this.field_serializer = new field_gen();
}


serializer.__get_header = function (model) { 
	return this.model_declaration.replace("{name}", model.meta.table_name); 
}

serializer.__get_body = function (model) {
	return this.field_serializer.serialize(model);
}

serializer.__get_export = function (model) {
	return this.model_export.replace("{name}", model.meta.table_name);
}

serializer.serialize = function (model) { 
	//Serialize the model into a string and cache the result
	
	var content = "";
	
	content += this.comment;
	content += this.__get_header(model);
	content += this.__get_body(model) + "\n";
	content += this.__get_export(model);

	return content;

}

module.exports = ModelSerializer;