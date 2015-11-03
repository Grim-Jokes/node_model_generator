//AUTO-GENERATED FILE: Do not update code here or it could be overriden if the tool is ran again.

var pg = require("pg");
var collection = require("collection")

modules.export = ctxvar ctx = DbContext.prototype;

function DbContext(conString) { this._constring = conString; }

ctx.persons= Object.create(collection.prototype);
ctx.persons.constructor = collection;

ctx.transactions= Object.create(collection.prototype);
ctx.transactions.constructor = collection;

