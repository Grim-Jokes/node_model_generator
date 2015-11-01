var fs = require('fs');


var method = FileWriter.prototype;

function FileWriter(output, models) {
	this._models = models
	this.is_file = false;
	this.output = output.replace("\"", "").replace(/\\/g, "/");
	
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
		
		content = model + '=' + model + ' || ' + self.get_fields(model);
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
		
		console.info(content);
		console.info(output_path);
	});
}

method.create_context_file = function () {
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
