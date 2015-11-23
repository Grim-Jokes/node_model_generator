
var _base = Array.prototype;

//base classe for the context collection
var collection = DbCollection.prototype;

function DbCollection(table_name) {
	//This collection will focus on creating and caching queryable objects before hitting the database
	
	this.table_name = table_name || '';
	this.select_clause = [];
    this.where_clause = [];
}

Object.defineProperty(collection, "query", {
	get : function () { 
        var query = ['SELECT', "{select_clause}", 'FROM', '{table_name}'];
		
		if (this.select_clause.length > 0) {
			query[1] = query[1].replace("{select_clause}", this.select_clause.join());
		}
		else {
			query[1] = query[1].replace("{select_clause}", "*");
		}
		
        query[3] = query[3].replace("{table_name}", this.table_name);
        
        if (this.where_clause) {
            query.push('WHERE');
            query.push(this.where_clause.join(' OR '));
        }
		
		return query.join(' ') + ';';
	}
});


collection.add = function (model) {
}


collection.bulk_add = function (models) { 
}


collection.where = function (expression, value_map) {
    ///Based on the lambda expression, returns a new instance of the collection
    ///that will contain the where clause objects 
    ///To get the entries from the database, call .to_list() or .to_dict();
    
    expression = expression.toString();
    expression = expression.replace(/"/g, "'").replace(/\s/g, '').replace(/==/g, '=');
    expression = expression.replace(/[\w\d]*=>/, "").replace('||', ' OR ').replace(' && ', ' AND ')
    
    var res = expression.split(/ OR | AND /g)
    var field = '';
    
    if (value_map) {
        var keys = Object.keys(value_map);
        var key = '';
        var val = '';
        var pattern = "";
        for (var i = 0; i < keys.length; i++) {
            key = keys[i];
            val = value_map[key];
            pattern = new RegExp("{" + key + "}", 'g');
            
            expression = expression.replace(pattern, val);
        }
    }

    var collection = this.__new_collection();
    
    collection.where_clause.push(expression);
    return collection;
}

collection.__new_collection = function() {
    var new_collection = new DbCollection(this.table_name);
    Array.prototype.push.apply(new_collection.where_clause, this.where_clause);
    Array.prototype.push.apply(new_collection.select_clause, this.select_clause);
    new_collection.context = this.context;
    
    return new_collection
}

collection.select = function () {
    
    var select_clause = Array.prototype.slice.call(arguments);
	
    var collection = this.__new_collection();
    collection.select_clause.push.apply(select_clause)
    return collection;
}


collection.delete = function () {
}


collection.first = function () {
    
}


collection.to_list = function (callback) {
    ///pull back an array of objects
    this.context.query(this.query, callback);
}


collection.to_dict = function () {
    ///Pull back all of the rows and use the primary key as the look up
}


module.exports = DbCollection;