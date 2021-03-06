/*
 * Basic write to Marklogic
 * - uses NodeJS
 *
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



// insert the document
dbClient.documents.write(docDescriptor).result(
  function(response){
    console.log("Finished with write of document " + uri);
  },
  function(error) {
      console.log(JSON.stringify(error));
    }
);




console.log("Hello world");
