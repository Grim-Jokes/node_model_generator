# node_model_generator
This tool is for myself as I prefer to design the database first before even touching the code. Instead of writing out models by hand, the tool will generate either a file for all of the models, or a file per model.

```
node app.js -C <connectionstring> -S [schema]
```

#PostgresSQL
Based on the information_schema and pg_default catalogs, each column will be grouped together based on the table name. The file names will be exactly the same as the table names. 
If the app is run again the files are overriden, and is therefore not recommended to write any code inside the .js files.

At this point, the ORM generated is very simple. No relationships and constraints are implemented.

##DbContexts
Once the models are generated, a field containing the definition of a db context is created. This context handles the logic of generating the SQL code for the CRUD operations.

The code to instantiate a context object will be:
```
//create an instance of the context for the request
var ctx = require("db_context")(con_string);
```

Ideally the code to select will be:

```
var result = ctx.Persons.where(person => person.first_name="John" && person.last_name="AppleSeed" || person.email="john@gmail.com")
//The result.sql SQL should be:
//SELECT * FROM `person` WHERE (first_name = 'John' and last_name = 'AppleSeed') OR (email='john@gmail.com');
```

The code to insert a single model will be:

```
var person = new Person({first_name : 'John', last_name : 'AppleSeed', email : 'john@gmail.com', password : 'password'});
ctx.Persons.add(person);
//INSERT INTO `person` (first_name, last_name, email, password) VALUES ('John', 'AppleSeed', 'john@gmail.com', 'password');
ctx.save();
```

If you want to add multiple seprate models:

```
ctx.Persons.add(person2);
//INSERT INTO `person` (first_name, last_name, email, password) VALUES ('John', 'AppleSeed', 'john@gmail.com', 'password'), ('Bob', 'Smith', 'bob@gmail.com', 'password')
ctx.save();
```

The code to update a single model will be:

```
var person = ctx.Persons.single({id : 1}) 
person.set_first_name("Bob");
//UPDATE `person` SET first_name = 'Bob' WHERE id = 1;
ctx.save();
```

The code to delete a model will be: 

```
ctx.Persons.delete({id = 1})
//DELETE FROM `person` WHERE id = 1;
```



#Unit tests
Mochajs and Shouldjs

Running the command
```
mocha
```
from the root directory will run the tests in test/*.js