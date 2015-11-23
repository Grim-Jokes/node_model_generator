var Person = require("./person.js")
var DbContext = require("./ctx.js")

var ctx = new DbContext(process.argv[3])
console.log(ctx.persons.query)





return;