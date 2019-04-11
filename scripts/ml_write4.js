// Load a binary document
'use strict';

var marklogic = require("marklogic")
var fs = require("fs");


var connInfo =  {
                  host: 'localhost',
                  port: 8000,
                  user: 'admin',
                  password: 'password',
									database: "terencedb-1"
								};


var dbClient = marklogic.createDatabaseClient(connInfo);

var file = "./manhatten.jpg";
var uri = file.replace("../data/", "/binary/");

console.log('Writing a doc in a stream...');


var writableStream = dbClient.documents.createWriteStream({
  "uri": uri, "contentType": "image/jpeg", "collections": ["images", "cocktails"]
  });

fs.createReadStream(file).pipe(writableStream);

writableStream.result(function(response) {
    console.log('Write complete.  URI = '+ response.documents[0].uri);
  }, function(error) {
    console.log(JSON.stringify(error));
  });





console.log("Hello world");
