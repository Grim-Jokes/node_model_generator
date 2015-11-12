function ModelFieldSerializer() {
	
	this.model_property = "{name}.{property} = null;\n";
}

var serializer = ModelFieldSerializer.prototype;

serializer.serialize = function (model) {
	
	var property = "{name}.{property} = null;\n".replace("{name}", model.meta.table_name)
	var keys = Object.keys(model);
	var ret = "";

	for (var i = 0; i < keys.length; i++) {
		if (keys[i] != 'meta') {
			ret += property.replace("{property}", keys[i]);
		}
	}

	return ret;
}

module.exports = ModelFieldSerializer;