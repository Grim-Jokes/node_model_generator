var fs = require('fs');
var path = require('path');
var ContextGenerator = require('./context_gen.js');
var ModelSerializer = require('./model_gen.js');

var method = FileWriter.prototype;

function FileWriter(output, models) {
	this._models = models
	this.is_file = false;
	this.output = path.dirname(output.replace(/\\/g, "/"));
	this.m_gen = new ModelSerializer();
	this.context_gen = new ContextGenerator();
	
	var self = this;

	fs.stat(output, function (err, stats) {
		if (err) console.error(err);
		
		self.is_file = stats.isFile();
		
	});
}

method.create_model_files = function (slash_appended) {
	var self = this;
	
	Object.keys(self._models).forEach(function (model) {
		
		var content = self.m_gen.serialize(self._models[model]);
		
		var output_path = self.output + model + '.js';
		
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
	
	
	
	var content = this.context_gen.serialize(this._models);
	
	var output = this.output + "ctx.js";

	fs.writeFileSync(output, content);
}


method.create_files = function()
{
	var slash_appended = this.output.indexOf('/', this.output.length - 1) >= 0;

	var self = this;
	
	if (!this.is_file) {
		
		if (!slash_appended) {
			this.output += "/";
		}

		fs.mkdir(this.output);

		this.create_model_files();
		this.create_context_file();
	}
}

module.exports = FileWriter;
