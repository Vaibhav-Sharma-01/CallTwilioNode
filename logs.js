const accountSid = "AC371aeb4f563abafae2fac29d34ee1930";
const authToken = "cae9498c67697c2ef04388ab1d6ceaf6";
const http = require('http');
const express = require('express');

const app = express();

const twilio = require('twilio');

const client = twilio(accountSid, authToken);

app.use((req, res, next) => {
    client.calls
      .create({
         twiml: '<Response><Say>Ahoy there!</Say></Response>',
         to: '+917982176385',
         from: '+14694053135'
       })
      .then(call => console.log(call.sid));
    client.calls.list({limit: 20})
    .then(calls => calls.forEach(c => console.log(c.sid)));
    res.header('Access-Control-Allow-Origin', '*')
})

const server = http.createServer(app);
const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`Express Server listening on *:${port}`);
});

module.exports = app;
