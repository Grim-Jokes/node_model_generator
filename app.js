﻿var gen = require('./lib/postgres/gen');
var collection = require('collection');
var ctx = require('ctx');

for (i = 2; i < process.argv.length; i++) {
	if (process.argv[i] == '-H' || process.argv[i] == '-h') {
		
		console.info("-C -- The database connection string");
		console.info("-S -- The database schema to use in postgres");
		console.info("-P -- The path in which to create model files.");

		process.exit();	
	}
}

gen.generate();



var col = new collection();

col.where(ex=> ex.first_name == "d" || ex.last_name == "s"  );

tran = new ctx().transactions 

tran.where(ex=> ex.first_name == "d" );

console.log(tran)

return;