var gen = require('./postgres/gen');

for (i = 2; i < process.argv.length; i++) {
	if (process.argv[i] == '-H' || process.argv[i] == '-h') {
		
		console.info("-DB -- The database whose tables we generate models for");
		console.info("-P [dir]  -- The path in which to create model files.");
		console.info("-P [file] -- The file to put all of the models into.");

		return;	
	}
}

gen.generate();



