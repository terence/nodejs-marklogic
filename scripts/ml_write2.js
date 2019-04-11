/* 
 * Basic ML write
 * - enrich dbClient write handling
 *
 */



'use strict';

var marklogic = require("marklogic")

var connInfo =  {
                  host: 'localhost',
                  port: 8000,
                  user: 'admin',
                  password: 'password',
									database: "terencedb-1"
								};


var dbClient = marklogic.createDatabaseClient(connInfo);

var uri = "/recipes/recipe1.json";
var docData = {
              "recipe":
                {
                  "name": "tofu soup",
                  "ingredients": ["tofu", "carrots", "mushrooms", "coconut milk"],
                  "directions":
                    {
                      "preparation": "chop all ingredients into small cubes.",
                      "cooking":
                        {
                          "step1": "combine all ingredients in a large pot.",
                          "step2": "cook on medium heat for 45 minutes"
                        }
                    }
                  }
                };

var docDescriptor = [
                      {
                        "uri": uri,
                        "contentType": "application/json",
                        "content": docData,
                        "collections": ["recipes", "food", "vegetarian", "soup"]
                      }
                    ];




dbClient.documents.write(docDescriptor)
.result()
.then(function(response) {
  return dbClient.documents.read(response.documents[0].uri).result();
})
.then(function(document) {
  console.log(document[0].content);
})
.catch(function(error) {
  console.log(error);
});


console.log("Hello world");
