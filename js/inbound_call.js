"use strict";

const http = require('http');
const twilio = require('twilio');

const date = new Date();

const holidayResponse = 'THANK YOU FOR CALLING UNITED INSTALLS, YOU HAVE REACHED US DURING A HOLIDAY. THERE IS A POSSIBILITY THAT SOMEONE MAY BE IN THE OFFICE. IF YOU KNOW YOUR PARTIES EXTENTION YOU MAY ENTER IT AT ANY TIME. WE DO ASK THAT YOU CALL BACK AT NORMAL BUSINESS HOURS OF 8 O’CLOCK AM TO 5:00 O’CLOCK PM MONDAY THROUGH FRIDAY';
const afterHoursResponse = 'THANK YOU FOR CALLING UNITED INSTALLS, YOU HAVE REACHED US EITHER BEFORE OR AFTER NORMAL BUSINESS HOURS. THERE IS A POSSIBILITY THAT SOMEONE MAY STILL BE IN THE OFFICE. IF YOU KNOW YOUR PARTIES EXTENTION YOU MAY ENTER IT AT ANY TIME. WE DO ASK THAT YOU CALL BACK AT NORMAL BUSINESS HOURS OF 8 O’CLOCK AM TO 5 O’CLOCK PM MONDAY THROUGH FRIDAY';
const mainResponse = 'THANK YOU FOR CALLING UNITED INSTALLS YOUR INDEPENDENT SERVICE PROVIDOR FOR LOWES, TO ENSURE THE HIGHEST LEVEL OF CUSTOMER CARE THIS CALL MAY BE RECORDED. IF YOU KNOW YOUR PARTIES EXTENTION YOU MAY DIAL IT AT ANY TIME';


http.createServer((req, res) => {
  const twiml = new twilio.TwimlResponse();

  twiml.say(getResponse());

  res.writeHead(200, {'Content-Type': 'text/xml'}); // web server details with status code 200

  res.end(twiml.toString()); // converts string from TwiML response to TwiML
})
.listen(1337, '127.0.0.1'); // port, IP address of web server

console.log('TwiML server running at http://127.0.0.1:1337/');


function getResponse() {
  if (IsHoliday()) {
    return holidayResponse;
  }
  else if (IsWeekend()) {
    return afterHoursResponse;
  }
  else if (IsBusinessHours()) {
    return mainResponse;
  }
  else {
    return afterHoursResponse;
  }
}

function IsHoliday() {
  return false;
}
function IsWeekend() {
  if (date.getDay() == 0
      || date.getDay() == 6) 
      {
        return true;
      }
}
function IsBusinessHours() {
  if (date.getHours() >= 8
      && date.getHours() < 17) 
      { 
        return true;
      }
}