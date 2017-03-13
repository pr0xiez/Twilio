"use strict";

/**
 * @author Alex Hall <alex.hall@united-installs.com>
 * @description United Installs Twilio Web Application
 */

// outside dependencies
const urlencoded = require('body-parser').urlencoded;
const express = require('express');
const twilio = require('twilio');
// project imports
const _response = require("./js/response");


let app = express();
app.use(urlencoded({ extended: false }));
//app.use(express.static('Twilio')); // DO I NEED THIS?? LOL

/**
 * @author Alex Hall <alex.hall@united-installs.com>
 * @description Handles requests made to our web application from a User
 */
app.get('/', function(request, response) {
   response.sendFile( __dirname + "/" + "index.html" );
});


/**
 * @author Alex Hall <alex.hall@united-installs.com>
 * @description Handles an incoming call made to United Installs Twilio phone number
 */
app.post('/voice', function(request, response) {
  // Use the Twilio Node.js SDK to build an XML response
  let twiml = new twilio.TwimlResponse();

  twiml.gather({ 
    numDigits: 1,
    action: '/gather'
  }, function (gatherNode) {
    gatherNode.say(_response.getGreeting());
  });

  // If the user doesn't enter input, loop
  twiml.redirect('/voice');

  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
});

// Create a route that will handle <Gather> input
app.post('/gather', function(request, response) {
  // Use the Twilio Node.js SDK to build an XML response
  let twiml = new twilio.TwimlResponse();

  // If the user entered digits, process their request
  if (request.body.Digits) {
    switch (request.body.Digits) {
      case '1': twiml.say(_response.getInstallationsResponse()); break;
      case '3': twiml.say(_response.getAccountingResponse()); break;
      default: 
        twiml.say('Sorry, I don\'t understand that choice.').pause();
        twiml.redirect('/voice');
        break;
    }
  } else {
    // If no input was sent, redirect to the /voice route
    twiml.redirect('/voice');
  }

  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
});

app.listen(3000); // app open on port 3000