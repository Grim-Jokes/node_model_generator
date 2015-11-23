
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
    expression = expression.replace(/"/g, "'").replace(/==/g, '=').replace(/\s/g, '');
    
    var pattern = /[\w\d_]+\s*[=!<>]{1,2}\s*[\w\d'"]+\s*/gi
    var res = expression.match(pattern);
    var operators = expression.match(/\|\||&&/g);
    
    var where_clause = [];
    var clause_list = [];
    
    where_clause.push(clause_list);
    
    for (var i = 1, j = i - 1, k = 0; i < res.length; i++, j++) {
        var clause = res[i];
        
        var patt = /[=<>]|!=/
        var vals = clause.split(patt);
        var op = clause.match(patt);
        
        if (values) {
            var act_val = values[vals[1]]
            clause = vals[0] + op + "'" + act_val + "'";
        }
        
        if (operators && operators[j] == '||') {
            clause_list = [];
            where_clause.push(clause_list);
			
        }
        
        clause_list.push(clause);
    }
         
    var new_collection = new DbCollection(this.table_name);
    new_collection.where_clause = where_clause;
        
    return new_collection;
}


collection.where = function () 
{
    var p = this.select_parser();
}


collection.select = function () {
	
	var new_collection = new DbCollection(this.table_name);
	new_collection.where_clause = this.where_clause;
	new_collection.select_clause = Array.prototype.slice.call(arguments);
	
	return new_collection;
}


collection.delete = function () {
}


collection.first = function () {
    
}


collection.to_list = function () {
    ///pull back an array of objects
}


collection.to_dict = function () {
    ///Pull back all of the rows and use the primary key as the look up
}


module.exports = DbCollection;