
var _base = Array.prototype;

//base classe for the context collection
var collection = DbCollection.prototype = Object.create(Array.prototype);

function DbCollection(table_name) {
	//This collection will focus on creating and caching queryable objects before hitting the database
	Array.constructor.apply(this)
	this.table_name = table_name || '';
	this.select_clauses = [];
    this.where_clauses = [];
    this.group_by_clauses = [];
    this.order_by_clauses = [];
}

Object.defineProperty(collection, "query", {
	get : function () { 
        var query = ['SELECT'];
		
		if (this.select_clauses.length > 0) {
			query.push(this.select_clauses.join());
		}
		else {
			query.push("*");
		}

        query.push("FROM")
        query.push(this.table_name)
    
        if (this.where_clauses && this.where_clauses.length > 0) {
            query.push('WHERE');
            query.push(this.where_clauses.join(' OR '));
        }
        
        if (this.group_by_clauses.length > 0) {
            query.push("GROUP BY")
            query.push(this.group_by_clauses.join())
        }
		
		return query.join(' ') + ';';
	}
});

Object.defineProperty(collection, "create_query", {
    get : function () {
        
        if (this.length > 0) {
            var query = ['INSERT'];
         
            
            query.push("INTO");
            query.push(this.table_name);
            
            
            var columns = Object.keys(this[0]);
            var db_columns = columns.map(x=> x.replace('_', ''));

            query.push('(' + db_columns.join() + ')');
            query.push('VALUES');
            
            var val = '', inserts = [], vals;
            for (var i = 0; i < this.length; i++) {
                
                vals = []
                for (var j = 0; j < columns.length; j++) {
                    vals.push("'" + this[i][columns[j]] + "'");
                }
                inserts.push('(' + vals.join() + ')');
            }

            query.push(inserts.join(','));
              
            return query.join(' ') + ';';
        }
            
        return '';
    }
});


collection.add = function (model) {
}


collection.bulk_add = function (models) { 
}


collection.push = function(value) {
    Array.prototype.push.call(this, value);
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
    
    collection.where_clauses.push(expression);
    return collection;
}

collection.__new_collection = function() {
    var new_collection = new DbCollection(this.table_name);
    Array.prototype.push.apply(new_collection.where_clauses, this.where_clauses);
    Array.prototype.push.apply(new_collection.select_clauses, this.select_clauses);
    Array.prototype.push.apply(new_collection.group_by_clauses, this.group_by_clauses);
    Array.prototype.push.apply(new_collection.order_by_clauses, this.order_by_clauses);
    new_collection.context = this.context;
    
    return new_collection
}

collection.select = function () {
    
    var select_clauses = Array.prototype.slice.call(arguments);
	
    var collection = this.__new_collection();
    Array.prototype.push.apply(collection.select_clauses, select_clauses);
    return collection;
}


collection.delete = function () {
}


collection.first = function () {
    
}

collection.single = function (callback) { 

    this.context.query(this.query, function (rows) {
        if (rows.length > 1) {
            throw new Error("There is more than one result");
        }
        else {
            callback(rows[0])
        }
    })
}

collection.group_by = function () {
    var group_by_clauses = Array.prototype.slice.call(arguments);

    var new_collection = this.__new_collection();
    Array.prototype.push.apply(new_collection.group_by_clauses, group_by_clauses)

    return new_collection;
}

collection.to_list = function (callback) {
    ///pull back an array of objects
    this.context.query(this.query, callback);
}


collection.to_dict = function () {
    ///Pull back all of the rows and use the primary key as the look up
}




module.exports = DbCollection;