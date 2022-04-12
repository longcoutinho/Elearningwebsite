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

async function saveDeckToDB(name, decription, owner) {
  try {
    await client.connect();

    const database = client.db('Test');
    const movies = database.collection('decks');
    const query = {name:name};
    const movie = await movies.findOne(query);
    if (movie == null) {
      await movies.insertOne({
          name: name,
          decription: decription,
          owner: owner
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

async function saveCardToDB(name, type, spelling, meaning, image, synonym, antonym, example, deck_owner, username) {
  try {
    await client.connect();
    const database = client.db('Test');
    const movies = database.collection('cards');
    const query = {name:name, owner:username};
    const movie = await movies.findOne(query);
    if (movie == null) {
      await movies.insertOne({
          name: name,
          type: type,
          spelling: spelling,
          meaning: meaning,
          image: image,
          synonym: synonym,
          antonym: antonym,
          example: example,
          deck_owner: deck_owner,
          owner: username,
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

async function searchDeckInDB(username) {
  try {
    await client.connect();
    const database = client.db('Test');
    movies = database.collection('decks');
    const query = {owner:username};
    var returnString = "";
    await movies.find(query).toArray().then(item => {
      //console.log(JSON.stringify(item));
      returnString = JSON.stringify(item);
    });
    return returnString;
    // Query for a movie that has the title 'Back to the Future'
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function searchCardInDB(username, nameOfDeck) {
  try {
    await client.connect();
    const database = client.db('Test');
    movies = database.collection('cards');
    const query = {owner:username, deck_owner:nameOfDeck};
    var returnString = "";
    await movies.find(query).toArray().then(item => {
      //console.log(JSON.stringify(item));
      returnString = JSON.stringify(item);
    });
    return returnString;
    // Query for a movie that has the title 'Back to the Future'
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function searchListAccountInDB() {
  try {
    await client.connect();
    const database = client.db('Test');
    movies = database.collection('account');
    const query = {};
    var returnString = "";
    await movies.find(query).toArray().then(item => {
      //console.log(JSON.stringify(item));
      returnString = JSON.stringify(item);
    });
    return returnString;
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

app.post("/adddeck", async (request, response) => {
  try {
    var person = request.body;
    //savePersontoDB(person.username, person.password);
    saveDeckToDB(person.name, person.decription, person.owner).then(res => {
      console.log(res);
      response.send(res);
    });
 
    //response.send(check);  
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/addcard", async (request, response) => {
  try {
    var card = request.body;
    //savePersontoDB(person.username, person.password);
    saveCardToDB(card.name, card.type, card.spelling, card.meaning, card.image, card.synonym, card.antonym, card.example, card.deck_owner, card.owner).then(res => {
      console.log(card.owner);
      response.send(res);
    });
 
    //response.send(check);  
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/searchdeck", async (request, response) => {
  try {
    var person = request.body;
    console.log(person.username, person.nameOfDeck);
    //savePersontoDB(person.username, person.password);
    await searchDeckInDB(person.username, person.nameOfDeck).then(res => {
      console.log(res);
      response.send(res);
    });
 
    //response.send(check);  
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/searchcard", async (request, response) => {
  try {
    var person = request.body;
    console.log(person.username, person.nameOfDeck);
    //savePersontoDB(person.username, person.password);
    await searchCardInDB(person.username, person.nameOfDeck).then(res => {
      console.log(res);
      response.send(res);
    });
 
    //response.send(check);  
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/searchaccount", async (request, response) => {
  try {
    var person = request.body;
    console.log(person.username, person.nameOfDeck);
    //savePersontoDB(person.username, person.password);
    await searchListAccountInDB().then(res => {
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

