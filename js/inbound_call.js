"use strict";

const http = require('http'); // require web server
const twilio = require('twilio'); // require Twilio library

http.createServer((req, res) => {
  const twiml = new twilio.TwimlResponse();

  twiml.say('Welcome to United Installs'); 

  res.writeHead(200, {'Content-Type': 'text/xml'}); // web server details with status code 200

  res.end(twiml.toString());
  /**
  Outputs the following:
  <?xml version="1.0" encoding="UTF-8"?>
  <Response>
    <Say>Welcome to United Installs</Say>
  </Response>
  */
})
.listen(1337, '127.0.0.1'); // port , IP address of web server

console.log('TwiML server running at http://127.0.0.1:1337/');