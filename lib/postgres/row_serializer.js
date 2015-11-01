var _super = require("../row_serializer.js").prototype;

var method = PGTableSerializer.prototype = Object.create(_super);
method.constructor = PGTableSerializer;

function PGTableSerializer() {
	_super.constructor.apply(this);
	this.col_name = "column_name";
	this.table_name = "target_table";
}

module.exports = PGTableSerializer;