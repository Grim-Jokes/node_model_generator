var pg = require("pg");
var collection = require("./collection.js");

function BaseDbContext(conString) {
    this._conString = conString;
}

var ctx = BaseDbContext.prototype;

ctx.query = function (query, callback){
    pg.connect(this._conString, function (err, client, done) {
        client.query(query, function (err, result) {
            if (err) throw new Error(err);
            if (callback) { callback(result.rows); }

            done();
            
        });
    });
}

ctx.save = function (callback)
{
    var tables = Object.keys(this);
    var key = '';
    var table = '';

    for (var i = 0; i < tables.length; i++) {
        key = tables[i];
        table = this[key];

        var query = table.create_query;
        
        if (query) {
            this.query(query, callback);
        }
    }
}

module.exports = BaseDbContext;