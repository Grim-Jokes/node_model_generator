var method = TableSerializer.prototype;

function TableSerializer() {
	this._models = {}
	this._col_name = null;
	this.table_names = null;
	this._meta = "meta"
}

method._add_model = function (row) {
	
	var name = row[this.table_name];
	this._models[name] = this._models[name] || {}
	this._models[name][this._meta] = this._models[name][this._meta] || { tablename : name }
}

method._add_field = function (row) {
	
	var default_value = null;
	var name = row[this.table_name];
	var col_name = row[this.col_name];
	
	this._models[name][col_name] = default_value;
	
}

method.add_row = function (row) {
	
	this._add_model(row)
	this._add_field(row)

};

module.exports = TableSerializer;