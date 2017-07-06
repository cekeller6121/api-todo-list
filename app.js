const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://127.0.0.1:27017/tododb');
const bodyParser = require('body-parser');

app.use('/static', express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/static/index.html");
});

const todoSchema = new mongoose.Schema({
  // *** schema code goes here! ***

  title: { type: String},
  isComplete: { type: Boolean}

});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/api/todos', function (req, res) {
  Todo.find({}).then(function(todos) {
    res.json(todos);
  })
});

app.post('/api/todos', function (req, res) {
  let todo = new Todo({title: req.body.title, completed: false});
  todo.save().then(function() {
    console.log("todo added to database");
  }).catch(function () {
    console.log("todo has NOT been added to database, bud");
  });
});

app.listen(3000, function () {
    console.log('Express running on http://localhost:3000/.')
});
