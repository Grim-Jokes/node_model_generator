//AUTO-GENERATED FILE: Do not update code here or it could be overwritten if the tool is ran again.
//Generated On: 2015-11-21 15:43:16.581Z

var pg = require("pg");
var collection = require("collection");

var ctx = DbContext.prototype;

function DbContext(conString) {
	this._constring = conString;
}

ctx.transactions = Object.create(collection.prototype);
ctx.transactions.constructor = collection
ctx.transactions.table_name = "transaction"

ctx.persons = Object.create(collection.prototype);
ctx.persons.constructor = collection
ctx.persons.table_name = "person"

module.exports = DbContext;

