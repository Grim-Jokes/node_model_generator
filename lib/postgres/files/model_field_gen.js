var _super = require("./base_file_gen.js").prototype;

var serializer = ModelFieldSerializer.prototype = Object.create(_super);
serializer.constructor = ModelFieldSerializer;


function ModelFieldSerializer(prototype_name) {
    _super.constructor.apply(this);
    this.model_def = "Object.defineProperty({prototype}, '{property}'," +
    "{ get: function() {\n\treturn this._{property};\n},\n" +
    "set: function (value) {\n\tthis._{property} = value;\n}" +
    "});";
    this.prototype_name = prototype_name || 'model';

    this.model_def = this.model_def.replace("{prototype}", this.prototype_name);
}

serializer.serialize = function (model) {
	
	var keys = Object.keys(model);
	var ret = []

	for (var i = 0; i < keys.length; i++) {
		if (keys[i] != 'meta') {
            ret.push(this.model_def.replace(/{property}/g, keys[i]));
		}
	}

    return ret.join('\n');
  
}

module.exports = ModelFieldSerializer;