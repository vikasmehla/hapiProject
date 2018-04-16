const modelIndex = require('./model');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'myDatabase';
module.exports={
    databaseConnection1: ()=>{
async function dbConnection(){
  
try{

MongoClient.connect(url, function(err, client) {
  
 global.db=client.db(dbName);
 modelIndex.modelUser.userCollection();
 modelIndex.modelJob.jobCollection();
 console.log("connected")
  });

}
catch(error){
   return error;
}
}
dbConnection();
}
};