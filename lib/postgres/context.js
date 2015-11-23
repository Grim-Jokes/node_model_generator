var pg = require("pg");
var collection = require("./collection.js");

function BaseDbContext(conString) {
    this._conString = conString;
}

var ctx = BaseDbContext.prototype;

ctx.query = function (query, callback){
    pg.connect(this._conString, function (err, client, done) {
        client.query(query, function (err, result) {
            if (err) console.error(err);
            if (callback) { callback(result.rows); }
            done();
            
        });
    });
}

module.exports = BaseDbContext;