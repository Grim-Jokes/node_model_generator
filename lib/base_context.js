var ctx = DbContext.prototype;

function DbContext() {
	this.inserts = {}
	this.updates = {}
	this.deletes = {}
}

ctx.add = function(model) {
	//Add the model to collection for insertion
	//validation does not happen until save is called
	this.inserts[model.constructor.name] = model;
}

ctx.save = function (model) {
	//Iterate over the collections for inserts, updates and deletes to generate the SQL queries
}