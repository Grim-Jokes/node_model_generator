function ModelSerializer() {
	//This class will serialize the model into a string
	this.result = '';
	this.model_declaration = "var {name} = {};"
	this.model_property = "{name}.{property} = null;\n"
	this.model_export = "module.exports = {name}"
}

var serializer = ModelSerializer.prototype;

serializer.__get_header = function (model) { 
	return this.model_declaration.replace("{name}", model.meta.table_name); 
}

serializer.__get_body = function (model) {
	var res = this.model_property.replace("{name}", model.meta.table_name);
	var ret = '';

	var keys = Object.keys(model);

	for (var i = 0; i < keys.length; i++) {
		if (keys[i] != 'meta') {
			ret += res.replace("{property}", keys[i]);
		}
	}

	return ret;
}

serializer.__get_export = function (model) {
	return this.model_export.replace("{name}", model.meta.table_name);
}

serializer.serialize = function (model) { 
	//Serialize the model into a string and cache the result
	
	var header = this.__get_header(model);
	
	var definition = this.__get_body(model);

	var export_str = this.__get_export(model);

	return header + '\n' + definition + '\n' + export_str;

}

module.exports = ModelSerializer;