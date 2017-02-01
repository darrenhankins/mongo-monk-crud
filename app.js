const express = require('express')
const bodyParser = require('body-parser')
const monk = require('monk')
const db = monk('localhost/my-database')
// monk is similar to knex
const dogs = db.get('dogs')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

// post
app.post('/', (req,res,next) => {
  dogs.insert(req.body)
  .then(result => res.json(result))
  .catch(err => next(err))
})

// get all
app.get('/', (req,res,next)=> {
  dogs.find()
  .then(result => res.json(result))
  .catch(err => next(err))
})

// get one
app.get('/:id', (req,res,next)=> {
  dogs.find({ _id:req.params.id })
  .then(result => res.json(result))
  .catch(err => next(err))
})

// delete
app.delete('/:id', (req,res,next)=> {
 dogs.remove({ _id:req.params.id })
 .then(result => res.json(result))
 .catch(err => next(err))

})

// update
app.put("/:id", (req,res,next) => {
    dogs.findOneAndUpdate(
       { _id :req.params.id },
       { $set: { "type" : req.body.type, "name" : req.body.name } }
    )
    .then(result => res.json(result))
    .catch(err => next(err))
})


app.listen(3000, () => console.log('listening on port 3000'))

// $ nodemon app.js
