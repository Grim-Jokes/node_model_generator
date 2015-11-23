var gen = require('./lib/postgres/gen');

for (i = 2; i < process.argv.length; i++) {
	if (process.argv[i] == '-H' || process.argv[i] == '-h') {
		
		console.info("-C -- The database connection string");
		console.info("-S -- The database schema to use in postgres. Defaults to database name");
		console.info("-P -- The path in which to create model files.");

		process.exit();	
	}
}

gen.generate();
