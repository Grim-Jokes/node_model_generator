var fs = require('fs');
var path = require('path');
var ctx_gen = require('./context_gen.js');

var method = FileWriter.prototype;

function FileWriter(output, models) {
	this._models = models
	this.is_file = false;
	this.output = path.dirname(output.replace("\"", "").replace(/\\/g, "/"));
	
	var self = this;

	fs.stat(output, function (err, stats) {
		if (err) console.error(err);
		
		self.is_file = stats.isFile();
		
	});
}


method.get_export = function(model)
{
	return "module.exports = " + model;
}


method.get_fields = function(model)
{
	return JSON.stringify(this._models[model], null, 4)
}


method.create_model_files = function () {
	var self = this;
	Object.keys(self._models).forEach(function (model) {
		
		content ="var " + model + '=' + model + ' || ' + self.get_fields(model);
		content += "\n\n";
		content += self.get_export(model)
		
		var output_path = ''
		
		if (!slash_appended) {
			output_path = self.output + '/' + model + '.js'
		}
		else {
			output_path = self.output + model + '.js'
		}
				
		fs.writeFileSync(output_path, content, {}, function (err) {
			if (err) throw err;
		});
		
		console.info("Created " + output_path);
	});
}


method.create_context_file = function () {
	//generate a context class. 
	//The context class will have:
	//	constructor that will take a connection string parameter
	//		the connection will be pooled
	//	functions to retrieve collections based on the parameters.
	//		i.e. context.Models.select({ p1 : f1 })
	//	functions to add models to the collection
	//		i.e. context.Models.add(model)
	//	functions to remove models from the collection
	//		i.e. context.Models.remove(model)
	
	var gen = new ctx_gen()
	
	var content = this.build_ctx_header() + this.build_ctx_definition() + this.build_ctx_export() + "\n\n";
	
	var self = this;
	Object.keys(this._models).forEach(function (key) {
		var model = self._models[key];
		content += gen.get_collection_name(model) + "= Object.create(collection.prototype);\n";
		content += gen.get_collection_name(model) + ".constructor = collection;";
		content += "\n";
		content += gen.get_collection_name(model) + ".table_name = \"" + model.meta.table_name +'";';
		content += '\n\n';
	});

	fs.writeFileSync("./ctx.js", content);
}


method.build_ctx_header = function () {
	return "//AUTO-GENERATED FILE: Do not update code here or it could be overriden if the tool is ran again." + "\n\n" +
			"var pg = require(\"pg\");\n" +
			"var collection = require(\"collection\")\n\n"

}
method.build_ctx_definition = function () {
	return "var ctx = DbContext.prototype;\n\nfunction DbContext(conString) { this._constring = conString; }\n\n"
}


method.build_ctx_export = function () {
	return "module.exports = DbContext;";
}

method.create_files = function()
{
	slash_appended = this.output.indexOf('/', this.output.length - 1) >= 0;

	var self = this;
	
	if (!this.is_file) {
		
		fs.mkdir(this.output);

		this.create_model_files();
		this.create_context_file();
	}
}

module.exports = FileWriter;
