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
    movies = database.collection('account');
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

async function saveDeckToDB(name, decription, owner, deckCount, time) {
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
          owner: owner,
          deckCount: deckCount,
          time: time
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

async function saveCardToDB(name, type, spelling, meaning, image, synonym, antonym, example, deck_owner, username, box, time) {
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
          box: box,
          time: time
      });
      const movies2 = database.collection('decks');
      const query2 = {name:deck_owner, owner:username};
      const cur = await movies2.findOne(query2);
      var newCount = cur.deckCount + 1; 
      await movies2.updateMany(query2, {$set: {"deckCount" : newCount}}).then(item =>  {
        console.log("updated");
      });
      return "0";
    }
    else 
      return "1";
    
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


async function DeleteDecksInDB(name, owner) {
  try {
    await client.connect();
    const database = client.db('Test');
    movies = database.collection('decks');
    const query = {owner:owner, name:name};
    var returnString = "";
    await movies.deleteMany(query).then(item =>  {
      console.log("1 document deleted");
    });
    listofcards = database.collection('cards');
    const query3 = {deck_owner:name, owner:owner};
    await listofcards.deleteMany(query3).then(item =>  {
      console.log("1 document deleted");
    });
    console.log(1);
    const query2 = {owner:owner};
    await movies.find(query2).toArray().then(item => {
      console.log(JSON.stringify(item));
      returnString = JSON.stringify(item);
    });
    return returnString;
    // Query for a movie that has the title 'Back to the Future'
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function DeleteCardsInDB(name, deck_owner, owner) {
  try {
    await client.connect();
    const database = client.db('Test');
    movies = database.collection('cards');
    const query = {name:name, deck_owner:deck_owner, owner:owner};
    var returnString = "";
    await movies.deleteMany(query).then(item =>  {
      console.log("1 document deleted");
    });
    const movies2 = database.collection('decks');
    const query3 = {name:deck_owner, owner:owner};
    const cur = await movies2.findOne(query3);
    var newCount = cur.deckCount - 1; 
    await movies2.updateMany(query3, {$set: {"deckCount" : newCount}}).then(item =>  {
      console.log("updated");
    });
    const query2 = {deck_owner:deck_owner, owner:owner};
    await movies.find(query2).toArray().then(item => {
      console.log(JSON.stringify(item));
      returnString = JSON.stringify(item);
    });
    return returnString;
    // Query for a movie that has the title 'Back to the Future'
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function DeleteUsersInDB(username) {
  try {
    await client.connect();
    const database = client.db('Test');
    movies = database.collection('account');
    const query = {username:username};
    var returnString = "";
    await movies.deleteMany(query).then(item =>  {
      console.log("1 document deleted");
    });
    const query2 = {};
    await movies.find(query2).toArray().then(item => {
      console.log(JSON.stringify(item));
      returnString = JSON.stringify(item);
    });
    return returnString;
    // Query for a movie that has the title 'Back to the Future'
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function UpdatePasswordInDB(owner) {
  try {
    console.log(owner);
    await client.connect();
    const database = client.db('Test');
    movies = database.collection('account');
    const query = {username:owner};
    var returnString = "";
    await movies.updateMany(query, {$set: {"password" : "admin"}}).then(item =>  {
      console.log("updated");
    });
    console.log(owner);
    return returnString;
    // Query for a movie that has the title 'Back to the Future'
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function ChangeDisplaynameInDB(name, newname) {
  try {
    await client.connect();
    const database = client.db('Test');
    movies = database.collection('account');
    const query = {username:name};
    await movies.updateMany(query, {$set: {"displayname" : newname}}).then(item =>  {
      console.log("changed displayname");
    });
    return "0";
    // Query for a movie that has the title 'Back to the Future'
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function ChangePasswordInDB(username, oldpassword, newpassword) {
  try {
    await client.connect();
    const database = client.db('Test');
    movies = database.collection('account');
    const query = {username:username, password:oldpassword};
    const cur = await movies.find(query).toArray();
    if (cur.length == 0) {
      return "1";
    }
    else {
      await movies.updateMany(query, {$set: {"password" : newpassword}}).then(item =>  {
        console.log("changed password");
      });
      return "0";
    }
    // Query for a movie that has the title 'Back to the Future'
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function UpdateWordsInDB(owner, time, r_words, t_words) {
  try {
    await client.connect();
    const database = client.db('Test');
    var returnString = "0";
    listupdateofwords = database.collection('words');  
    const query = {username:owner, time:time};
    const cur = await listupdateofwords.find(query).toArray();
    if (cur.length == 0) {
      await listupdateofwords.insertOne({
        username: owner,
        time: time,
        r_words: r_words,
        t_words: t_words
      });
      console.log("insert new");
      returnString = "1";
    }
    else {
      console.log(cur[0].r_words);
      console.log(cur[0].t_words);
      cur[0].r_words += r_words;
      cur[0].t_words += t_words;
      await listupdateofwords.updateMany(query, {$set: {"r_words" : cur[0].r_words, "t_words" : cur[0].t_words}}).then(item =>  {
        console.log("update words");
      });
    }
    return returnString;
    // Query for a movie that has the title 'Back to the Future'
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function SearchWordsInDB(owner, time) {
  try {
    var returnString = "0";
    await client.connect();
    const database = client.db('Test');
    listofwords = database.collection('words');  
    const query = {username:owner, time:time};
    console.log(query);
    const cur = await listofwords.find(query).toArray();
    if (cur.length == 0) {
      //console.log("no data");
      return "0";
    }
    else {
      console.log(cur);
      return cur;
      returnString = cur;
    }
    return returnString;
    // Query for a movie that has the title 'Back to the Future'
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function UpdateCardBoxInDB(name, deck_owner, owner, box, time) {
  try {
    await client.connect();
    const database = client.db('Test');
    movies = database.collection('cards');
    const query = {name:name, deck_owner:deck_owner, owner:owner};
    var returnString = "";
    await movies.updateMany(query, {$set: {"box" : box, "time" : time}}).then(item =>  {
      console.log("updated");
    });
    return returnString;
    // Query for a movie that has the title 'Back to the Future'
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function EditDeckInDB(name, newname, newdescription, owner) {
  try {
    
    await client.connect();
    const database = client.db('Test');
    movies = database.collection('decks');
    const query1 = {name:newname, owner:owner};
    const cur = await movies.find(query1).toArray();
    if (cur.length == 0 || newname == name) {
      const query2 = {name:name, owner:owner};
        await movies.updateMany(query2, {$set: {"name": newname, "decription": newdescription}}).then(item =>  {
          console.log("updated");
        });
        movies2 = database.collection('cards');
        const query3 = {deck_owner:name, owner:owner};
        await movies2.updateMany(query3, {$set: {"deck_owner": newname}}).then(item =>  {
          console.log("updated");
        });
        return "0";
    }
    else {
      console.log(cur);
      return "1";
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function EditCardInDB(name, deck_owner, owner, newname, newtype, newspelling, newmeaning, newimage, newsynonym, newantonym, newexample) {
  try {
    console.log(1);
    await client.connect();
    const database = client.db('Test');
    movies = database.collection('cards');
    const query1 = {name:newname, deck_owner:deck_owner, owner:owner};
    console.log(query1);
    const cur = await movies.find(query1).toArray();
    if (cur.length == 0 || newname == name) {
      const query2 = {name:name, deck_owner:deck_owner, owner:owner};
        await movies.updateMany(query2, {$set: {"name": newname, "type": newtype, "spelling": newspelling, "meaning": newmeaning, "image": newimage, "synonym": newsynonym, "antonym": newantonym, "example": newexample}}).then(item =>  {
          console.log("updated");
        });
        return "0";
    }
    else {
      return "1";
    }
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
    //console.log(query);
    const movie = await movies.findOne(query);
    if (movie == null) {
      return "0";
    }
    else {
      //e.log(movie.displayname);
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
    saveDeckToDB(person.name, person.decription, person.owner, person.deckCount, person.time).then(res => {
      
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
    saveCardToDB(card.name, card.type, card.spelling, card.meaning, card.image, card.synonym, card.antonym, card.example, card.deck_owner, card.owner, card.box, card.time).then(res => {
      
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
    
    //savePersontoDB(person.username, person.password);
    await searchDeckInDB(person.username, person.nameOfDeck).then(res => {
      
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
    
    //savePersontoDB(person.username, person.password);
    await searchCardInDB(person.username, person.nameOfDeck).then(res => {
      
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
    //savePersontoDB(person.username, person.password);
    await searchListAccountInDB().then(res => {
      response.send(res);
    });
 
    //response.send(check);  
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/deletedeck", async (request, response) => {
  try {
    var person = request.body;
    //console.log(person.name, person.owner);
    //savePersontoDB(person.username, person.password);
    await DeleteDecksInDB(person.name, person.owner).then(res => {
      console.log(res);
      response.send(res);
    });
    //response.send(check);  
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/deletecard", async (request, response) => {
  try {
    var person = request.body;
    //console.log(person.name, person.owner);
    //savePersontoDB(person.username, person.password);
    await DeleteCardsInDB(person.name, person.deck_owner, person.owner).then(res => {
      console.log(res);
      response.send(res);
    });
    //response.send(check);  
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/deleteuser", async (request, response) => {
  try {
    var person = request.body;
    console.log(person.username);
    //savePersontoDB(person.username, person.password);
    await DeleteUsersInDB(person.username).then(res => {
      console.log(res);
      response.send(res);
    });
    //response.send(check);  
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/update", async (request, response) => {
  try {
    var person = request.body;
    //console.log(person.name, person.owner);
    //savePersontoDB(person.username, person.password);
    await UpdatePasswordInDB(person.owner).then(res => {
      console.log(res);
      response.send(res);
    });
    //response.send(check);  
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/updatecardbox", async (request, response) => {
  try {
    var person = request.body;
    //console.log(person.name, person.owner);
    //savePersontoDB(person.username, person.password);
    await UpdateCardBoxInDB(person.cardname, person.deck_owner, person.owner, person.box, person.time).then(res => {
      console.log(res);
      response.send(res);
    });
    //response.send(check);  
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/editdeck", async (request, response) => {
  try {
    var person = request.body;
    //console.log(person.name, person.owner);
    //savePersontoDB(person.username, person.password);
    await EditDeckInDB(person.name, person.newname, person.newdecription, person.owner).then(res => {
      console.log(res);
      response.send(res);
    });
    //response.send(check);  
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/editcard", async (request, response) => {
  try {
    var person = request.body;
    //console.log(person.name, person.owner);
    //savePersontoDB(person.username, person.password);
    await EditCardInDB(person.name, person.deck_owner, person.owner, person.newname, person.newtype, person.newspelling, person.newmeaning, person.newimage, person.newsynonym, person.newantonym, person.newexample).then(res => {
      console.log(res);
      response.send(res);
    });
    //response.send(check);  
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/changedisplaynameuser", async (request, response) => {
  try {
    var person = request.body;
    //console.log(person.name, person.owner);
    //savePersontoDB(person.username, person.password);
    await ChangeDisplaynameInDB(person.username, person.newname).then(res => {
      console.log(res);
      response.send(res);
    });
    //response.send(check);  
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/changepassworduser", async (request, response) => {
  try {
    var person = request.body;
    //console.log(person.name, person.owner);
    //savePersontoDB(person.username, person.password);
    await ChangePasswordInDB(person.username, person.oldpassword, person.newpassword).then(res => {
      console.log(res);
      response.send(res);
    });
    //response.send(check);  
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/updatecountwords", async (request, response) => {
  try {
    var person = request.body;
    //console.log(person.name, person.owner);
    //savePersontoDB(person.username, person.password);
    console.log("join in");
    await UpdateWordsInDB(person.owner, person.time, person.r_words, person.t_words).then(res => {
      console.log(res);
      response.send(res);
    });
    //response.send(check);  
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/takewordsinfo", async (request, response) => {
  try {
    var person = request.body;
    //console.log(person.name, person.owner);
    //savePersontoDB(person.username, person.password);
    await SearchWordsInDB(person.owner, person.time).then(res => {
      //console.log(res);
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

