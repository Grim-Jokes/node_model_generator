var Person = require("./person.js")

var p = function () {
}



p.prototype = {
    get id() {
        return 53;
    }
}

p1 = new p()

console.log(p1.id);


return;