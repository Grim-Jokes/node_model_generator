var pg = require("pg");
var fw = require("./file_gen.js");
var serializer = require("./row_serializer.js");

var gen = {}

gen.get_query = function (client, schema_name) {
	q =
	"SELECT " +
		"c.column_name," + 
		"tc.table_name as source_table," +
		"c.table_name as target_table," +
		"c.table_schema, " +
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
	"WHERE ";
	
	var params = []
	if (schema_name) {
		"c.table_schema = $1";
		params.push(schema_name);
	}
	else {	
		q +=	"c.table_schema != 'pg_catalog' AND " +
				"c.table_schema != 'information_schema' ";
	}

	query = client.query(q, params);
	return query;
}

gen.generate = function () {
	
	var options = this.get_options();

	var client = new pg.Client(options.constring)
	
	var output = options.path || "./"
	
	var is_file = true;
	
	var self = this;

	var ser = new serializer()
	
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
	///Get some paramters to specify where the models should be put and which connection strings to use
	
	var options = {
		path : null,
		schema : null,
		constring : null
	}
	
	var length = process.argv.length;
	
	var get_command = function (code) {
		
		for (i = 2; i < length; i++) {
			if (process.argv[i] == code && process.argv[i + 1]) {
				return process.argv[i+1]
			}
		}		
	}
			
	options.path = get_command("-P");
	options.schema = get_command("-S");
	options.constring = get_command("-C");
	
	if (!options.constring) {
		throw new Error("Connection string must be specified");
	}

	return options;
}

module.exports = gen




