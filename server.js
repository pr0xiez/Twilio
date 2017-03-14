"use strict"

/**
 * @author Alex Hall <alex.hall@united-installs.com>
 * @description United Installs Twilio Web Application
 */

// outside dependencies
const urlencoded = require('body-parser').urlencoded
const express = require('express')
const twilio = require('twilio')
// project imports
const _response = require("./js/response")

let app = express()
app.use(urlencoded({ extended: false }))
//app.use(express.static('Twilio')) // DO I NEED THIS?? LOL1

/**
 * @author Alex Hall <alex.hall@united-installs.com>
 * @description Handles requests made to our web application from a User
 */
app.get('/', (req, res) => {
   res.sendFile( __dirname + "/" + "index.html" )
})

/**
 * @author Alex Hall <alex.hall@united-installs.com>
 * @description Handles the initial incoming call made to United Installs Twilio phone number
 */
app.post('/voice', (req, res) => {
  let twiml = new twilio.TwimlResponse()

  twiml.gather({ 
    numDigits: 1,
    action: '/gather_purpose_response'},
    (gatherNode) => {
      gatherNode.say(_response.getGreeting())
    })

  twiml.redirect('/voice')

  res.type('text/xml')
  res.send(twiml.toString())
})

app.post('/gather_purpose_response', (req, res) => {
  let twiml = new twilio.TwimlResponse()

  if (req.body.Digits) {
    switch (req.body.Digits) {
      case '1': twiml.gather({ numDigits: 1, action: '/gather_install_response'},
                  (gatherNode) => {
                    gatherNode.say(_response.getInstallationsResponse())
                  })
                break
      case '3': twiml.gather({ numDigits: 1, action: '/gather_accounting_response'},
                  (gatherNode) => {
                    gatherNode.say(_response.getAccountingResponse())
                  })
                break
      default: 
        twiml.say('Sorry, I don\'t understand that choice.').pause()
        twiml.redirect('/voice')
        break
    }
  } else {
    twiml.redirect('/voice') // If no input was sent, redirect to the /voice route
  }
  res.type('text/xml') 
  res.send(twiml.toString())
})

app.post('/gather_install_response', (req, res) => {
  let twiml = new twilio.TwimlResponse()

  if (req.body.Digits) {
    switch (req.body.Digits) {
      case '1': break //TODO
      case '3': break //TODO
      default: 
        twiml.say('Sorry, I don\'t understand that choice.').pause()
        twiml.redirect('/voice')
        break
    }
  } else {
    twiml.redirect('/voice') // If no input was sent, redirect to the /voice route
  }
  res.type('text/xml')
  res.send(twiml.toString())
})

app.post('/gather_accounting_response', (req, res) => {
  let twiml = new twilio.TwimlResponse() 

  if (req.body.Digits) {
    switch (req.body.Digits) {
      case '1': break //TODO
      case '3': break //TODO
      default: 
        twiml.say('Sorry, I don\'t understand that choice.').pause()
        twiml.redirect('/voice')
        break
    }
  } else {
    twiml.redirect('/voice') // If no input was sent, redirect to the /voice route
  }
  res.type('text/xml')
  res.send(twiml.toString())
})

app.listen(3000) // app open on port 3000