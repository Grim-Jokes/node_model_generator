var Person = require("./person.js")
var DbContext = require("./ctx.js")

var ctx = new DbContext(process.argv[3])
console.log(ctx.persons.query)

var d = { d : "Daniel", l : "s" };

var q = ctx.persons.where(ex=> first_name == "{d}" || last_name == "{l}", d);

console.log(q.query);

var q = ctx.persons.where(ex=> first_name == "Daniel");
var q2 = q.where(ex=> last_name == "Szekely")
console.log(q.query);
console.log(q2.query);

var result = q.to_list(function (rows) {
    console.log(rows);
    return;
});


return;