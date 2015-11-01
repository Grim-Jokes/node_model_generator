var pg = require("pg");
var settings = require("config");
var fw = require("./file_gen.js");
var serializer = require("./row_serializer.js");

var gen = {}

gen.get_query = function (client, schema_name) {
	q =
	"SELECT " +
		"c.column_name," + 
		"tc.table_name as source_table," +
		"c.table_name as target_table," +
		"c.data_type, " +
		"c.is_nullable, " +
		"c.column_default, " +
		"tc.constraint_type," +
		"ccu.constraint_name " +
	"FROM " +
		"information_schema.columns c " +
	"LEFT JOIN information_schema.constraint_column_usage ccu ON " +
		"c.column_name = ccu.column_name AND " +
		"c.table_name = ccu.table_name " +
	"LEFT JOIN " +
		"information_schema.table_constraints tc ON " +
		"tc.constraint_name = ccu.constraint_name " +
	"WHERE " +
		"c.table_schema = $1";

	query = client.query(q, [schema_name]);
	return query;
}

gen.generate = function (new_path, schema) {
	var client = new pg.Client(settings.constring)
	
	var output = new_path || "./";
	
	var is_file = true;
	
	var self = this;

	var ser = new serializer()
	
	var options = this.get_options();
	
	client.connect();
	var query = self.get_query(client, options.schema);
		
	query.on('row', function (row) {
		ser.add_row(row);
	});
		
	query.on('end', function () {
		client.end();
		fw = new fw(output, ser._models);
		fw.create_files()
		process.exit();
	});
	
}

gen.get_options = function () {
	var path = null;
	var schema = null;
	
	if (process.argv.length > 2)
		
		for (i = 2; i < process.argv.length; i += 2) {
			if (process.argv[i] == "-P") {
				
				if (process.argv[i + 1]) {
					path = process.argv[i + 1];
				}
				else {
					logger.error("A path must be specified");
				}
			}
			else if (process.argv[i] == "-DB") {
				if (process.argv[i + 1]) {
					schema = process.argv[i + 1];
				}
				else {
					logger.error("A database must be specified");
				}
			}
		}
	
	if (!schema) {
		throw new Error("Schema is not provided"); 
	}

	return {
		path : path,
		schema : schema
	}
}

module.exports = gen




