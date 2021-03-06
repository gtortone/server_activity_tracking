var bbt = require('beebotte');
// Use the jjg-ping library.
var ping = require('net-ping');

var bclient = new bbt.Connector({
    //API keys for your account
    keyId: process.env.ACCESS_KEY,
    secretKey: process.env.SECRET_KEY
});

var options = {
    retries: 3,
    timeout: 2000
};

var session = ping.createSession (options);

//Frequency of activity reporting in milliseconds
var frequency = process.env.FREQUECY || (120 * 1000 /* 2 minutes */);
// Channel and resource names. Change them as suits you (they MUST correspond to an existing channel in your account)
var channel_name = "monitor";
var latency_resource = "latency";
var server = process.env.SERVER || "127.0.0.1";

setInterval(function()
  {
    // Ping the server
    session.pingHost (server, function (error, target, sent, rcvd) {
      var ms = rcvd - sent;
      if (error) {
        if (error instanceof ping.RequestTimedOutError)
          console.log (server + ": Not alive (ms=" + ms + ")");
        else
          console.log (server + ": " + error.toString () + " (ms=" + ms + ")");
      } else {
        console.log (target + ": Alive alive (ms=" + ms + ")");
        //Write a record to the latency resource
        bclient.write({
          channel: channel_name,
          resource: latency_resource,
          data: ms
        }, function(err, res) {
          if(err) console.log(err);
        });
      }
    });
  }, frequency
);

