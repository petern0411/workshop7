var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/facebook';
MongoClient.connect(url, function(err,db){
  if (err){
    throw new Error("Could not connect to database: " + err);
  }else{
    mongoExample(db);
    console.log("Connected correctly to the server")
  }
});

/**
 * Inserts a simple document into the 'helloworld'
 * document collection.
 * @param db The database connection
 * @param callback A callback function to call once the
 *   operation completes. We will pass back the new object's
 *   ID.
 */

 function getHelloWorldDocument(db, id, callback){
   var query = {
     "_id":id
   };
   db.collection('helloworld').findOne(query, function(err,doc){
     if(err){
       throw err;

   }else{
     callback(doc);
   }
   });
 }

 function insertExample(db, callback){
   var exampleDocument = {
     message :"Hello World!"
   };
   db.collection('helloworld').insertOne(exampleDocument, function(err, result){
     if(err){
       throw err;
     }else{
       console.log("Successfully updated database! The new object's ID is " + result.insertedId)
       callback(result.insertedId);
     }
   });
 }

/**
Add a new document to helloworld collection, read the document,
print the document
*/

function mongoExample(db){
  insertExample(db, function(newId){
    getHelloWorldDocument(db, newId, function(doc){
      console.log("Wrote new object to helloworld collection:");
      console.log(doc);
    });
  });
}
