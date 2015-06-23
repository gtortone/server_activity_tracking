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
var channel_name = "sector8F";
var pv1 = new epics.Channel('S8F:TEMP01');
var pv2 = new epics.Channel('S8F:TEMP02');
var pv3 = new epics.Channel('S8F:TEMP03');
var pv4 = new epics.Channel('S8F:RH');

setInterval(function()
  {
    pv1.connect(function() {
       pv1.get(function(err, value) {
       //console.log('Current:',value);
       value = parseFloat(value.toFixed(2));
       bclient.write({
          channel: channel_name,
          resource: "temp01",
          data: value
       }, function(err, res) {
          if(err) console.log(err);
       });
      });
    })

    pv2.connect(function() {
       pv2.get(function(err, value) {
       //console.log('Current:',value);
       value = parseFloat(value.toFixed(2));
       bclient.write({
          channel: channel_name,
          resource: "temp02",
          data: value
       }, function(err, res) {
          if(err) console.log(err);
       });
      });
    });
  
    pv3.connect(function() {
       pv3.get(function(err, value) {
       //console.log('Current:',value);
       value = parseFloat(value.toFixed(2));
       bclient.write({
          channel: channel_name,
          resource: "temp03",
          data: value
       }, function(err, res) {
          if(err) console.log(err);
       });
      });
    });

    pv4.connect(function() {
       pv4.get(function(err, value) {
       //console.log('Current:',value);
       value = parseFloat(value.toFixed(1));
       bclient.write({
          channel: channel_name,
          resource: "hum",
          data: value
       }, function(err, res) {
          if(err) console.log(err);
       });
      });
    });

  }, frequency 
);
