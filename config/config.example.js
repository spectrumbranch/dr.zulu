/*
  Use this file as a template for configuring the 
  HTTP server aspect of the application.

  Rename this file to config.js and update
  the following configuration:
*/

exports.config = {
  hostname: '0.0.0.0',
  port: 7373,
  tls: false,
  cookie_name: 'dr.zulu-cookie',
  cookie_password: 'xfflkjs3408frkasf09i',
  //Change the following if you don't want an obvious admin username and password:
  admin_username: 'admin',
  admin_password: ''
};

//If exports.config.tls == true, then the following tlsconfig is required to be uncommented and filled out properly.
//Keep this commented out if exports.config.tls == false
//var fs = require('fs');
//exports.tlsconfig = {
//  key: fs.readFileSync('/somewhere/fixtures/keys/dr.zulu-key.pem'),
//  cert: fs.readFileSync('/somewhere/fixtures/keys/dr.zulu-cert.pem')
//}