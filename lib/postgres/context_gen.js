var ctx = ContextGenerator.prototype;

function ContextGenerator() {
	
}

ctx.get_collection_name= function (model) {
	
	var collection_name ="ctx." + model.meta.table_name + 's';
			
	return collection_name;
	
}


module.exports = ContextGenerator;