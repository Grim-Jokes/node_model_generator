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

var r = []

var p1 = ctx.persons;
var person = new Person();
person.first_name = "Daniel";
person.last_name = "Szekely";
p1.push(person)

var p = ctx.persons.filter(p => p.first_name = "Dan");

var result = q.to_list(function (rows) {
    r = rows;
    console.log(rows);
    return;
});

var result = q2.to_list(function (rows) {
    console.log(rows);
    console.log(r);
    return;
});

q2.single(function (res) {
    console.log(res);
});

q2.select("first_name").single(function (row) {
    console.log(row);
});

q2.select("first_name").single(function (row) {
    console.log(row);
});

var p = ctx.persons.group_by('first_name').select("first_name" ,"count(id)");

p.to_list(function (rows) {
    console.log(rows);

});

console.log(p.query);

return;
