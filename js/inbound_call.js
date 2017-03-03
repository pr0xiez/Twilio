"use strict";

/**
 * @author Alex Hall <alex.hall@united-installs.com>
 * @description Handles incoming calls made to Twilio number
 */

const http = require('http');
const twilio = require('twilio');
const response = require("./response");


http.createServer((req, res) => {
  const twiml = new twilio.TwimlResponse();

  twiml.say(response.getResponse());

  res.writeHead(200, {'Content-Type': 'text/xml'}); // web server details with status code 200

  res.end(twiml.toString()); // converts string from TwiML response to TwiML
})
.listen(1337, '127.0.0.1'); // port, IP address of web server

console.log('TwiML server running at http://127.0.0.1:1337/');