var _super = require("./base_file_gen.js").prototype;

var serializer = ModelFieldSerializer.prototype = Object.create(_super);
serializer.constructor = ModelFieldSerializer;


function ModelFieldSerializer() {
	_super.constructor.apply(this);
	this.model_property = "{name}.{property} = null;\n";
}

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