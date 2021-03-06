

// Marklogic Database Connection
var dev =  {
  database: "peppadb-1",     // Each connection can specify its own database
  host: "localhost",         // The host against which queries will be run
  port: 8000,                // By default port 8000 accepts Client API requests
  user: "admin",          // A user with at least the rest-writer role
  password: "password",  // Probably not your password
  authType: "DIGEST"         // The default auth
}

var test =  {
  database: "georgedb-1",     // Each connection can specify its own database
  host: "xxx.defence",         // The host against which queries will be run
  port: 8000,                // By default port 8000 accepts Client API requests
  user: "bob.builder",          // A user with at least the rest-writer role
  password: "password",  // Probably not your password
  authType: "DIGEST"         // The default auth
}
				
				
module.exports = {
//  connection: dev
  connection: test
}


