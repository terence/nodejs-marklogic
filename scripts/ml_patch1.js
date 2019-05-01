/*
 * ML write
 * - enrich dbClient write with readback
 *
 */


'use strict';

var marklogic = require("marklogic")
var conn = require('../env.js').connection

var dbClient = marklogic.createDatabaseClient(conn);

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
dbClient.documents.write(docDescriptor)
.result()
.then(function(response){
	console.log("Finished with write of document " + uri);
	dbClient.documents.read(uri).result(
		function(descriptors){
			descriptors.forEach(function(descriptor){
				console.log("Document Content = ");
				console.log(JSON.stringify(descriptor.content));
			});
		},
		function(error) {
			console.log(JSON.stringify(error, null, 2));
		}
	);
},
function(error) {
	console.log(JSON.stringify(error));
}
);


console.log("Document Patched");
