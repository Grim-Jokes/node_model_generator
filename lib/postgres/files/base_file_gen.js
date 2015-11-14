var base_gen = BaseContentGenerator.prototype;

function BaseContentGenerator() {
	
	var date = new Date();

	this.comment = "//AUTO-GENERATED FILE: Do not update code here or it could be overwritten if the tool is ran again.\n";
	this.comment += "//Generated On: {date}\n\n".replace("{date}", date.toISOString().replace('T', ' ').replace('..', ''));
}


module.exports = BaseContentGenerator;