//AUTO-GENERATED FILE: Do not update code here or it could be overwritten if the tool is ran again.
//Generated On: 2015-11-22 14:29:22.325Z

var pg = require("pg");
var collection = require("./lib/postgres/collection");

var ctx = DbContext.prototype;

function DbContext(conString) {
	this._constring = conString;
}

Object.defineProperty(ctx, "transactions", {get: function () {
		if (!this._transactions) {
			this._transactions = new collection("transaction");
		}

		return this._transactions;
	}
});

Object.defineProperty(ctx, "persons", {get: function () {
		if (!this._persons) {
			this._persons = new collection("person");
		}

		return this._persons;
	}
});

module.exports = DbContext;

