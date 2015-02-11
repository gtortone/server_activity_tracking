/*
 * Example showing how to use Beebotte to monitor an EPICS PV
 *
 * Copyright, gennaro.tortone@na.infn.it, 2015
 * MIT license
 */

var epics = require('epics');
var bbt = require('beebotte');

var bclient = new bbt.Connector({
  //API keys for your account
  keyId: process.env.ACCESS_KEY,
  secretKey: process.env.SECRET_KEY
});

//Frequency of activity reporting in milliseconds
var frequency = process.env.FREQUENCY || (120 * 1000 /* 2 minutes */);
// Channel name. Change it as suits you (it MUST correspond to an existing channel in your account)
var channel_name = "temperature";

setInterval(function()
  {
    var pv = new epics.Channel('LTC2499:NTC:sh:degC');

    pv.connect(function() {
       pv.get(function(err, value) {
       //console.log('Current:',value);
       bclient.write({
          channel: channel_name,
          resource: "hall_temp",
          data: value
       }, function(err, res) {
          if(err) console.log(err);
       });
    });
})

  }, frequency
);
