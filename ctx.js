//AUTO-GENERATED FILE: Do not update code here or it could be overwritten if the tool is ran again.
//Generated On: 2015-11-23 13:23:43.524Z

var _super = require("./lib/postgres/context");
var collection = require("./lib/postgres/collection");

var ctx = DbContext.prototype = Object.create(_super.prototype);
ctx.constructor = DbContext;

function DbContext(conString) {
	_super.call(this, conString);
}

Object.defineProperty(ctx, "transactions", {get: function () {
		if (!this._transactions) {
			this._transactions = new collection("transaction");
			this._transactions.context = this;
		}

		return this._transactions;
	}
});

Object.defineProperty(ctx, "persons", {get: function () {
		if (!this._persons) {
			this._persons = new collection("person");
			this._persons.context = this;
		}

		return this._persons;
	}
});

module.exports = DbContext;

