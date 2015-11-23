var _super = require("./base_file_gen.js").prototype;

var serializer = ModelSerializer.prototype = Object.create(_super);
serializer.constructor = ModelSerializer;

var ModelFieldSerializer = require('./model_field_gen.js');

function ModelSerializer() {
	//This class will serialize the model into a string
	
	_super.constructor.apply(this);
	this.result = '';

    this.model_declaration = "var {name} = function() { }\n";
    this.model_prototype = "var model = {name}.prototype;\n\n"
	this.model_export = "\n\nmodule.exports = {name};"

	this.field_serializer = new ModelFieldSerializer('model');
}


serializer.__get_header = function (model) { 
	return this.model_declaration.replace(/{name}/g, model.meta.table_name); 
}

serializer.__get_body = function (model) {
    var body = this.field_serializer.serialize(model);
    return body;
}

serializer.__get_export = function (model) {
	return this.model_export.replace("{name}", model.meta.table_name);
}

serializer.__get_prototype = function (model) {
    return this.model_prototype.replace("{name}", model.meta.table_name);
}

serializer.serialize = function (model) { 
	//Serialize the model into a string and cache the result
	
	var content = "";
    
    content += this.comment;
    content += this.__get_header(model);
    content += this.__get_prototype(model);
    content += this.__get_body(model);
	content += this.__get_export(model);

	return content;

}

module.exports = ModelSerializer;