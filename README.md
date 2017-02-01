### Connecting to a MongoDB
### Create CRUD api with Mongo / Monk

```
$ brew install mongodb
$ brew services start mongodb

$ mongo  // connects to db

> help
> exit
> show dbs  // shows all databases
> use database-name  // connects to db
> show collections  // show record
> db.cats.find({}).pretty()  // shows the cats collections
> db.cats.insert({ age:20, legs:{front:'yes',back:'yes'}})  // insert new record, even with different schema


```

```terminal
$ npm init -y
$ npm install express -S
$ npm install body-parser -S
$ npm install monk -S
$ yarn

$ touch .gitignore
$ echo "node_modules" >> .gitignore
$ echo "Icon?" >> .gitignore
$ echo "*/Icon?" >> .gitignore

```


```js

const express = require('express');
const bodyParser = require('body-parser');
const monk = require('monk');
const db = monk('localhost/my-test-database');
const cats = db.get('cats');

const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.post('/', (req, res, next) => {
  cats.insert(req.body)
  .then(result=>res.json(result))
  .catch(err=> next(err));
})


app.listen(3000, () => console.log('listening on port 3000'));

```

```terminal
$ nodemon app.js

```

#### Postman
- http://localhost:3000/
- 'POST', 'GET', 'PUT', 'DELETE'
- body (tab) x-www-form-urlencoded (selected)
- key: value
