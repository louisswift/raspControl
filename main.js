#!/usr/bin/env node

var bleno = require('bleno');
var os = require('os');
var BlenoPrimaryService = bleno.PrimaryService;
var WifiService = require('./wifi_service');
var wifiService = new WifiService();
var baseUUID = '97859d25-749c-479e-be85-1b7880550000';
var btname = os.hostname();
var child_process = require('child_process');
bleno.on('stateChange', function(state) {
 if (state === 'poweredOn') {
	 bleno.startAdvertising(btname, [baseUUID]);
 } else {
	 bleno.stopAdvertising();
 }
});

//start services
bleno.on('advertisingStart', function(error) {
 if (!error) {
	 bleno.setServices([wifiService]);
	 
	 
	 

 }
});

process.on('SIGINT', function() {
 bleno.stopAdvertising();
 process.exit();
});
