"use strict";

const accountSid = 'ACbc358b5c75b403806147137308afb862';
const authToken = 'e15d7ff387b8f4bed3cd635df851fdb4';
const client = require('twilio')(accountSid, authToken);

client.calls
  .create({
    url: 'http://demo.twilio.com/docs/voice.xml',
    to: '+15135716881',
    from: '+15134333299',
  })
  .then((call) => process.stdout.write(call.sid));