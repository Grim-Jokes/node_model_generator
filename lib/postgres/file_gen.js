var fs = require('fs');
var path = require('path');

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
