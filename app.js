const Express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

 // Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://root:12345@test.teqyc.mongodb.net/test?retryWrites=true&w=majority";
 
// Use this after the variable declaration

const client = new MongoClient(uri);
 
async function savePersontoDB(username, password, displayname) {
  try {
    await client.connect();

    const database = client.db('Test');
    const movies = database.collection('account');
    const query = {username: username};
    const movie = await movies.findOne(query);
    if (movie == null) {
      await movies.insertOne({
          username: username,
          password: password,
          displayname: displayname
      });
      return "0";
    }
    else {
      return "1";
    }
    
    // Query for a movie that has the title 'Back to the Future'
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function checklogin(username, password) {
  try {
    await client.connect();
    const database = client.db('Test');
    const movies = database.collection('account');
    // Query for a movie that has the title 'Back to the Future'
    const query = {username: username, password: password};
    console.log(query);
    const movie = await movies.findOne(query);
    if (movie == null) {
      return "0";
    }
    else {
      console.log(movie.displayname);
      return movie.displayname;
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}


var app = Express();
var cors = require('cors');
const { toBeChecked } = require("@testing-library/jest-dom/dist/matchers");

app.use(cors())
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

// Define REST API
app.post("/person", async (request, response) => {
  try {
    var person = request.body;
    //savePersontoDB(person.username, person.password);
    checklogin(person.username, person.password).then(res => {
      response.send(res);
    });
 
    //response.send(check);  
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/signup", async (request, response) => {
  try {
    var person = request.body;
    //savePersontoDB(person.username, person.password);
    savePersontoDB(person.username, person.password, person.displayname).then(res => {
      console.log(res);
      response.send(res);
    });
 
    //response.send(check);  
  } catch (error) {
    response.status(500).send(error);
  }
});

app.listen(3001, () => {
  console.log("Listening at :3001...");
});
